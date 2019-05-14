import mongoose from 'mongoose';
import { IUserDocument, IUserModel } from '../@types/User';
import * as types from '../@types';

const UserSchema = new mongoose.Schema({
  accessToken: { type: String, required: true },
  uniqueId: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  todos: [{
    title: String,
    content: String,
    dueDate: Date,
    priority: Number,
    done: { type: Boolean, default: false },
  }],
}, { timestamps: true });

UserSchema.statics.isExist = async function (
  this: mongoose.Model<IUserDocument, IUserModel>,
  uniqueId: string) {
  const user = await this.findOne({ uniqueId });
  if (user) return true;
  return false;
};

UserSchema.statics.mCreate = function (
  this: mongoose.Model<IUserDocument, IUserModel>,
  info: types.IUser) {
  const newUser = new this(info);
  return newUser.save();
};

UserSchema.statics.createTodo = function (
  this: mongoose.Model<IUserDocument, IUserModel>,
  uniqueId: string,
  todo: types.ITodo) {
  return this.findOneAndUpdate({ uniqueId }, {
    $push: { todos: todo },
  });
};

UserSchema.statics.getTodos = function (
  this: mongoose.Model<IUserDocument, IUserModel>,
  uniqueId: string) {
  return this.findOne({ uniqueId }, 'todos');
};

UserSchema.statics.updateTodo = function (
  this: mongoose.Model<IUserDocument, IUserModel>,
  uniqueId: string,
  todoId: string,
  newtodo: types.ITodo) {
  return this.findOneAndUpdate({ uniqueId, 'todos._id': todoId }, {
    $set: { 'todos.$': newtodo },
  });
};

UserSchema.statics.deleteTodo = function (
  this: mongoose.Model<IUserDocument, IUserModel>,
  uniqueId: string,
  todoId: string) {
  return this.findOneAndUpdate({ uniqueId }, {
    $pull: { todos: { _id: todoId } },
  });
};

export default mongoose.model<IUserDocument, IUserModel>('User', UserSchema);
