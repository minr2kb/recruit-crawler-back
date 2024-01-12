"use strict";
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
// middleware for logging
app.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const start = Date.now();
    yield next();
    const ms = Date.now() - start;
    const { method, url, status } = ctx;
    const logLevel = status >= 500 ? 'error' : status >= 400 ? 'warn' : 'info';
    console[logLevel](`\n${new Date(start).toTimeString()} ${'\x1b[32m'}[${method}] ${url} ${status}${'\x1b[0m'} - ${ms}ms - ${ctx.get('user-agent')}`);
}));
app.use((0, routes_1.default)()).use(router.routes());
const server = app.listen(port, () => {
    console.log(`Koa server is listening on port ${port}`);
});
server.setTimeout(1000 * 60 * 10); // 10mins
//# sourceMappingURL=index.js.map