import express from 'express';
import { postController } from './post.controller';

const router = express.Router();

// create a post
router.post('/create-post', postController.createAPost);

// get all post
router.get('/', postController.getAllPost);

// get single post
router.get('/:id', postController.getSinglePostData);

// update post
router.patch('/:id/update-post', postController.updatePost);

// delete post
router.delete('/:postId/data/:dataObjectId', postController.deletePost);

// delete for entire post
router.delete('/:id/delete-entire-post', postController.deleteEntirePost);

export const postRouter = router;
