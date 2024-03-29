import PostService from '../services/PostService.js';

class PostController {
	async getPosts(req, res) {
		try {
			const posts = await PostService.getPosts();
			return res.status(200).json(posts);
		} catch (e) {
			return res.status(500).json(e.message);
		}
	}

	async getPostById(req, res) {
		try {
			const post = await PostService.getPostById(req.params.id);
			return res.status(200).json(post);
		} catch (e) {
			return res.status(500).json(e.message);
		}
	}

	async createPost(req, res) {
		try {
			const post = await PostService.createPost(req.body);
			return res.status(200).json(post);
		} catch (e) {
			return res.status(500).json(e.message);
		}
	}

	async editPost(req, res) {
		try {
			const editPost = await PostService.editPost(req.params.id, req.body);
			return res.status(200).json(editPost);
		} catch (e) {
			return res.status(500).json(e.message);
		}
	}

	async deletePost(req, res) {
		try {
			const deletedPost = await PostService.deletePost(req.params.id);
			return res.status(200).json(deletedPost);
		} catch (e) {
			return res.status(500).json(e.message);
		}
	}
}

export default new PostController();
