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
/* eslint-disable no-unused-vars */
const axios_1 = require("axios");
const consts_1 = require("../../helpers/consts");
const jobkorea_1 = require("../../helpers/crawlers/jobkorea");
const jobplanet_1 = __importDefault(require("../../helpers/crawlers/jobplanet"));
const jumpit_1 = require("../../helpers/crawlers/jumpit");
const programmers_1 = require("../../helpers/crawlers/programmers");
const remember_1 = require("../../helpers/crawlers/remember");
const wanted_1 = require("../../helpers/crawlers/wanted");
const response_1 = require("../../helpers/response");
exports.default = {
    /**
     * @deprecated CloudFlare에서 봇으로 인식하고 차단함
     */
    jobplanet: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const { position, cateKey, month } = ctx.query;
        const controller = new AbortController();
        const onClose = () => {
            console.log('Client connection closed');
            controller.abort();
        };
        ctx.res.on('close', onClose);
        try {
            const res = yield (0, jobplanet_1.default)(controller)(position, cateKey, month ? Number(month) : undefined);
            (0, response_1.sendResponse)(ctx, axios_1.HttpStatusCode.Ok, '', res);
        }
        catch (error) {
            console.log('ERROR');
            (0, response_1.sendError)(ctx, error);
        }
        finally {
            ctx.res.removeListener('close', onClose);
        }
    }),
    jumpit: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const { position, cateKey, page, month } = ctx.query;
        const controller = new AbortController();
        const onClose = () => {
            console.log('Client connection closed');
            controller.abort();
        };
        ctx.res.on('close', onClose);
        try {
            const res = page ?
                yield (0, jumpit_1.getPostsFromJumpitByPage)(controller)(position, cateKey, page ? Number(page) : undefined, month ? Number(month) : undefined) : yield (0, jumpit_1.getPostsFromJumpit)(controller)(position, cateKey, month ? Number(month) : undefined);
            (0, response_1.sendResponse)(ctx, axios_1.HttpStatusCode.Ok, '', res);
        }
        catch (error) {
            (0, response_1.sendError)(ctx, error);
        }
        finally {
            ctx.res.removeListener('close', onClose);
        }
    }),
    programmers: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const { position, cateKey, page, month } = ctx.query;
        const controller = new AbortController();
        const onClose = () => {
            console.log('Client connection closed');
            controller.abort();
        };
        ctx.res.on('close', onClose);
        try {
            const res = page ?
                yield (0, programmers_1.getPostsFromProgrammersByPage)(controller)(position, cateKey, page ? Number(page) : undefined, month ? Number(month) : undefined) : yield (0, programmers_1.getPostsFromProgrammers)(controller)(position, cateKey, month ? Number(month) : undefined);
            (0, response_1.sendResponse)(ctx, axios_1.HttpStatusCode.Ok, '', res);
        }
        catch (error) {
            (0, response_1.sendError)(ctx, error);
        }
        finally {
            ctx.res.removeListener('close', onClose);
        }
    }),
    remember: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const { position, cateKey, page, month } = ctx.query;
        const [cate1, cate2] = cateKey.split(consts_1.DIVIDER_SIGN);
        const controller = new AbortController();
        const onClose = () => {
            console.log('Client connection closed');
            controller.abort();
        };
        ctx.res.on('close', onClose);
        try {
            const res = page ?
                yield (0, remember_1.getPostsFromRememberByPage)(controller)(position, cate1, cate2, page ? Number(page) : undefined, month ? Number(month) : undefined) : yield (0, remember_1.getPostsFromRemember)(controller)(position, cate1, cate2, month ? Number(month) : undefined);
            (0, response_1.sendResponse)(ctx, axios_1.HttpStatusCode.Ok, '', res);
        }
        catch (error) {
            (0, response_1.sendError)(ctx, error);
        }
        finally {
            ctx.res.removeListener('close', onClose);
        }
    }),
    wanted: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const { position, cateKey, page } = ctx.query;
        const controller = new AbortController();
        const onClose = () => {
            console.log('Client connection closed');
            controller.abort();
        };
        ctx.res.on('close', onClose);
        try {
            const res = page ?
                yield (0, wanted_1.getPostsFromWantedByPage)(controller)(position, cateKey, page ? Number(page) : undefined) : yield (0, wanted_1.getPostsFromWanted)(controller)(position, cateKey);
            (0, response_1.sendResponse)(ctx, axios_1.HttpStatusCode.Ok, '', res);
        }
        catch (error) {
            (0, response_1.sendError)(ctx, error);
        }
        finally {
            ctx.res.removeListener('close', onClose);
        }
    }),
    jobkorea: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        // const { position, cateKey, page } = ctx.query;
        const controller = new AbortController();
        const onClose = () => {
            console.log('Client connection closed');
            controller.abort();
        };
        ctx.res.on('close', onClose);
        try {
            // const res = page ? 
            // await getPostsFromWantedByPage(controller)(
            //   position as string,
            //   cateKey as string,
            //   page ? Number(page) : undefined,
            // ) : await getPostsFromWanted(controller)(position as string, cateKey as string);
            const res = yield (0, jobkorea_1.getPostsFromJobKoreaByPage)(controller)('백엔드', '1000229', 1);
            (0, response_1.sendResponse)(ctx, axios_1.HttpStatusCode.Ok, '', res);
        }
        catch (error) {
            (0, response_1.sendError)(ctx, error);
        }
        finally {
            ctx.res.removeListener('close', onClose);
        }
    }),
};
//# sourceMappingURL=crawlers.controller.js.map