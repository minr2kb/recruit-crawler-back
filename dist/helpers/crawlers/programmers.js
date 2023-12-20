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
const getUrl = (cateKey, pageNum) => `https://career.programmers.co.kr/api/job_positions?order=recent&page=${pageNum}&job_category_ids[]=${cateKey}`;
const PROGRAMMERS_BASE_URL = 'https://career.programmers.co.kr/job_positions/';
const getPostsFromProgrammers = (position, cateKey, month) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const result = [];
    let totalPages = 1;
    let posts = [];
    let page = 1;
    while (page <= totalPages) {
        console.log(`Programmers - ${position} - page - ${page}`);
        const response = yield axios_1.default.get(getUrl(cateKey, page));
        const { data } = response;
        posts = data.jobPositions;
        totalPages = data.totalPages;
        page += 1;
        for (const post of posts) {
            if (month && !(0, validation_1.isInMonths)(post.updatedAt, month))
                break;
            const targetData = {
                platform: '프로그래머스',
                companyName: (_b = (_a = post.company) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '',
                position,
                title: (_c = post.title) !== null && _c !== void 0 ? _c : '',
                updatedDate: (0, format_1.toStringByFormatting)(new Date(post.updatedAt)),
                recruitUrl: PROGRAMMERS_BASE_URL + post.id,
                companyLocation: (_d = post.address) !== null && _d !== void 0 ? _d : '',
            };
            result.push(targetData);
        }
    }
    return result.sort((a, b) => new Date(b.updatedDate).valueOf() - new Date(a.updatedDate).valueOf());
});
exports.default = getPostsFromProgrammers;
//# sourceMappingURL=programmers.js.map