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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const post_model_1 = require("./post.model");
// create a post
const createAPost = (postData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if post with the given user_id already exists
        const existingPost = yield post_model_1.Post.findOne({ user_id: postData.user_id });
        if (existingPost) {
            // If the post exists, update it by pushing the new data to the data array
            const updatedPost = yield post_model_1.Post.findByIdAndUpdate(existingPost._id, { $push: { data: postData.data } }, { new: true });
            return updatedPost;
        }
        else {
            // If the post doesn't exist, create a new post
            const newPost = (yield post_model_1.Post.create(postData)).populate('user_id');
            return newPost;
        }
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Post created Error');
    }
});
// get all post
const getAllPost = (filters, paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    // this is for search
    const postSearchFiled = ['title', 'category_name'];
    const andCconditions = [];
    if (searchTerm) {
        andCconditions.push({
            $or: postSearchFiled.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // this is for filter part
    if (Object.keys(filtersData).length) {
        andCconditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const whereConditions = andCconditions.length > 0 ? { $and: andCconditions } : {};
    // this is for pagination
    const { page = 1, limit = 10 } = paginationOption;
    const skip = (page - 1) * limit;
    const result = yield post_model_1.Post.find(whereConditions)
        .sort({
        createdAt: 'desc',
    })
        .skip(skip)
        .limit(limit);
    const total = yield post_model_1.Post.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// get a post by single id
const getSinglePostData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.findById(id);
    return result;
});
// update a post data
const updatePost = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
// delete post // an object from array
const deletePost = (postId, dataObjectId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the post by ID
        const post = yield post_model_1.Post.findById(postId);
        // Check if the post exists
        if (!post) {
            return {
                statusCode: http_status_1.default.NOT_FOUND,
                success: false,
                message: 'Post not found',
                data: null,
            };
        }
        // If dataObjectId is provided, delete the specific object from the data array
        if (dataObjectId) {
            const dataIndex = post.data.findIndex(dataObj => dataObj.id === dataObjectId);
            // Check if the data object exists
            if (dataIndex === -1) {
                return {
                    statusCode: http_status_1.default.NOT_FOUND,
                    success: false,
                    message: 'Data object not found in the post',
                    data: null,
                };
            }
            // Remove the data object from the data array
            post.data.splice(dataIndex, 1);
            // Save the post after removing the data object
            yield post.save();
            return {
                statusCode: http_status_1.default.OK,
                success: true,
                message: 'Data object deleted successfully',
                data: null,
            };
        }
        else {
            // Delete the entire post if no dataObjectId is provided
            yield post_model_1.Post.findByIdAndDelete(postId);
            return {
                statusCode: http_status_1.default.OK,
                success: true,
                message: 'Post deleted successfully',
                data: null,
            };
        }
    }
    catch (error) {
        // Handle errors during data object or post deletion
        return {
            statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
            success: false,
            message: 'Error deleting post or data object',
            data: null,
        };
    }
});
// delete entire post
const deleteEntirePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.findByIdAndDelete(id);
    return result;
});
exports.postService = {
    createAPost,
    getAllPost,
    getSinglePostData,
    updatePost,
    deletePost,
    deleteEntirePost,
};
