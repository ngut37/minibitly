import mongoose, { Schema, Document } from 'mongoose';

export interface ILink extends Document {
    name: string;
    url: string;
}

const LinkModel: Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    url: {
        type: String,
        required: true,
    },
});

export const Links = mongoose.model<ILink>('Link', LinkModel);
