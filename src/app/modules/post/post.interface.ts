import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

type IList = {
  image: string;
  name: string;
  details: string;
  id: string;
};

export type IPost = {
  title: string;
  image: string;
  description: string;
  category_name:
    | 'Technology'
    | 'LifeStyle'
    | 'Photography'
    | 'Health and Fitness'
    | 'Business'
    | 'Marketing';
  user_id: Types.ObjectId | IUser;
  data: IList[];
};

export type IPostFilters = {
  searchTerm?: string;
};

export type PostModel = Model<IPost, Record<string, unknown>>;
