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
			const news = await NewsService.createNews(req.body);
			return res.status(200).json(news);
		} catch (e) {
			return res.status(500).json(e.message);
		}
	}

	async editNews(req, res) {
		try {
			const editedNews = await NewsService.editNews(req.params.id, req.body);
			return res.status(200).json(editedNews);
		} catch (e) {
			return res.status(500).json(e.message);
		}
	}

	async deleteNews(req, res) {
		try {
			const deletedNews = await NewsService.deleteNews(req.params.id);
			return res.status(200).json(deletedNews);
		} catch (e) {
			return res.status(500).json(e.message);
		}
	}
}

export default new NewsController();
