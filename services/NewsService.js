import CryptoJS from 'crypto-js';
import News from '../schemes/News.js';
import TokenService from './TokenService.js';
class NewsService {
	async getNews() {
		try {
			const news = await News.find();
			return news;
		} catch (e) {
			throw new Error(e);
		}
	}

	async getNewsById(newsId) {
		try {
			const news = await News.findById(newsId);
			return news;
		} catch (e) {
			throw new Error(e);
		}
	}

	async createNews(newsData, initData) {
		try {
			const secret_token = CryptoJS.HmacSHA256(
				initData.user.id,
				process.env.TOKEN
			).toString();

			const token = await TokenService.getToken();

			if (secret_token === token.token) {
				const news = await News.create(newsData);
				return news;
			} else {
				throw new Error('Invalid token');
			}
		} catch (err) {
			throw new Error(err);
		}
	}

	async editNews(newsId, newsData, initData) {
		try {
			const secret_token = CryptoJS.HmacSHA256(
				initData.user.id,
				process.env.TOKEN
			).toString();

			const token = await TokenService.getToken();
			if (secret_token === token.token) {
				const editedNews = await News.findByIdAndUpdate(newsId, newsData, {
					new: true,
				});
				await editedNews.save();
				return editedNews;
			} else {
				throw new Error('Invalid token');
			}
		} catch (err) {
			throw new Error(err);
		}
	}

	async deleteNews(newsId, initData) {
		try {
			const secret_token = CryptoJS.HmacSHA256(
				initData.user.id,
				process.env.TOKEN
			).toString();

			const token = await TokenService.getToken();
			if (secret_token === token.token) {
				const deletedNews = await News.findByIdAndDelete(newsId);
				await deletedNews.save();
				return deletedNews;
			} else {
				throw new Error('Invalid token');
			}
		} catch (err) {
			throw new Error(err);
		}
	}
}

export default new NewsService();
