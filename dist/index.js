"use strict";
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("@koa/cors"));
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_router_1 = __importDefault(require("koa-router"));
const routes_1 = __importDefault(require("./api/routes"));
const app = new koa_1.default();
const router = new koa_router_1.default();
const port = Number(process.env.PORT) || 3005;
require('events').EventEmitter.defaultMaxListeners = 100;
app.proxy = true;
app.use((0, koa_bodyparser_1.default)());
router.get('/', ctx => {
    ctx.body = 'Hello World';
});
router.get('/health-check', ctx => {
    ctx.body = 'GOOD';
});
// cors
app.use((0, cors_1.default)({
    origin(ctx) {
        return ctx.get('Origin') || '*';
    },
}));
// error handling
app.on('error', (err, ctx) => {
    // attach meta information to report error
    err.data
        ? (err.data.requestBody = ctx.request.body)
        : (err.data = { requestBody: ctx.request.body });
    err.data.state = ctx.state;
    // print error
    console.error('@@@@@@@@@@@@@@@@@@@@@@@ !!! ERROR !!! @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    console.error(`UncaughtException: ${err}, \n [data]: ${JSON.stringify(err.data, null, 2)} \n [stack]: ${err.stack}`);
    console.error('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
});
app.use((0, routes_1.default)()).use(router.routes());
const server = app.listen(port, () => {
    console.log(`Koa server is listening on port ${port}`);
});
server.setTimeout(1000 * 60 * 10); // 10mins
//# sourceMappingURL=index.js.map