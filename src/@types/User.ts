import mongoose from 'mongoose';
import * as types from '.';

export type IUserDocument = mongoose.Document & types.IUser;

export interface IUserModel extends mongoose.Model<IUserDocument> {
  mCreate(info: types.IUser): Promise<IUserDocument>;
  isExist(uniqueId: string): boolean;
  createTodo(uniqueId: string, todo: types.ITodo): Promise<IUserDocument>;
  getTodos(uniqueId: string): Promise<types.ITodo[]>;
  updateTodo(uniqueId: string, todoId: string, newTodo: types.ITodo): Promise<IUserDocument>;
  deleteTodo(uniqueId: string, todoId: string): Promise<IUserDocument>;
}
