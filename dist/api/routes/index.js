"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_compose_1 = __importDefault(require("koa-compose"));
const koa_router_1 = __importDefault(require("koa-router"));
const categories_routes_1 = __importDefault(require("./categories.routes"));
const crawlers_routes_1 = __importDefault(require("./crawlers.routes"));
const router = new koa_router_1.default({ prefix: '/api' }).use((0, crawlers_routes_1.default)()).use((0, categories_routes_1.default)());
exports.default = () => (0, koa_compose_1.default)([router.routes(), router.allowedMethods()]);
//# sourceMappingURL=index.js.map