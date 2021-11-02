"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToKebabCase = exports.ToCamelCase = void 0;
function ToCamelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}
exports.ToCamelCase = ToCamelCase;
function ToKebabCase(string) {
    return string && string.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(s => s.toLocaleLowerCase()).join('-');
}
exports.ToKebabCase = ToKebabCase;
//# sourceMappingURL=convert-string-to-cases.js.map