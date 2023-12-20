"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendResponse = void 0;
/* eslint-disable no-param-reassign */
const axios_1 = require("axios");
// eslint-disable-next-line import/prefer-default-export
function sendResponse(ctx, statusCode = axios_1.HttpStatusCode.Ok, message = '', data = {}) {
    ctx.status = statusCode;
    ctx.body = data;
    ctx.message = message !== null && message !== void 0 ? message : '';
}
exports.sendResponse = sendResponse;
function sendError(ctx, error) {
    var _a;
    if ((0, axios_1.isAxiosError)(error)) {
        // Handle AxiosError
        console.error('AxiosError:', error);
        sendResponse(ctx, (_a = error.response) === null || _a === void 0 ? void 0 : _a.status, error.message, []);
    }
    else {
        // Handle other types of errors
        console.error('Other Error:', error);
        sendResponse(ctx, axios_1.HttpStatusCode.InternalServerError, 'InternalServerError', []);
    }
}
exports.sendError = sendError;
//# sourceMappingURL=response.js.map