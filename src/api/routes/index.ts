import compose from 'koa-compose';
import Router from 'koa-router';
import categoriesRoutes from './categories.routes';
import crawlersRoutes from './crawlers.routes';

const router = new Router({ prefix: '/api' }).use(crawlersRoutes()).use(categoriesRoutes());

export default () => compose([router.routes(), router.allowedMethods()]);
