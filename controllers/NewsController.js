import NewsService from '../services/NewsService.js';

class NewsController {
	async getNews(req, res) {
		try {
			const news = await NewsService.getNews();
			return res.status(200).json(news);
		} catch (e) {
			res.status(500).json(e.message);
		}
	}

	async getNewsById(req, res) {
		try {
			const news = await NewsService.getNewsById(req.params.id);
			return res.status(200).json(news);
		} catch (e) {
			return res.status(500).json(e.message);
		}
	}

	async createNews(req, res) {
		try {
			const { initData, newsData } = req.body;
			const news = await NewsService.createNews(newsData, initData);
			return res.status(200).json(news);
		} catch (e) {
			return res.status(500).json(e.message);
		}
	}

	async editNews(req, res) {
		try {
			const { initData, newsData } = req.body;
			const editedNews = await NewsService.editNews(
				req.params.id,
				newsData,
				initData
			);
			return res.status(200).json(editedNews);
		} catch (e) {
			return res.status(500).json(e.message);
		}
	}

	async deleteNews(req, res) {
		try {
			const { initData } = req.body;
			const deletedNews = await NewsService.deleteNews(req.params.id, initData);
			return res.status(200).json(deletedNews);
		} catch (e) {
			return res.status(500).json(e.message);
		}
	}
}

export default new NewsController();
