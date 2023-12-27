/* eslint-disable no-unused-vars */
import { HttpStatusCode } from 'axios';
import { type Context } from 'koa';
import { DIVIDER_SIGN } from '../../helpers/consts';
import getPostsFromJobplanet from '../../helpers/crawlers/jobplanet';
import getPostsFromJumpit from '../../helpers/crawlers/jumpit';
import getPostsFromProgrammers from '../../helpers/crawlers/programmers';
import getPostsFromRemember from '../../helpers/crawlers/remember';
import getPostsFromWanted from '../../helpers/crawlers/wanted';
import { sendError, sendResponse } from '../../helpers/response';

export default {
  /**
   * @deprecated CloudFlare에서 봇으로 인식하고 차단함
   */
  jobplanet: async (ctx: Context) => {
    const { position, cateKey, month } = ctx.query;

    const controller = new AbortController();

    const onClose = () => {
      console.log('Client connection closed');
      controller.abort();
    };
    ctx.res.on('close', onClose);

    try {
      const res = await getPostsFromJobplanet(controller)(
        position as string,
        cateKey as string,
        month ? Number(month) : undefined
      );

      sendResponse(ctx, HttpStatusCode.Ok, '', res);
    } catch (error) {
      console.log('ERROR');
      sendError(ctx, error);
    } finally {
      ctx.res.removeListener('close', onClose);
    }
  },
  jumpit: async (ctx: Context) => {
    const { position, cateKey, month } = ctx.query;

    const controller = new AbortController();

    const onClose = () => {
      console.log('Client connection closed');
      controller.abort();
    };
    ctx.res.on('close', onClose);

    try {
      const res = await getPostsFromJumpit(controller)(
        position as string,
        cateKey as string,
        month ? Number(month) : undefined,
      );
      sendResponse(ctx, HttpStatusCode.Ok, '', res);
    } catch (error) {
      sendError(ctx, error);
    } finally {
      ctx.res.removeListener('close', onClose);
    }
  },
  programmers: async (ctx: Context) => {
    const { position, cateKey, month } = ctx.query;

    const controller = new AbortController();

    const onClose = () => {
      console.log('Client connection closed');
      controller.abort();
    };
    ctx.res.on('close', onClose);

    try {
      const res = await getPostsFromProgrammers(controller)(
        position as string,
        cateKey as string,
        month ? Number(month) : undefined,
      );
      sendResponse(ctx, HttpStatusCode.Ok, '', res);
    } catch (error) {
      sendError(ctx, error);
    } finally {
      ctx.res.removeListener('close', onClose);
    }
  },
  remember: async (ctx: Context) => {
    const { position, cateKey, month } = ctx.query;
    const [cate1, cate2] = (cateKey as string).split(DIVIDER_SIGN);

    const controller = new AbortController();

    const onClose = () => {
      console.log('Client connection closed');
      controller.abort();
    };
    ctx.res.on('close', onClose);

    try {
      const res = await getPostsFromRemember(controller)(
        position as string,
        cate1,
        cate2,
        month ? Number(month) : undefined,
      );
      sendResponse(ctx, HttpStatusCode.Ok, '', res);
    } catch (error) {
      sendError(ctx, error);
    } finally {
      ctx.res.removeListener('close', onClose);
    }
  },
  wanted: async (ctx: Context) => {
    const { position, cateKey } = ctx.query;

    const controller = new AbortController();

    const onClose = () => {
      console.log('Client connection closed');
      controller.abort();
    };
    ctx.res.on('close', onClose);

    try {
      const res = await getPostsFromWanted(controller)(position as string, cateKey as string);
      sendResponse(ctx, HttpStatusCode.Ok, '', res);
    } catch (error) {
      sendError(ctx, error);
    } finally {
      ctx.res.removeListener('close', onClose);
    }
  },
};
