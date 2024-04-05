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

	async createPost(postData, initData) {
		try {
			const secret_token = CryptoJS.HmacSHA256(
				initData.user.id,
				process.env.TOKEN
			).toString();

			const token = await TokenService.getToken();
			if (secret_token === token.token) {
				const tags = postData.tags.split(',').map((tag) => tag.trim());
				const post = await Post.create({ ...postData, tags });
				return post;
			} else {
				throw new Error('Invalid token');
			}
		} catch (err) {
			throw new Error(err);
		}
	}

	async editPost(postId, postData, initData) {
		try {
			const secret_token = CryptoJS.HmacSHA256(
				initData.user.id,
				process.env.TOKEN
			).toString();

			const token = await TokenService.getToken();

			if (secret_token === token.token) {
				let tags;
				if (postData.tags) {
					tags = postData.tags.split(',').map((tag) => tag.trim());
				} else {
					const existingPost = await Post.findById(postId);
					tags = existingPost.tags;
				}

				const editPost = await Post.findByIdAndUpdate(
					postId,
					{ ...postData, tags },
					{
						new: true,
					}
				);

				await editPost.save();

				return editPost;
			} else {
				throw new Error('Invalid token');
			}
		} catch (err) {
			throw new Error(err);
		}
	}

	async deletePost(postId, initData) {
		try {
			const secret_token = CryptoJS.HmacSHA256(
				initData.user.id,
				process.env.TOKEN
			).toString();

			const token = await TokenService.getToken();
			if (secret_token === token.token) {
				const deletedPost = await Post.findByIdAndDelete(postId);
				return deletedPost;
			} else {
				throw new Error('Invalid token');
			}
		} catch (err) {
			throw new Error(err);
		}
	}
}

export default new PostService();
