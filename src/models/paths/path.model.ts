import mongoose, { Schema, Document } from 'mongoose';

import { Link } from '../links';

export type PathAttributes = {
  name: string;
  links: Link[];
  salt: string;
  password: string;
}

export type Path = PathAttributes & Document;

const pathModel: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  links: {
    type: [Schema.Types.ObjectId],
    ref: 'Link',
    default: [],
  },
  salt: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
},
  { timestamps: true }
);

pathModel.index({ name: 1 });

export const Paths = mongoose.model<Path>('Path', pathModel, 'paths');
