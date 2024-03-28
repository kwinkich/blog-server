import PostService from '../services/PostService.js';

class PostController {
	async getPosts(req, res) {
		try {
			const posts = await PostService.getPosts();
			res.status(200).json(posts);
		} catch (e) {
			res.status(500).json(e.message);
		}
	}

	async createPost(req, res) {
		try {
			const post = await PostService.createPost(req.body);
			return res.status(200).json(post);
		} catch (e) {
			res.status(500).json(e.message);
		}
	}
}

export default new PostController();
