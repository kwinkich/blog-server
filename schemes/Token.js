import { model, Schema } from 'mongoose';

const Token = new Schema({
	token: { type: String },
});

export default model('Token', Token);
