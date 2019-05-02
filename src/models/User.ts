import mongoose from 'mongoose';

export interface IRequiredInfo {
  accessToken: string;
  uniqueId: string;
  name: string;
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
    done: Boolean,
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

export default mongoose.model<IUser, IUserModel>('User', UserSchema);
