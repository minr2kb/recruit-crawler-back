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
const axios_1 = __importDefault(require("axios"));
const format_1 = require("../format");
const validation_1 = require("../validation");
const getUrl = (cateKey, page) => `https://www.jobplanet.co.kr/api/v3/job/postings?order_by=recent&occupation_level2=${cateKey}&page=${page}&page_size=20`;
const getDetailUrl = (id) => `https://www.jobplanet.co.kr/api/v1/job/postings/${id}`;
const JOBPLANET_BASE_URL = 'https://www.jobplanet.co.kr/job/search?posting_ids%5B%5D=';
const COUNT_PER_PAGE = 20;
const getPostsFromJobplanet = (controller) => (position, cateKey, month) => __awaiter(void 0, void 0, void 0, function* () {
    const result = [];
    let posts = [...Array(COUNT_PER_PAGE)];
    let page = 1;
    while (posts.length === COUNT_PER_PAGE && !controller.signal.aborted) {
        // console.log(`Jobplanet - ${position} - page - ${page}`);
        const response = yield axios_1.default.get(getUrl(cateKey, page), {
            headers: {
                'User-Agent': 'PostmanRuntime/7.36.0',
                'Host': 'www.jobplanet.co.kr'
            },
            signal: controller.signal,
        });
        const { data } = response;
        if (data.code !== 200) {
            console.error('ERROR');
            continue;
        }
        posts = data.data.recruits;
        page += 1;
        const promises = posts.map((post) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c;
            const response = yield axios_1.default.get(getDetailUrl(post.id), {
                headers: {
                    'User-Agent': 'PostmanRuntime/7.36.0',
                    'Host': 'www.jobplanet.co.kr'
                },
                signal: controller.signal,
            });
            const { data } = response.data;
            if (month && !(0, validation_1.isInMonths)(post.updated_at, month))
                return;
            const targetData = {
                platform: '잡플래닛',
                companyName: (_a = data.name) !== null && _a !== void 0 ? _a : '',
                position,
                title: (_b = data.title) !== null && _b !== void 0 ? _b : '',
                updatedDate: (0, format_1.toStringByFormatting)(new Date(post.updated_at)),
                recruitUrl: post.id ? JOBPLANET_BASE_URL + post.id : '',
                companyLocation: (_c = data.location) !== null && _c !== void 0 ? _c : '',
            };
            return targetData;
        }));
        const results = yield Promise.all(promises);
        results.forEach(data => {
            if (data)
                result.push(data);
        });
    }
    return result.sort((a, b) => new Date(b.updatedDate).valueOf() - new Date(a.updatedDate).valueOf());
});
exports.default = getPostsFromJobplanet;
//# sourceMappingURL=jobplanet.js.map