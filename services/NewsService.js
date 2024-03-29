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

	async getNewsById(newsId) {
		try {
			const news = await News.findById(newsId);
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

	async editNews(newsId, newsData) {
		try {
			const editedNews = await News.findByIdAndUpdate(newsId, newsData, {
				new: true,
			});
			await editedNews.save();
			return editedNews;
		} catch (err) {
			throw new Error(err);
		}
	}

	async deleteNews(newsId) {
		try {
			const deletedNews = await News.findByIdAndDelete(newsId);
			return deletedNews;
		} catch (err) {
			throw new Error(err);
		}
	}
}

export default new NewsService();
