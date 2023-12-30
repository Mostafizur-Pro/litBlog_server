"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("./post.controller");
const router = express_1.default.Router();
// create a post
router.post('/create-post', post_controller_1.postController.createAPost);
// get all post
router.get('/', post_controller_1.postController.getAllPost);
// get single post
router.get('/:id', post_controller_1.postController.getSinglePostData);
// update post
router.patch('/:id/update-post', post_controller_1.postController.updatePost);
// delete post
router.delete('/:postId/data/:dataObjectId', post_controller_1.postController.deletePost);
// delete for entire post
router.delete('/:id/delete-entire-post', post_controller_1.postController.deleteEntirePost);
exports.postRouter = router;
