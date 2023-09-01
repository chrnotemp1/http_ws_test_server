// ассоциации пользователей с их воркером
const storage = {};

function addUserWorker({ userId, workerId }) {
	storage[userId] = workerId;
}

function getUserWorker({ userId }) {
	return storage[userId];	
}

function getUserWorkers() {
	return storage;
}


function deleteUserWorkers({ userId }) {
	delete storage[userId];	
}

module.exports = {
	addUserWorker,
	getUserWorker,
	getUserWorkers,
	deleteUserWorkers,
}