import mongoose from 'mongoose';

export interface UserModel extends mongoose.Document {
  accessToken: string;
  uniqueId: string;
  name: string;
  projcets: string[];
  labels: string[];
}

const UserSchema = new mongoose.Schema({
  accessToken: { type: String, required: true },
  uniqueId: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  projcets: [{
    type: String,
    default: ['Default'],
  }],
  labels: [String],
// tslint:disable-next-line: align
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
