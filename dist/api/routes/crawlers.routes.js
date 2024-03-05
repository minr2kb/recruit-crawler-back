"use strict";
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
const koa_router_1 = __importDefault(require("koa-router"));
const controllers_1 = require("../controllers");
const router = new koa_router_1.default({ prefix: '/crawlers' })
    /**
     * @deprecated CloudFlare에서 봇으로 인식하고 차단함
     */
    .get('/jobplanet', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield controllers_1.CrawlerCtrl.jobplanet(ctx);
}))
    .get('/jumpit', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield controllers_1.CrawlerCtrl.jumpit(ctx);
}))
    .get('/programmers', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield controllers_1.CrawlerCtrl.programmers(ctx);
}))
    .get('/remember', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield controllers_1.CrawlerCtrl.remember(ctx);
}))
    .get('/wanted', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield controllers_1.CrawlerCtrl.wanted(ctx);
}))
    .get('/jobkorea', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield controllers_1.CrawlerCtrl.jobkorea(ctx);
}));
exports.default = () => router.routes();
//# sourceMappingURL=crawlers.routes.js.map