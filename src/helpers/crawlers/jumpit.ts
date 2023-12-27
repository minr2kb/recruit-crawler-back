/* eslint-disable consistent-return */

import axios from 'axios';
import { type ResultType } from '../../types/commonTypes';
import { toStringByFormatting } from '../format';
import { isInMonths } from '../validation';

const getUrl = (cateKey: string, pageNum: number) =>
  `https://api.jumpit.co.kr/api/positions?page=${pageNum}&jobCategory=${cateKey}&sort=reg_dt&highlight=false`;

const getDetailUrl = (id: number) => `https://api.jumpit.co.kr/api/position/${id}`;

const JUMPIT_BASE_URL = 'https://www.jumpit.co.kr/position/';

const COUNT_PER_PAGE = 16;

const getPostsFromJumpit = (controller: AbortController) =>  async (position: string, cateKey: string, month?: number) => {
  const result: ResultType[] = [];

  let posts = [...Array(COUNT_PER_PAGE)];
  let page = 1;

  while (posts.length === COUNT_PER_PAGE && !controller.signal.aborted) {
    console.log(`Jumpit - ${position} - page - ${page}`);
    const response = await axios.get(getUrl(cateKey, page), {
      signal: controller.signal,
    });
    const { data } = response;

    if (data.status !== 200) {
      console.error('ERROR');
      continue;
    }
    posts = data.result.positions;

    page += 1;

    const promises = posts.map(async post => {
      const response = await axios.get(getDetailUrl(post.id), {
        signal: controller.signal,
      });
      const data = response.data.result;

      if (month && !isInMonths(data.publishedAt, month)) return;

      const targetData = {
        platform: '점핏',
        companyName: data.companyName ?? '',
        position,
        title: data.title ?? '',
        updatedDate: toStringByFormatting(new Date(data.publishedAt)),
        recruitUrl: data.id ? JUMPIT_BASE_URL + data.id : '',
        companyLocation: data.workingPlaces[0] ? data.workingPlaces[0].address : '',
      };
      return targetData;
    });

    const results = await Promise.all(promises);
    results.forEach(data => {
      if (data) result.push(data);
    });
  }
  return result.sort(
    (a, b) => new Date(b.updatedDate).valueOf() - new Date(a.updatedDate).valueOf(),
  );
};

export default getPostsFromJumpit;
