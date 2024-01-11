"use strict";
/* eslint-disable consistent-return */
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
exports.getPostsFromJumpit = exports.getPostsFromJumpitByPage = void 0;
const axios_1 = __importDefault(require("axios"));
const format_1 = require("../format");
const validation_1 = require("../validation");
const getUrl = (cateKey, page) => `https://api.jumpit.co.kr/api/positions?page=${page}&jobCategory=${cateKey}&sort=reg_dt&highlight=false`;
const getDetailUrl = (id) => `https://api.jumpit.co.kr/api/position/${id}`;
const JUMPIT_BASE_URL = 'https://www.jumpit.co.kr/position/';
const COUNT_PER_PAGE = 16;
const getPostsFromJumpitByPage = (controller) => (position, cateKey, page, month) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Jumpit - ${position} - page - ${page}`);
    const response = yield axios_1.default.get(getUrl(cateKey, page), {
        signal: controller.signal,
    });
    const { data } = response;
    if (data.status !== 200) {
        console.error('ERROR');
        return { result: [], next: false };
    }
    const posts = data.result.positions;
    let next = posts.length === COUNT_PER_PAGE;
    const promises = posts.map((post) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const response = yield axios_1.default.get(getDetailUrl(post.id), {
            signal: controller.signal,
        });
        const data = response.data.result;
        if (month && !(0, validation_1.isInMonths)(data.publishedAt, month)) {
            return null;
        }
        return {
            platform: '점핏',
            companyName: (_a = data.companyName) !== null && _a !== void 0 ? _a : '',
            position,
            title: (_b = data.title) !== null && _b !== void 0 ? _b : '',
            updatedDate: (0, format_1.toStringByFormatting)(new Date(data.publishedAt)),
            recruitUrl: data.id ? JUMPIT_BASE_URL + data.id : '',
            companyLocation: data.workingPlaces[0] ? data.workingPlaces[0].address : '',
        };
    }));
    const result = (yield Promise.all(promises)).filter(data => !!data);
    if (result.length === 0)
        next = false;
    return { result, next };
});
exports.getPostsFromJumpitByPage = getPostsFromJumpitByPage;
const getPostsFromJumpit = (controller) => (position, cateKey, month) => __awaiter(void 0, void 0, void 0, function* () {
    let result = [];
    let page = 1;
    let hasNextPage = true;
    while (hasNextPage && !controller.signal.aborted) {
        const pageResult = yield (0, exports.getPostsFromJumpitByPage)(controller)(position, cateKey, page, month);
        result = result.concat(pageResult.result);
        hasNextPage = pageResult.next;
        page += 1;
    }
    return result.sort((a, b) => new Date(b.updatedDate).valueOf() - new Date(a.updatedDate).valueOf());
});
exports.getPostsFromJumpit = getPostsFromJumpit;
//# sourceMappingURL=jumpit.js.map