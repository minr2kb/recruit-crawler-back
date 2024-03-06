"use strict";
/* eslint-disable no-unused-vars */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const axios_1 = __importStar(require("axios"));
const node_html_parser_1 = __importDefault(require("node-html-parser"));
const consts_1 = require("../../helpers/consts");
const response_1 = require("../../helpers/response");
exports.default = {
    /**
     * @deprecated CloudFlare에서 봇으로 인식하고 차단함
     */
    jobplanet: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(consts_1.JOBPLANET_CATE_URL, {
                headers: {
                    'User-Agent': 'Mozilla/5.0',
                    'Host': 'jobplanet.co.kr',
                    'Accept': "*/*"
                },
            });
            let res = [];
            if (response.data.code === axios_1.HttpStatusCode.Ok) {
                const cates = response.data.data.display_filters[0].data;
                res = cates === null || cates === void 0 ? void 0 : cates.map(cate => ({
                    label: cate.label,
                    children: cate.data.map(childCate => ({
                        label: childCate.label,
                        value: childCate.label.includes('전체') ? cate.value : childCate.value,
                    })),
                }));
            }
            (0, response_1.sendResponse)(ctx, response.data.code, '', res);
        }
        catch (error) {
            (0, response_1.sendError)(ctx, error);
        }
    }),
    jumpit: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const res = consts_1.jumpitCategories;
        (0, response_1.sendResponse)(ctx, axios_1.HttpStatusCode.Ok, '', res);
    }),
    programmers: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(consts_1.PROGRAMMERS_CATE_URL);
            const res = response.data.map(cate => ({
                label: cate.name,
                value: cate.id,
            }));
            (0, response_1.sendResponse)(ctx, axios_1.HttpStatusCode.Ok, '', [{ label: '전체', children: res }]);
        }
        catch (error) {
            (0, response_1.sendError)(ctx, error);
        }
    }),
    remember: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(consts_1.REMEMBER_CATE_URL);
            let res = [];
            if (response.data.code === 'ok') {
                const cates = response.data.data.job_categories;
                res = cates === null || cates === void 0 ? void 0 : cates.map(cate => ({
                    label: cate.name,
                    children: cate.subs.map(childCate => ({
                        label: childCate.name,
                        value: `${cate.name}${consts_1.DIVIDER_SIGN}${childCate.name}`,
                    })),
                }));
            }
            (0, response_1.sendResponse)(ctx, axios_1.HttpStatusCode.Ok, '', res);
        }
        catch (error) {
            (0, response_1.sendError)(ctx, error);
        }
    }),
    wanted: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const res = consts_1.wantedCategories.map(cate => ({
            label: cate.title,
            children: cate.tags.map(tag => ({ label: tag.title, value: tag.id })),
        }));
        (0, response_1.sendResponse)(ctx, axios_1.HttpStatusCode.Ok, '', res);
    }),
    jobkorea: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const jkCateDocUrl = consts_1.JOBKOREA_CATE_URL;
        const response = yield axios_1.default.get(jkCateDocUrl);
        const cateDoc = (0, node_html_parser_1.default)(response.data);
        const root = cateDoc.querySelectorAll('#depth1-dutyctgr > li > input');
        const res = root.map((doc) => {
            var _a, _b, _c, _d, _e;
            const label = (_b = (_a = doc.nextElementSibling) === null || _a === void 0 ? void 0 : _a.innerText) === null || _b === void 0 ? void 0 : _b.replaceAll('&#183;', '·');
            if (!label)
                return null;
            return {
                label: (_d = (_c = doc.nextElementSibling) === null || _c === void 0 ? void 0 : _c.innerText) === null || _d === void 0 ? void 0 : _d.replaceAll('&#183;', '·'),
                children: (_e = cateDoc.querySelectorAll(`input[data-dutyctgrcode='${doc.getAttribute('value')}']`)) === null || _e === void 0 ? void 0 : _e.map((childDoc) => {
                    var _a, _b, _c, _d;
                    return ({
                        label: (_c = (_b = (_a = childDoc === null || childDoc === void 0 ? void 0 : childDoc.nextElementSibling) === null || _a === void 0 ? void 0 : _a.innerText) === null || _b === void 0 ? void 0 : _b.replaceAll('&#183;', '·')) !== null && _c !== void 0 ? _c : "",
                        value: (_d = childDoc === null || childDoc === void 0 ? void 0 : childDoc.getAttribute('value')) !== null && _d !== void 0 ? _d : "",
                    });
                }),
            };
        });
        (0, response_1.sendResponse)(ctx, axios_1.HttpStatusCode.Ok, '', res);
    }),
};
//# sourceMappingURL=categories.controller.js.map