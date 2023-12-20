import Router from 'koa-router';
import { CategoryCtrl } from '../controllers';

const router = new Router({ prefix: '/categories' })
  /**
   * @deprecated CloudFlare에서 봇으로 인식하고 차단함
   */
  .get('/jobplanet', async ctx => {
    await CategoryCtrl.jobplanet(ctx);
  })
  .get('/jumpit', async ctx => {
    await CategoryCtrl.jumpit(ctx);
  })
  .get('/programmers', async ctx => {
    await CategoryCtrl.programmers(ctx);
  })
  .get('/remember', async ctx => {
    await CategoryCtrl.remember(ctx);
  })
  .get('/wanted', async ctx => {
    await CategoryCtrl.wanted(ctx);
  });

export default () => router.routes();
