/* eslint-disable consistent-return */

import axios from 'axios';
import parse from 'node-html-parser';
import { ResultType } from '../../types/commonTypes';
import { toStringByFormatting } from '../format';

const COUNT_PER_PAGE = 40;

const getUrl = (cateKey: string, page: number) => `https://m.jobkorea.co.kr/recruit/joblist/_ListNormal?duty=${cateKey}&dkwrd=100023047566252&searchType=2&sort=8&page=${page}`;

const getDetailUrl = (id: number) => `https://m.jobkorea.co.kr/Recruit/GI_Read/${id}`;

const JOBKOREA_BASE_URL = 'https://www.jobkorea.co.kr/Recruit/GI_Read/';

export const getPostsFromJobKoreaByPage = (controller: AbortController) => async (position: string, cateKey: string, page: number, month?: number) => {
// console.log(`Job Korea - ${position} - page - ${page}`);
  const response = await axios.get(getUrl(cateKey, page), {
    signal: controller.signal,
  });
  const { data } = response;

  const root = parse(data);

  const posts = root.querySelectorAll('li.devAgiWrap')
  let next = posts.length === COUNT_PER_PAGE;
  
  const promises = posts.map(async el => {
    const id = el.getAttribute("data-gno");
    let updatedDate: string = "";
    // try {
    //   const response = await axios.get(getDetailUrl(Number(id)), {
    //     signal: controller.signal,
    //   });

    //   const pageRoot = parse(response.data);
    //   const companyInfo = pageRoot.querySelector(`.company-name`)
    //   updatedDate = companyInfo?.getAttribute("data-applystartdt") 
    // }
    // catch (e) {
    //   console.error(e);
    // }

    // if (updatedDate && month && !isInMonths(updatedDate, month)){ 
    //   return null
    // }

    const companyLocation = el.querySelector(".item")?.innerText?.split("\r\n")[4]?.replace("&gt;","")?.trim() ?? ''

    return {
      platform: '잡코리아',
      companyName: el.querySelector(".company").innerText,
      position,
      title: el.querySelector(".title").innerText ?? '',
      updatedDate: updatedDate ? toStringByFormatting(new Date(updatedDate)) : "",
      recruitUrl: JOBKOREA_BASE_URL + id,
      companyLocation,
    };
  });


  const result: ResultType[] = (await Promise.all(promises)).filter(data => !!data);

  if(result.length === 0) next = false

  return { result, next }
};

export const getPostsFromJobKorea = (controller: AbortController) => async (position: string, cateKey: string, month?: number) => {
  let result: ResultType[] = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage && !controller.signal.aborted) {
    const pageResult = await getPostsFromJobKoreaByPage(controller)(position, cateKey, page, month);

    result = result.concat(pageResult.result);
    hasNextPage = pageResult.next;
    page += 1;
  }

  return result.sort(
    (a, b) => new Date(b.updatedDate).valueOf() - new Date(a.updatedDate).valueOf(),
  );
};


