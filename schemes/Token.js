import { model, Schema } from 'mongoose';
import { Model } from 'mongoose';

const Token = new Schema({
	token: { type: String, required: true },
});

export default model('Token', Token);
