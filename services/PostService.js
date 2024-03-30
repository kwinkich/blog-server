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

	async getPostById(postId) {
		try {
			const post = await Post.findById(postId);
			return post;
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

	async editPost(postId, postData) {
		try {
			const tags = postData.tags.split(',').map((tag) => tag.trim());
			const editPost = await Post.findByIdAndUpdate(postId, {...postData, tags}, {
				new: true,
			});
			await editPost.save();
			return editPost;
		} catch (err) {
			throw new Error(err);
		}
	}

	async deletePost(postId) {
		try {
			const deletedPost = await Post.findByIdAndDelete(postId);
			return deletedPost;
		} catch (err) {
			throw new Error(err);
		}
	}
}

export default new PostService();
