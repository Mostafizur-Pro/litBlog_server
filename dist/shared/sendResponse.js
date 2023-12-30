"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseForData = void 0;
// response for create
const sendResponseForCreate = (res, data) => {
    const responseData = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message || null,
        data: data.data || null,
    };
    res.status(data.statusCode).json(responseData);
};
// updated by siam
const sendResponse = (res, data) => {
    const responseData = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message || null,
        meta: data.meta || null || undefined,
        data: data.data || null,
    };
    res.status(data.statusCode).json(responseData);
};
exports.responseForData = {
    sendResponseForCreate,
    sendResponse,
};
