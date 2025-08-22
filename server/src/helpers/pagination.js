"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagination = void 0;
const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 10;
const getPagination = (query) => {
    const page = query.page
        ? Math.round(Math.abs(query.page))
        : DEFAULT_PAGE_NUMBER;
    const limit = query.limit
        ? Math.round(Math.abs(query.limit))
        : DEFAULT_PAGE_LIMIT;
    const offset = (page - 1) * limit;
    return { offset, limit };
};
exports.getPagination = getPagination;
