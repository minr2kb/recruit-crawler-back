/* eslint-disable consistent-return */

import axios from 'axios';
import { type ResultType } from '../../types/commonTypes';
import { toStringByFormatting } from '../format';
import { isInMonths } from '../validation';

const getUrl = (cateKey: string, page: number) =>
  `https://career.programmers.co.kr/api/job_positions?order=recent&page=${page}&job_category_ids[]=${cateKey}`;

const PROGRAMMERS_BASE_URL = 'https://career.programmers.co.kr/job_positions/';

export const getPostsFromProgrammersByPage = (controller: AbortController) => async (
  position: string,
  cateKey: string,
  page: number,
  month?: number,
) => {
  console.log(`Programmers - ${position} - page - ${page}`);
  const response = await axios.get(getUrl(cateKey, page), {
    signal: controller.signal,
  });
  const { data } = response;

  let result: ResultType[] = [];
  let next = page < data.totalPages;

  for (const post of data.jobPositions) {
    if (month && !isInMonths(post.updatedAt, month)){ 
      next = false
      break;
    }
    const targetData = {
      platform: '프로그래머스',
      companyName: post.company?.name ?? '',
      position,
      title: post.title ?? '',
      updatedDate: toStringByFormatting(new Date(post.updatedAt)),
      recruitUrl: PROGRAMMERS_BASE_URL + post.id,
      companyLocation: post.address ?? '',
    };

    result.push(targetData);
  }

  return {
    result,
    next
  };
};

export const getPostsFromProgrammers = (controller: AbortController) => async (position: string, cateKey: string, month?: number) => {
  let result: ResultType[] = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage && !controller.signal.aborted) {
     const pageResult = await getPostsFromProgrammersByPage(controller)(position, cateKey, page, month);

    result = result.concat(pageResult.result);
    hasNextPage = pageResult.next;
    page += 1;
  }
  return result.sort(
    (a, b) => new Date(b.updatedDate).valueOf() - new Date(a.updatedDate).valueOf(),
  );
};



