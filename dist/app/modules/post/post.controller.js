"use strict";
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
exports.postController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = require("../../../shared/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const post_service_1 = require("./post.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const createAPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postData = req.body;
    const result = yield post_service_1.postService.createAPost(postData);
    sendResponse_1.responseForData.sendResponseForCreate(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Post created Successful',
        data: result,
    });
}));
// get all  data
const getAllPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, ['searchTerm', 'title', 'category_name']);
    const paginationOption = (0, pick_1.default)(req.query, [
        'limit',
        'page',
        'sortBy',
        'sortOrder',
    ]);
    const result = yield post_service_1.postService.getAllPost(filters, paginationOption);
    sendResponse_1.responseForData.sendResponse(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: ' Getting Successful',
        data: result.data,
        meta: result.meta,
    });
}));
// get a single post
const getSinglePostData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield post_service_1.postService.getSinglePostData(id);
    sendResponse_1.responseForData.sendResponseForCreate(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: ' Getting Successful',
        data: result,
    });
}));
// update post
const updatePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updateData = req.body;
    const result = yield post_service_1.postService.updatePost(id, updateData);
    sendResponse_1.responseForData.sendResponseForCreate(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Your Post Update Successful',
        data: result,
    });
}));
// delete a post
const deletePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, dataObjectId } = req.params;
    const result = yield post_service_1.postService.deletePost(postId, dataObjectId);
    sendResponse_1.responseForData.sendResponseForCreate(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Post Delete Successful',
        data: result,
    });
}));
// delete entire doc
const deleteEntirePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield post_service_1.postService.deleteEntirePost(id);
    sendResponse_1.responseForData.sendResponseForCreate(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Post Delete Successful',
        data: result,
    });
}));
exports.postController = {
    createAPost,
    getSinglePostData,
    getAllPost,
    updatePost,
    deletePost,
    deleteEntirePost,
};
