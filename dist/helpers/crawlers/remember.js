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
exports.getPostsFromRemember = exports.getPostsFromRememberByPage = void 0;
const axios_1 = __importDefault(require("axios"));
const format_1 = require("../format");
const validation_1 = require("../validation");
const getUrl = () => `https://career-api.rememberapp.co.kr/job_postings/search`;
const getPostBody = (cateKey, subCateKey, page) => ({
    page,
    sort: 'starts_at_desc',
    search: {
        job_category_names: [{ level1: cateKey, level2: subCateKey }],
        organization_type: 'without_headhunter',
    },
});
const REMEMBER_BASE_URL = 'https://career.rememberapp.co.kr/job/postings/';
const getPostsFromRememberByPage = (controller) => (position, cateKey, subCateKey, page, month) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // console.log(`Remember - ${position} - page - ${page}`);
    const response = yield axios_1.default.post(getUrl(), getPostBody(cateKey, subCateKey, page), {
        signal: controller.signal,
    });
    const { data } = response;
    let result = [];
    let next = page < data.meta.total_pages;
    for (const post of data.data) {
        if (month && !(0, validation_1.isInMonths)(post.starts_at, month)) {
            next = false;
            break;
        }
        const targetData = {
            platform: '리멤버',
            companyName: (_b = (_a = post.organization) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '',
            title: post.title,
            position,
            updatedDate: (0, format_1.toStringByFormatting)(new Date(post.starts_at)),
            recruitUrl: REMEMBER_BASE_URL + post.id,
            companyLocation: post.addresses[0]
                ? `${post.addresses[0].address_level1} ${post.addresses[0].address_level2}`
                : '',
        };
        result.push(targetData);
    }
    return {
        result,
        next
    };
});
exports.getPostsFromRememberByPage = getPostsFromRememberByPage;
const getPostsFromRemember = (controller) => (position, cateKey, subCateKey, month) => __awaiter(void 0, void 0, void 0, function* () {
    let result = [];
    let page = 1;
    let hasNextPage = true;
    while (hasNextPage && !controller.signal.aborted) {
        const pageResult = yield (0, exports.getPostsFromRememberByPage)(controller)(position, cateKey, subCateKey, page, month);
        result = result.concat(pageResult.result);
        hasNextPage = pageResult.next;
        page += 1;
    }
    return result.sort((a, b) => new Date(b.updatedDate).valueOf() - new Date(a.updatedDate).valueOf());
});
exports.getPostsFromRemember = getPostsFromRemember;
//# sourceMappingURL=remember.js.map