// import CryptoJS from 'crypto-js';
// import 'dotenv/config';

// class AuthController{

//   async verifyTelegramWebAppData(telegramInitData) {
//     try {
//       console.log("telegramInitData", telegramInitData);
//       const initData = new URLSearchParams(telegramInitData);
//       const hash = initData.get('hash');

//       const userData = {
//         query_id: initData.get('query_id'),
//         user: JSON.parse(initData.get("user")),
//         auth_date: initData.get('auth_data'),
//       };
//       console.log("userData", userData);
//       let dataToCheck = [];

//       initData.sort();
//       initData.forEach(
//         (val, key) => key !== "hash" && dataToCheck.push(`${key}=${val}`)
//       );

//       const secret = CryptoJS.HmacSHA256(process.env.TELEGRAM_API, "WebAppData");
//       const _hash = CryptoJS.HmacSHA256(dataToCheck.join("\n"), secret).toString(CryptoJS.enc.Hex);

//       const isVerify = _hash === hash;

//       return { isVerify, userData };
//     } catch {
//       throw new Error('Failed to verify Telegram Web App data');
//     }
//   }

//   async verifyTelegramWebApp(req, res) {
//     try {
//       const { initData } = req.body;

//       const { isVerify, userData } = await this.verifyTelegramWebAppData(initData);

//       if (isVerify) {
//         res.status(200).json({ ...userData });
//       } else {
//         res.status(403).json({ message: 'Ты что хацкер?' });
//       }
//     } catch (error) {
//       res.status(500).json({ message: 'Ooops...' });
//     }
//   }
// }

// export default new AuthController();

class BotController {
	async getBotInfo(req, res) {
		try {
			const { initData } = req.body;
			const userData = {
				query_id: initData.get('query_id'),
				user: JSON.parse(initData.get('user')),
				auth_date: initData.get('auth_data'),
			};
			console.log('userData', userData);
			res.status(200).json(userData);
		} catch (err) {
			console.error(err);
		}
	}
}
