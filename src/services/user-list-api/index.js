// локальное хранилище ws сессий пользователя

const users = {};

function addUser(userId, ws) {
	ws.userId = userId;
	users[userId] = ws;
}

function removeUser(userId) {
	delete users[userId];
}

function getUser(userId) {
	return users[userId]
}

function getUsersCount() {
	return Object.keys(users).length;
}

function getAllUsers() {
	return Object.values(users);
}

module.exports = {
	addUser,
	removeUser,
	getUser,
	getUsersCount,
	getAllUsers,
}
