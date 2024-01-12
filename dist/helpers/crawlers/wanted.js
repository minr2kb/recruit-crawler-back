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
exports.getPostsFromWanted = exports.getPostsFromWantedByPage = void 0;
const axios_1 = __importDefault(require("axios"));
const COUNT_PER_PAGE = 20;
const getUrl = (cateKey, page) => `https://www.wanted.co.kr/api/v4/jobs?country=kr&tag_type_ids=${cateKey}&locations=all&years=-1&limit=${COUNT_PER_PAGE}&offset=${COUNT_PER_PAGE * page}&job_sort=job.latest_order`;
const getDetailUrl = (id) => `https://www.wanted.co.kr/api/v4/jobs/${id}`;
const WANTED_BASE_URL = 'https://www.wanted.co.kr/wd/';
const getPostsFromWantedByPage = (controller) => (position, cateKey, page) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // console.log(`Wanted - ${position} - page - ${page}`);
    const response = yield axios_1.default.get(getUrl(cateKey, page), {
        signal: controller.signal,
    });
    const { data } = response;
    const posts = data.data;
    const next = !!((_a = data.links) === null || _a === void 0 ? void 0 : _a.next);
    const promises = posts.map((post) => __awaiter(void 0, void 0, void 0, function* () {
        var _b, _c, _d, _e, _f;
        const response = yield axios_1.default.get(getDetailUrl(post.id), {
            signal: controller.signal,
        });
        const data = response.data.job;
        const targetData = {
            platform: '원티드',
            companyName: (_c = (_b = data.company) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : '',
            position,
            title: (_d = data.position) !== null && _d !== void 0 ? _d : '',
            updatedDate: '',
            recruitUrl: post.id ? WANTED_BASE_URL + post.id : '',
            companyLocation: (_f = (_e = data.address) === null || _e === void 0 ? void 0 : _e.full_location) !== null && _f !== void 0 ? _f : '',
        };
        return targetData;
    }));
    const result = (yield Promise.all(promises)).filter(data => !!data);
    return {
        result,
        next: next
    };
});
exports.getPostsFromWantedByPage = getPostsFromWantedByPage;
const getPostsFromWanted = (controller) => (position, cateKey) => __awaiter(void 0, void 0, void 0, function* () {
    let result = [];
    let page = 0;
    let hasMorePages = true;
    while (hasMorePages && !controller.signal.aborted) {
        const pageResult = yield (0, exports.getPostsFromWantedByPage)(controller)(position, cateKey, page);
        if (pageResult.result.length > 0) {
            result = result.concat(pageResult.result);
        }
        hasMorePages = pageResult.next;
        page += 1;
    }
    return result.sort((a, b) => new Date(b.updatedDate).valueOf() - new Date(a.updatedDate).valueOf());
});
exports.getPostsFromWanted = getPostsFromWanted;
//# sourceMappingURL=wanted.js.map