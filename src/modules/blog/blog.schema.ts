import { DbModel } from 'src/shared/constants';
import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      default: '',
      required: false,
      trim: true,
    },
    content: {
      type: String,
      default: '',
      required: false,
      trim: true,
    },
    authorId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: DbModel.USER,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
