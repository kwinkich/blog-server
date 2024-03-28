import cors from 'cors';
import 'dotenv/config';
import express from 'express';

import mongoose from 'mongoose';
import { router } from './router/router.js';

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', router);

async function startApp() {
	try {
		await mongoose.connect(DB_URL);
		app.listen(PORT, () => console.log('server started on PORT ', PORT));
	} catch (e) {
		console.error(e);
	}
}

startApp();
