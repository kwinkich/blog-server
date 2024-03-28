import { Schema, model } from 'mongoose';

const News = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
});

export default model('News', News);
