import Token from '../schemes/Token.js';

class TokenService {
	async createToken(id) {
		try {
			const token = await Token.create(id);
			return token;
		} catch (err) {
			throw new Error(err);
		}
	}
}

export default new TokenService();
