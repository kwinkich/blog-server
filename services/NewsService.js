import News from '../schemes/News.js';

class NewsService {
	async getNews() {
		try {
			const news = await News.find();
			return news;
		} catch (e) {
			throw new Error(e);
		}
	}

	async createNews(newsData) {
		try {
			const news = await News.create(newsData);
			return news;
		} catch (err) {
			throw new Error(err);
		}
	}
}

export default new NewsService();
