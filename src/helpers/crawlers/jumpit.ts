/* eslint-disable consistent-return */

import axios from 'axios';
import { type ResultType } from '../../types/commonTypes';
import { toStringByFormatting } from '../format';
import { isInMonths } from '../validation';

const getUrl = (cateKey: string, page: number) =>
  `https://api.jumpit.co.kr/api/positions?page=${page}&jobCategory=${cateKey}&sort=reg_dt&highlight=false`;

const getDetailUrl = (id: number) => `https://api.jumpit.co.kr/api/position/${id}`;

const JUMPIT_BASE_URL = 'https://www.jumpit.co.kr/position/';

const COUNT_PER_PAGE = 16;

export const getPostsFromJumpitByPage = (controller: AbortController) => async (position: string, cateKey: string, page: number, month?: number) => {
  console.log(`Jumpit - ${position} - page - ${page}`);
  const response = await axios.get(getUrl(cateKey, page), {
    signal: controller.signal,
  });
  const { data } = response;

  if (data.status !== 200) {
    console.error('ERROR');
    return { result: [], next: false };
  }

  const posts = data.result.positions;
  let next = posts.length === COUNT_PER_PAGE;

  const promises = posts.map(async post => {
    const response = await axios.get(getDetailUrl(post.id), {
      signal: controller.signal,
    });

    const data = response.data.result;

    if (month && !isInMonths(data.publishedAt, month)){ 
      return null
    }

    return {
      platform: '점핏',
      companyName: data.companyName ?? '',
      position,
      title: data.title ?? '',
      updatedDate: toStringByFormatting(new Date(data.publishedAt)),
      recruitUrl: data.id ? JUMPIT_BASE_URL + data.id : '',
      companyLocation: data.workingPlaces[0] ? data.workingPlaces[0].address : '',
    };
  });

  const result: ResultType[] = (await Promise.all(promises)).filter(data => !!data);
  if(result.length === 0) next = false

  return { result, next };
};


export const getPostsFromJumpit = (controller: AbortController) => async (position: string, cateKey: string, month?: number) => {
  let result: ResultType[] = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage && !controller.signal.aborted) {
    const pageResult = await getPostsFromJumpitByPage(controller)(position, cateKey, page, month);

    result = result.concat(pageResult.result);
    hasNextPage = pageResult.next;
    page += 1;
  }

  return result.sort(
    (a, b) => new Date(b.updatedDate).valueOf() - new Date(a.updatedDate).valueOf(),
  );
};