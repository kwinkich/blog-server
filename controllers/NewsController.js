import NewsService from '../services/NewsService.js';

class NewsController {
	async getNews(req, res) {
		try {
			const news = await NewsService.getNews();
			res.status(200).json(news);
		} catch (e) {
			res.status(500).json(e.message);
		}
	}

	async createNews(req, res) {
		try {
			const news = await NewsService.createNews(req.body);
			return res.status(200).json(news);
		} catch (e) {
			res.status(500).json(e.message);
		}
	}
}

export default new NewsController();
