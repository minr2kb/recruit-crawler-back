/* eslint-disable consistent-return */

import axios from 'axios';
import { type ResultType } from '../../types/commonTypes';
import { toStringByFormatting } from '../format';
import { isInMonths } from '../validation';

const getUrl = () => `https://career-api.rememberapp.co.kr/job_postings/search`;

const getPostBody = (cateKey: string, subCateKey: string, page: number) => ({
  page,
  sort: 'starts_at_desc',
  search: {
    job_category_names: [{ level1: cateKey, level2: subCateKey }],
    organization_type: 'without_headhunter',
  },
});

const REMEMBER_BASE_URL = 'https://career.rememberapp.co.kr/job/postings/';

export const getPostsFromRememberByPage = (controller: AbortController) => async (
  position: string,
  cateKey: string,
  subCateKey: string,
  page: number,
  month?: number,
) => {
  // console.log(`Remember - ${position} - page - ${page}`);
  const response = await axios.post(getUrl(), getPostBody(cateKey, subCateKey, page), {
    signal: controller.signal,
  });
  const { data } = response;

  let result: ResultType[] = [];
  let next = page < data.meta.total_pages;

  for (const post of data.data) {
    if (month && !isInMonths(post.starts_at, month)){ 
      next = false
      break;
    }
    const targetData = {
      platform: '리멤버',
      companyName: post.organization?.name ?? '',
      title: post.title,
      position,
      updatedDate: toStringByFormatting(new Date(post.starts_at)),
      recruitUrl: REMEMBER_BASE_URL + post.id,
      companyLocation: post.addresses[0]
        ? `${post.addresses[0].address_level1} ${post.addresses[0].address_level2}`
        : '',
    };

    result.push(targetData);
  }

  return {
    result,
    next
  };
};

export const getPostsFromRemember = (controller: AbortController) => async (
  position: string,
  cateKey: string,
  subCateKey: string,
  month?: number,
) => {
  let result: ResultType[] = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage && !controller.signal.aborted) {
    const pageResult = await getPostsFromRememberByPage(controller)(position, cateKey, subCateKey, page, month);

    result = result.concat(pageResult.result);
    hasNextPage = pageResult.next;
    page += 1;
  }

  return result.sort(
    (a, b) => new Date(b.updatedDate).valueOf() - new Date(a.updatedDate).valueOf(),
  );
};




