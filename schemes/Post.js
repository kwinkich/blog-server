import { model, Schema } from 'mongoose';

const Post = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	tags: [{ type: String, required: true }],
});

export default model('Post', Post);
