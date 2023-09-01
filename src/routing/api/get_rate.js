const { validationResult } = require('express-validator');

const userList = require('../../services/user-list-api');
const btcPrice = require('../../services/btc-price');

module.exports = function(req, res) {
	const validationBodyResult = validationResult(req);
	
	if (!validationBodyResult.isEmpty()) {
    	return res.json({ errors: validationBodyResult.array() });
	}

	res.status(200).end('success');

	let { userId } = req.body;

	// отправка запроса в мастер ноду с указанием айди пользователя и сообщения, которое ему нужно передать
	process.send({ 
		command: 'sendMessage', 
		data: {
			message: btcPrice.getPrice(), 
			userId,
		},
	});
};

process.on('message', function(msg) {
	const ws = userList.getUser(msg.data.userId);
	if (!ws) return;

	if (msg.command === 'sendPrice') {
		ws.send(JSON.stringify({ price: msg.data.message }));
	}
	else if (msg.command === 'sendWorkersStat') {
		ws.send(JSON.stringify({ workerStat: msg.data.message }));
	}
});
