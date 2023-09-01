const userList = require('../services/user-list-api');
const config = require('config');

const disconnectInactiveUsersInterval = config.get('disconnectInactiveUsersInterval');

function connectionHandler(ws) {
	ws.on('message', messageHandler);
	ws.on('close',  disonnectInactiveUsers);

	function messageHandler(message) {
		const json = JSON.parse(message);
		const { userId } = json;

		userList.addUser(userId, ws);
		
		// запоминаем воркер пользователя
		process.send({ 
			command: 'addUserWorker',
			data: {
				userId,
				workerId: process.pid,
			},
		});
	}
}

function disonnectInactiveUsers() {
	const users = userList.getAllUsers();
	users.forEach(removeDisconnectedUser);
}

function removeDisconnectedUser(ws) {
	if (ws.readyState !== 1) {
		userList.removeUser(ws.userId);

		process.send({
			command: 'deleteUserWorkers',
			data: {
				userId: ws.userId,
			},
		});
	}
}

setInterval(disonnectInactiveUsers, disconnectInactiveUsersInterval);

module.exports.connectionHandler = connectionHandler;
