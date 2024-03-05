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
exports.getPostsFromJobKoreaByPage = void 0;
const axios_1 = __importDefault(require("axios"));
const node_html_parser_1 = __importDefault(require("node-html-parser"));
const COUNT_PER_PAGE = 20;
// "https://m.jobkorea.co.kr/recruit/joblist/_ListNormal?duty=1000229&searchType=2&sort=8&page=1"
const getUrl = (cateKey, page) => `https://m.jobkorea.co.kr/recruit/joblist/_ListNormal?duty=${cateKey}&dkwrd=100023047566252&searchType=2&sort=8&page=${page}`;
// const getDetailUrl = (id: number) => `https://www.wanted.co.kr/api/v4/jobs/${id}`;
// const WANTED_BASE_URL = 'https://www.wanted.co.kr/wd/';
const getPostsFromJobKoreaByPage = (controller) => (position, cateKey, page) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(getUrl(cateKey, page), {
        signal: controller.signal,
    });
    const { data } = response;
    const root = (0, node_html_parser_1.default)(data);
    root.querySelectorAll('li.devAgiWrap').forEach((el) => {
        console.log(el.getAttribute("data-gno"));
    });
    return data;
});
exports.getPostsFromJobKoreaByPage = getPostsFromJobKoreaByPage;
//# sourceMappingURL=jobkorea.js.map