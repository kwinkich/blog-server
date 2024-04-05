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
			const { initData, postData } = req.body;
			const post = await PostService.createPost(postData, initData);
			return res.status(200).json(post);
		} catch (e) {
			return res.status(500).json(e.message);
		}
	}

	async editPost(req, res) {
		try {
			const { initData, postData } = req.body;
			const editPost = await PostService.editPost(
				req.params.id,
				postData,
				initData
			);
			return res.status(200).json(editPost);
		} catch (e) {
			return res.status(500).json(e.message);
		}
	}

	async deletePost(req, res) {
		try {
			const { initData } = req.body;
			const deletedPost = await PostService.deletePost(req.params.id, initData);
			return res.status(200).json(deletedPost);
		} catch (e) {
			return res.status(500).json(e.message);
		}
	}
}

export default new PostController();
