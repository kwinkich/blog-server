import CryptoJS from 'crypto-js';

const verifyTelegramWebAppData = async (telegramInitData) => {
	const initData = telegramInitData;
	const hash = initData.hash;

	const userData = {
		query_id: initData.query_id,
		user: initData.user,
		auth_date: initData.auth_date,
	};

	console.log('userData', userData);
	let dataToCheck = [];
	for (const [key, val] of Object.entries(initData)) {
		if (key !== 'hash') {
			if (key === 'user') {
				dataToCheck.push(`${key}=${JSON.stringify(val)}`);
			} else {
				dataToCheck.push(`${key}=${val}`);
			}
		}
	}

	const tokennn = CryptoJS.HmacSHA256(initData.user.id);
	console.log(tokennn);
	console.log(initData.user.id);

	console.log('dataToCheck', dataToCheck.join('\n'));

	dataToCheck.sort();

	const secret_key = CryptoJS.HmacSHA256(process.env.TOKEN, 'WebAppData');
	const _hash = CryptoJS.HmacSHA256(
		dataToCheck.join('\n'),
		secret_key
	).toString(CryptoJS.enc.Hex);

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
