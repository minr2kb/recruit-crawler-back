"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toStringByFormatting = exports.leftPad = void 0;
function leftPad(value) {
    if (value >= 10) {
        return value;
    }
    return `0${value}`;
}
exports.leftPad = leftPad;
function toStringByFormatting(source, delimiter = '-') {
    const year = source.getFullYear();
    const month = leftPad(source.getMonth() + 1);
    const day = leftPad(source.getDate());
    return [year, month, day].join(delimiter);
}
exports.toStringByFormatting = toStringByFormatting;
//# sourceMappingURL=format.js.map