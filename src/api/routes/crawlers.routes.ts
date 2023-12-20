import Router from 'koa-router';
import { CrawlerCtrl } from '../controllers';

const router = new Router({ prefix: '/crawlers' })
  /**
   * @deprecated CloudFlare에서 봇으로 인식하고 차단함
   */
  .get('/jobplanet', async ctx => {
    await CrawlerCtrl.jobplanet(ctx);
  })
  .get('/jumpit', async ctx => {
    await CrawlerCtrl.jumpit(ctx);
  })
  .get('/programmers', async ctx => {
    await CrawlerCtrl.programmers(ctx);
  })
  .get('/remember', async ctx => {
    await CrawlerCtrl.remember(ctx);
  })
  .get('/wanted', async ctx => {
    await CrawlerCtrl.wanted(ctx);
  });

export default () => router.routes();
