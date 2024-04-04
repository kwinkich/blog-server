import CryptoJS from 'crypto-js';
import 'dotenv/config';

const verifyTelegramWebAppData = async (telegramInitData) => {
	console.log('telegramInitData', telegramInitData);
	const initData = new URLSearchParams(telegramInitData);
	const hash = initData.get('hash');

	const userData = {
		query_id: initData.get('query_id'),
		user: JSON.stringify(initData.get('user')),
		auth_date: initData.get('auth_date'),
	};
	console.log('userData', userData);
	let dataToCheck = [];

	initData.sort();
	initData.forEach(
		(val, key) => key !== 'hash' && dataToCheck.push(`${key}=${val}`)
	);

	const secret = CryptoJS.HmacSHA256(process.env.TOKEN, 'WebAppData');
	const _hash = CryptoJS.HmacSHA256(dataToCheck.join('\n'), secret).toString(
		CryptoJS.enc.Hex
	);
	console.log('hash', hash);
	console.log('_hash', _hash);

	const isVerify = _hash === hash;

	console.log(isVerify);

	return { isVerify, userData };
};

class BotController {
	async getInitData(req, res) {
		const { initData } = req.body;
		console.log(initData);
		res.status(200).json(initData);
	}

	async verifyTelegramInitData(req, res) {
		try {
			const { initData } = req.body;
			const { isVerify, userData } = await verifyTelegramWebAppData(initData);

			if (isVerify) {
				res.status(200).json({ ...userData });
			} else {
				res.status(403).json({ message: 'Стой!' });
			}
		} catch (err) {
			res.status(500).json({ message: `${err}` });
		}
	}
}

export default new BotController();
