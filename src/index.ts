/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */

import cors from '@koa/cors';
import Koa, { type Context } from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import routes from './api/routes';

const app = new Koa();
const router = new Router();
const port: number = Number(process.env.PORT) || 3005;

require('events').EventEmitter.defaultMaxListeners = 100;

app.proxy = true;

app.use(bodyParser());

router.get('/', ctx => {
  ctx.body = 'Hello World';
});

router.get('/health-check', ctx => {
  ctx.body = 'GOOD';
});

// cors
app.use(
  cors({
    origin(ctx: Context) {
      return ctx.get('Origin') || '*';
    },
  }),
);

// error handling
app.on('error', (err, ctx) => {
  // attach meta information to report error
  err.data
    ? (err.data.requestBody = ctx.request.body)
    : (err.data = { requestBody: ctx.request.body });

  err.data.state = ctx.state;

  // print error
  console.error('@@@@@@@@@@@@@@@@@@@@@@@ !!! ERROR !!! @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
  console.error(
    `UncaughtException: ${err}, \n [data]: ${JSON.stringify(err.data, null, 2)} \n [stack]: ${
      err.stack
    }`,
  );
  console.error('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
});

// middleware for logging
app.use(async (ctx: Context, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;

  const { method, url, status } = ctx;
  const logLevel = status >= 500 ? 'error' : status >= 400 ? 'warn' : 'info';

  const logger = console;

  logger[logLevel](`\n${new Date(start).toTimeString()} ${'\x1b[32m'}[${method}] ${url} ${status}${'\x1b[0m'} - ${ms}ms - ${ctx.get('user-agent')}`);
  
})

app.use(routes()).use(router.routes());

const server = app.listen(port, () => {
  console.log(`Koa server is listening on port ${port}`);
})

server.setTimeout(1000 * 60 * 10); // 10mins