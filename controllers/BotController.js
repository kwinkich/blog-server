class BotController {
	async getInitData(req, res) {
		const { initData } = req.body;
		console.log(initData);
		res.status(200).json(initData);
	}
}

export default new BotController();
