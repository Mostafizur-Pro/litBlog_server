import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IPost, IPostFilters } from './post.interface';
import { Post } from './post.model';
import { IPaginationOption } from '../../../shared/pagination';
import { IGenericResponse } from '../../../interfaces/common';

// create a post
const createAPost = async (postData: IPost) => {
  try {
    // Check if post with the given user_id already exists
    const existingPost = await Post.findOne({ user_id: postData.user_id });
    if (existingPost) {
      // If the post exists, update it by pushing the new data to the data array
      const updatedPost = await Post.findByIdAndUpdate(
        existingPost._id,
        { $push: { data: postData.data } },
        { new: true }, // Return the updated document
      );
      return updatedPost;
    } else {
      // If the post doesn't exist, create a new post
      const newPost = (await Post.create(postData)).populate('user_id');
      return newPost;
    }
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Post created Error');
  }
};

// get all post

const getAllPost = async (
  filters: IPostFilters,
  paginationOption: IPaginationOption,
): Promise<IGenericResponse<IPost[]>> => {
  const { searchTerm, ...filtersData } = filters;

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

  const whereConditions =
    andCconditions.length > 0 ? { $and: andCconditions } : {};

  // this is for pagination

  const { page = 1, limit = 10 } = paginationOption;
  const skip = (page - 1) * limit;

  const result = await Post.find(whereConditions)
    .sort({
      createdAt: 'desc',
    })
    .skip(skip)
    .limit(limit);
  const total = await Post.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get a post by single id
const getSinglePostData = async (id: string): Promise<IPost | null> => {
  const result = await Post.findById(id);
  return result;
};

// update a post data
const updatePost = async (id: string, payload: Partial<IPost>) => {
  const result = await Post.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

// delete post // an object from array
const deletePost = async (postId: string, dataObjectId?: string) => {
  try {
    // Find the post by ID
    const post = await Post.findById(postId);

    // Check if the post exists
    if (!post) {
      return {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Post not found',
        data: null,
      };
    }

    // If dataObjectId is provided, delete the specific object from the data array
    if (dataObjectId) {
      const dataIndex = post.data.findIndex(
        dataObj => dataObj.id === dataObjectId,
      );

      // Check if the data object exists
      if (dataIndex === -1) {
        return {
          statusCode: httpStatus.NOT_FOUND,
          success: false,
          message: 'Data object not found in the post',
          data: null,
        };
      }

      // Remove the data object from the data array
      post.data.splice(dataIndex, 1);

      // Save the post after removing the data object
      await post.save();

      return {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Data object deleted successfully',
        data: null,
      };
    } else {
      // Delete the entire post if no dataObjectId is provided
      await Post.findByIdAndDelete(postId);

      return {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Post deleted successfully',
        data: null,
      };
    }
  } catch (error) {
    // Handle errors during data object or post deletion
    return {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'Error deleting post or data object',
      data: null,
    };
  }
};

// delete entire post
const deleteEntirePost = async (id: string) => {
  const result = await Post.findByIdAndDelete(id);
  return result;
};

export const postService = {
  createAPost,
  getAllPost,
  getSinglePostData,
  updatePost,
  deletePost,
  deleteEntirePost,
};
