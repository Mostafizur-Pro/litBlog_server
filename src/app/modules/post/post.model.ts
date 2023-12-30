import { Schema, model } from 'mongoose';
import { IPost, PostModel } from './post.interface';

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    category_name: {
      type: String,
      enum: [
        'Technology',
        'LifeStyle',
        'Photography',
        'Health and Fitness',
        'Business',
        'Marketing',
      ],
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    data: [
      {
        image: {
          type: String,
        },
        name: {
          type: String,
          required: true,
        },
        details: {
          type: String,
        },
        id: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Post = model<IPost, PostModel>('Post', postSchema);
