import CryptoJS from 'crypto-js';

const verifyTelegramWebAppData = async (telegramInitData) => {
	console.log('telegramInitData', telegramInitData);
	const initData = new URLSearchParams(telegramInitData);
	const hash = initData.get('hash');

	const userData = {
		query_id: initData.get('query_id'),
		user: initData.get('user'), // Оставляем без изменений
		auth_date: initData.get('auth_date'),
	};
	console.log('userData', userData);
	let dataToCheck = [];

	initData.forEach((val, key) => {
		if (key !== 'hash') {
			// Преобразуем числовые значения в строки
			val = isNaN(val) ? val : String(val);
			dataToCheck.push(`${key}=${val}`);
		}
	});

	dataToCheck.sort();

	const secret_key = CryptoJS.HmacSHA256(process.env.TOKEN, 'WebAppData');
	const _hash = CryptoJS.HmacSHA256(
		dataToCheck.join('\n'),
		secret_key
	).toString(CryptoJS.enc.Hex);

	console.log('dataCheck', dataToCheck);
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
