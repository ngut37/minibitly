import mongoose, { Schema, Document } from 'mongoose';

import { Path } from '../paths';

export type LinkAttributes = {
    name: string;
    url: string;
    path: Path;
}

export type Link = LinkAttributes & Document

const linkModel: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    path: {
        type: Schema.Types.ObjectId,
        ref: 'Path',
        required: true,
      },
},
    { timestamps: true }
);

linkModel.index({ name: 1 })
linkModel.index({ path: 1 })

export const Links = mongoose.model<Link>('Link', linkModel, 'links');
