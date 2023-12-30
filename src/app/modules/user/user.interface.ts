import { Model } from 'mongoose';

export type IUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'admin' | 'super admin' | 'user';
};

export type UserModel = Model<IUser, Record<string, unknown>>;
