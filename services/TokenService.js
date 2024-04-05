import Token from '../schemes/Token.js';

class TokenService {
	async getToken() {
		try {
			const token = await Token.findOne();
			return token;
		} catch (err) {
			throw new Error(err);
		}
	}
	async createToken(tokenData) {
		try {
			const token = await Token.create({ token: tokenData });
			return token;
		} catch (err) {
			throw new Error(err);
		}
	}
}

export default new TokenService();
