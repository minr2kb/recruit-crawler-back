/* eslint-disable no-unused-vars */

import axios, { HttpStatusCode } from 'axios';
import { type Context } from 'koa';
import parse from 'node-html-parser';
import {
  DIVIDER_SIGN,
  JOBKOREA_CATE_URL,
  JOBPLANET_CATE_URL,
  JUMPIT_CATE_URL,
  PROGRAMMERS_CATE_URL,
  REMEMBER_CATE_URL,
  WANTED_CATE_URL
} from '../../helpers/consts';
import { sendError, sendResponse } from '../../helpers/response';
import {
  type JobplanetCateResponseType,
  type JumpitCateResponseType,
  type ProgrammersCateResponseType,
  type RememberCateResponseType,
} from '../../types/categoryResponseTypes';
import { type CategoryFilterType } from '../../types/commonTypes';

export default {
  /**
   * @deprecated CloudFlare에서 봇으로 인식하고 차단함
   */
  jobplanet: async (ctx: Context) => {
    try {
      const response = await axios.get<JobplanetCateResponseType>(JOBPLANET_CATE_URL, {
        headers: { 
          'User-Agent': 'Mozilla/5.0',
          'Host':'jobplanet.co.kr',
          'Accept':"*/*"
        },
      });


      let res: CategoryFilterType[] = [];
      if (response.data.code === HttpStatusCode.Ok) {
        const cates = response.data.data.display_filters[0].data;
        res = cates?.map(cate => ({
          label: cate.label,
          children: cate.data.map(childCate => ({
            label: childCate.label,
            value: childCate.label.includes('전체') ? cate.value : childCate.value,
          })),
        }));
      }
      sendResponse(ctx, response.data.code, '', res);
    } catch (error) {
      sendError(ctx, error);
    }
  },
  jumpit: async (ctx: Context) => {
    const response = await axios.get<JumpitCateResponseType>(JUMPIT_CATE_URL)
    const jobCategory = response.data.result.jobCategory;
    const res: CategoryFilterType[] = [{
      label: "전체",
      children: jobCategory.map(cate => ({
        label: cate.name,
        value: cate.id,
      })),
    }];
    sendResponse(ctx, HttpStatusCode.Ok, '', res);
  },
  programmers: async (ctx: Context) => {
    try {
      const response = await axios.get<ProgrammersCateResponseType>(PROGRAMMERS_CATE_URL);
      const res: CategoryFilterType[] = response.data.map(cate => ({
        label: cate.name,
        value: cate.id,
      }));

      sendResponse(ctx, HttpStatusCode.Ok, '', [{ label: '전체', children: res }]);
    } catch (error) {
      sendError(ctx, error);
    }
  },
  remember: async (ctx: Context) => {
    try {
      const response = await axios.get<RememberCateResponseType>(REMEMBER_CATE_URL);

      let res: CategoryFilterType[] = [];
      if (response.data.code === 'ok') {
        const cates = response.data.data.job_categories;
        res = cates?.map(cate => ({
          label: cate.name,
          children: cate.subs.map(childCate => ({
            label: childCate.name,
            value: `${cate.name}${DIVIDER_SIGN}${childCate.name}`,
          })),
        }));
      }
      sendResponse(ctx, HttpStatusCode.Ok, '', res);
    } catch (error) {
      sendError(ctx, error);
    }
  },
  wanted: async (ctx: Context) => {
    const response = await axios.get(WANTED_CATE_URL);
    const cateDoc = parse(response.data);
    const doc = cateDoc.querySelector('script#__NEXT_DATA__').innerText;
    const parsedProps = JSON.parse(doc)

    const res: CategoryFilterType[] = parsedProps.props.pageProps.tags.category.map((cate) => {
      return {
        label: cate.title,
        children: cate.tags.map((tag) => ({
          label: tag.title,
          value: tag.id,
        }))
      }
    })
    sendResponse(ctx, HttpStatusCode.Ok, '', res);
  },
  jobkorea: async (ctx: Context) => {
    const response = await axios.get(JOBKOREA_CATE_URL);
    const cateDoc = parse(response.data);
    const root = cateDoc.querySelectorAll('#depth1-dutyctgr > li > input');

    const res: CategoryFilterType[] = root.map((doc) => {
      const label = doc.nextElementSibling?.innerText?.replaceAll('&#183;', '·');
      if (!label) return null;
      return {
        label: doc.nextElementSibling?.innerText?.replaceAll('&#183;', '·'),
        children: cateDoc.querySelectorAll(`input[data-dutyctgrcode='${doc.getAttribute('value')}'][name='depth1-duty']`)?.map((childDoc) => ({
          label: childDoc?.nextElementSibling?.innerText?.replaceAll('&#183;', '·') ?? "",
          value: childDoc?.getAttribute('value') ?? "",
        })),
      }}
    )
    sendResponse(ctx, HttpStatusCode.Ok, '', res);
  },
};
