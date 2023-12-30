import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { responseForData } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { postService } from './post.service';
import pick from '../../../shared/pick';
import { IPost } from './post.interface';

const createAPost = catchAsync(async (req: Request, res: Response) => {
  const postData = req.body;
  const result = await postService.createAPost(postData);
  responseForData.sendResponseForCreate(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post created Successful',
    data: result,
  });
});

// get all  data
const getAllPost = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'title', 'category_name']);
  const paginationOption = pick(req.query, [
    'limit',
    'page',
    'sortBy',
    'sortOrder',
  ]);

  const result = await postService.getAllPost(filters, paginationOption);

  responseForData.sendResponse<IPost[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Getting Successful',
    data: result.data,
    meta: result.meta,
  });
});

// get a single post
const getSinglePostData = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await postService.getSinglePostData(id);

  responseForData.sendResponseForCreate<IPost>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Getting Successful',
    data: result,
  });
});

// update post
const updatePost = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await postService.updatePost(id, updateData);

  responseForData.sendResponseForCreate<IPost>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Your Post Update Successful',
    data: result,
  });
});

// delete a post
const deletePost = catchAsync(async (req: Request, res: Response) => {
  const { postId, dataObjectId } = req.params;

  const result = await postService.deletePost(postId, dataObjectId);

  responseForData.sendResponseForCreate(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post Delete Successful',
    data: result,
  });
});

// delete entire doc
const deleteEntirePost = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await postService.deleteEntirePost(id);
  responseForData.sendResponseForCreate(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post Delete Successful',
    data: result,
  });
});

export const postController = {
  createAPost,
  getSinglePostData,
  getAllPost,
  updatePost,
  deletePost,
  deleteEntirePost,
};
