import mongoose from 'mongoose';

export interface IRequiredInfo {
  accessToken: string;
  uniqueId: string;
  name: string;
}

export interface ITodo {
  content: string;
  dueDate: Date;
  priority: number;
  labels: string[];
  project: string;
  done?: boolean;
}

export interface IUser extends mongoose.Document {
  accessToken: string;
  uniqueId: string;
  name: string;
  projcets: string[];
  labels: string[];
}

export interface IUserModel extends mongoose.Model<IUser> {
  mCreate(data: IRequiredInfo): Promise<IUser>;
  isExist(uniqueId: string): boolean;
  createTodo(uniqueId: string, todo: ITodo): Promise<IUser>;
  getTodos(uniqueId: string): Promise<ITodo[]>;
  updateTodo(uniqueId: string, todoId: string, newTodo: ITodo): Promise<IUser>;
  deleteTodo(uniqueId: string, todoId: string): Promise<IUser>;
}

const UserSchema = new mongoose.Schema({
  accessToken: { type: String, required: true },
  uniqueId: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  todos: [{
    content: String,
    dueDate: Date,
    priority: Number,
    labels: [String],
    project: String,
    done: { type: Boolean, default: false },
  }],
}, { timestamps: true });

UserSchema.statics.isExist = async function (
  this: mongoose.Model<IUser, IUserModel>,
  uniqueId: string) {
  const user = await this.findOne({ uniqueId });
  if (user) return true;
  return false;
};

UserSchema.statics.mCreate = function (
  this: mongoose.Model<IUser, IUserModel>,
  info: IRequiredInfo) {
  const newUser = new this(info);
  return newUser.save();
};

UserSchema.statics.createTodo = function (
  this: mongoose.Model<IUser, IUserModel>,
  uniqueId: string,
  todo: ITodo) {
  return this.findOneAndUpdate({ uniqueId }, {
    $push: { todos: todo },
  });
};

UserSchema.statics.getTodos = function (
  this: mongoose.Model<IUser, IUserModel>,
  uniqueId: string) {
  return this.findOne({ uniqueId }, 'todos');
};

UserSchema.statics.updateTodo = function (
  this: mongoose.Model<IUser, IUserModel>,
  uniqueId: string,
  todoId: string,
  newtodo: ITodo) {
  return this.findOneAndUpdate({ uniqueId, 'todos._id': todoId }, {
    $set: { 'data.$': newtodo },
  });
};

UserSchema.statics.deleteTodo = function (
  this: mongoose.Model<IUser, IUserModel>,
  uniqueId: string,
  todoId: string) {
  return this.findOneAndUpdate({ uniqueId }, {
    $pull: { todos: { _id: todoId } },
  });
};

export default mongoose.model<IUser, IUserModel>('User', UserSchema);
