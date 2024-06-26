import 'dotenv/config';
import TelegramBot from 'node-telegram-bot-api';

export default function launchBot() {
	const webAppUrl = process.env.WEB_APP_URL;
	const token = process.env.TOKEN;

	const bot = new TelegramBot(token, { polling: true });

	bot.on('message', async (msg) => {
		const chatId = msg.chat.id;
		const text = msg.text;

		if (text === '/start') {
			await bot.sendMessage(chatId, 'Управляй блогом легко и просто', {
				reply_markup: {
					inline_keyboard: [
						[{ text: `Управлять блогом!`, web_app: { url: webAppUrl } }],
					],
				},
			});
		}
	});
}
