/* eslint-disable consistent-return */

import axios from 'axios';
import { type ResultType } from '../../types/commonTypes';

const COUNT_PER_PAGE = 20;

const getUrl = (cateKey: string, page: number) =>
  `https://www.wanted.co.kr/api/v4/jobs?country=kr&tag_type_ids=${cateKey}&locations=all&years=-1&limit=${COUNT_PER_PAGE}&offset=${
    COUNT_PER_PAGE * page
  }&job_sort=job.latest_order`;

const getDetailUrl = (id: number) => `https://www.wanted.co.kr/api/v4/jobs/${id}`;

const WANTED_BASE_URL = 'https://www.wanted.co.kr/wd/';

export const getPostsFromWantedByPage = (controller: AbortController) => async (position: string, cateKey: string, page: number) => {
  // console.log(`Wanted - ${position} - page - ${page}`);
  const response = await axios.get(getUrl(cateKey, page), {
    signal: controller.signal,
  });
  const { data } = response;

  const posts = data.data;
  const next = !!data.links?.next;

  const promises = posts.map(async post => {
    const response = await axios.get(getDetailUrl(post.id), {
      signal: controller.signal,
    });
    const data = response.data.job;

    const targetData = {
      platform: '원티드',
      companyName: data.company?.name ?? '',
      position,
      title: data.position ?? '',
      updatedDate: '',
      recruitUrl: post.id ? WANTED_BASE_URL + post.id : '',
      companyLocation: data.address?.full_location ?? '',
    };
    return targetData;
  });

  const result: ResultType[] = (await Promise.all(promises)).filter(data => !!data);

  return {
    result,
    next: next
  };
};

export const getPostsFromWanted = (controller: AbortController) => async (position: string, cateKey: string) => {
  let result: ResultType[] = [];
  let page = 0;
  let hasMorePages = true;

  while (hasMorePages && !controller.signal.aborted) {
    const pageResult = await getPostsFromWantedByPage(controller)(position, cateKey, page);

    if (pageResult.result.length > 0) {
      result = result.concat(pageResult.result);
    }

    hasMorePages = pageResult.next;
    page += 1;
  }

  return result.sort(
    (a, b) => new Date(b.updatedDate).valueOf() - new Date(a.updatedDate).valueOf(),
  );
};


