import Post from '../schemes/Post.js';

class PostService {
	async getPosts() {
		try {
			const posts = await Post.find();
			return posts;
		} catch (e) {
			throw new Error(e);
		}
	}

	async createPost(postData) {
		try {
			const tags = postData.tags.split(',').map((tag) => tag.trim());
			const post = await Post.create({ ...postData, tags });
			return post;
		} catch (err) {
			throw new Error(err);
		}
	}
}

export default new PostService();
