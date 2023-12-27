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
const COUNT_PER_PAGE = 20;
const getUrl = (cateKey, pageNum) => `https://www.wanted.co.kr/api/v4/jobs?country=kr&tag_type_ids=${cateKey}&locations=all&years=-1&limit=${COUNT_PER_PAGE}&offset=${COUNT_PER_PAGE * pageNum}&job_sort=job.latest_order`;
const getDetailUrl = (id) => `https://www.wanted.co.kr/api/v4/jobs/${id}`;
const WANTED_BASE_URL = 'https://www.wanted.co.kr/wd/';
const getPostsFromWanted = (controller) => (position, cateKey) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const result = [];
    let posts = [...Array(COUNT_PER_PAGE)];
    let page = 0;
    let nextUrl = getUrl(position, page);
    while (nextUrl && posts.length === COUNT_PER_PAGE && !controller.signal.aborted) {
        console.log(`Wanted - ${position} - page - ${page}`);
        const response = yield axios_1.default.get(getUrl(cateKey, page));
        const { data } = response;
        nextUrl = (_a = data.links) === null || _a === void 0 ? void 0 : _a.next;
        if (!((_b = data.links) === null || _b === void 0 ? void 0 : _b.next)) {
            break;
        }
        posts = data.data;
        page += 1;
        const promises = posts.map((post) => __awaiter(void 0, void 0, void 0, function* () {
            var _c, _d, _e, _f, _g;
            const response = yield axios_1.default.get(getDetailUrl(post.id), {
                signal: controller.signal,
            });
            const data = response.data.job;
            const targetData = {
                platform: '원티드',
                companyName: (_d = (_c = data.company) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : '',
                position,
                title: (_e = data.position) !== null && _e !== void 0 ? _e : '',
                updatedDate: '',
                recruitUrl: post.id ? WANTED_BASE_URL + post.id : '',
                companyLocation: (_g = (_f = data.address) === null || _f === void 0 ? void 0 : _f.full_location) !== null && _g !== void 0 ? _g : '',
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
exports.default = getPostsFromWanted;
//# sourceMappingURL=wanted.js.map