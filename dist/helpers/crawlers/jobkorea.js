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
exports.getPostsFromJobKorea = exports.getPostsFromJobKoreaByPage = void 0;
const axios_1 = __importDefault(require("axios"));
const node_html_parser_1 = __importDefault(require("node-html-parser"));
const format_1 = require("../format");
const validation_1 = require("../validation");
const COUNT_PER_PAGE = 40;
const getUrl = (cateKey, page) => `https://m.jobkorea.co.kr/recruit/joblist/_ListNormal?duty=${cateKey}&dkwrd=100023047566252&searchType=2&sort=8&page=${page}`;
const getDetailUrl = (id) => `https://m.jobkorea.co.kr/Recruit/GI_Read/${id}`;
const JOBKOREA_BASE_URL = 'https://www.jobkorea.co.kr/Recruit/GI_Read/';
const getPostsFromJobKoreaByPage = (controller) => (position, cateKey, page, month) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(getUrl(cateKey, page), {
        signal: controller.signal,
    });
    const { data } = response;
    const root = (0, node_html_parser_1.default)(data);
    const posts = root.querySelectorAll('li.devAgiWrap');
    let next = posts.length === COUNT_PER_PAGE;
    const promises = posts.map((el) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        const id = el.getAttribute("data-gno");
        let updatedDate = "";
        try {
            const response = yield axios_1.default.get(getDetailUrl(Number(id)), {
                signal: controller.signal,
            });
            const pageRoot = (0, node_html_parser_1.default)(response.data);
            const companyInfo = pageRoot.querySelector(`.company-name`);
            updatedDate = companyInfo === null || companyInfo === void 0 ? void 0 : companyInfo.getAttribute("data-applystartdt");
        }
        catch (e) {
            console.error(e);
        }
        if (updatedDate && month && !(0, validation_1.isInMonths)(updatedDate, month)) {
            return null;
        }
        return {
            platform: '잡코리아',
            companyName: el.querySelector(".company").innerText,
            position,
            title: (_a = el.querySelector(".title").innerText) !== null && _a !== void 0 ? _a : '',
            updatedDate: updatedDate ? (0, format_1.toStringByFormatting)(new Date(updatedDate)) : "",
            recruitUrl: JOBKOREA_BASE_URL + id,
            companyLocation: (_c = (_b = el.querySelector(".item").innerText) === null || _b === void 0 ? void 0 : _b.split("\r\n")[4].replace("&gt;", "").trim()) !== null && _c !== void 0 ? _c : '',
        };
    }));
    const result = (yield Promise.all(promises)).filter(data => !!data);
    if (result.length === 0)
        next = false;
    return { result, next };
});
exports.getPostsFromJobKoreaByPage = getPostsFromJobKoreaByPage;
const getPostsFromJobKorea = (controller) => (position, cateKey, month) => __awaiter(void 0, void 0, void 0, function* () {
    let result = [];
    let page = 1;
    let hasNextPage = true;
    while (hasNextPage && !controller.signal.aborted) {
        const pageResult = yield (0, exports.getPostsFromJobKoreaByPage)(controller)(position, cateKey, page, month);
        result = result.concat(pageResult.result);
        hasNextPage = pageResult.next;
        page += 1;
    }
    return result.sort((a, b) => new Date(b.updatedDate).valueOf() - new Date(a.updatedDate).valueOf());
});
exports.getPostsFromJobKorea = getPostsFromJobKorea;
//# sourceMappingURL=jobkorea.js.map