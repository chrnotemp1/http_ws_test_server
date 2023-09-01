// обработчик команд от воркеров для мастер ноды

const { addUserWorker, getUserWorker, getUserWorkers, deleteUserWorkers } = require('../users-worker-api');
const { getWorker } = require('../worker-api');

function sendMessage({ userId, message }) {
	const userWorkerId = getUserWorker({ userId });

	const worker = getWorker(userWorkerId);

	worker.send({ 
		command: 'sendPrice',  
		data: {
			userId,
			message,
		},
	});
}

function getWorkersStat({ userId }) {
	const userWorkers = getUserWorkers();
	const workersIds = {};

	for (const uid in userWorkers) {
		const wid = userWorkers[uid];
		workersIds[wid] ? workersIds[wid].push(uid) : workersIds[wid] = [uid]
	}

	const userWorkerId = getUserWorker({ userId });

	const worker = getWorker(userWorkerId);

	worker.send({ 
		command: 'sendWorkersStat',  
		data: {
			userId,
			message: workersIds,
		},
	});
}

setInterval(function() {
	const userWorkers = getUserWorkers();
	const uids = Object.keys(userWorkers);
	uids.forEach((id) => {
		getWorkersStat({userId: id})
	})
}, 1000);


function masterEventHandler(msg) {
	const { command, data } = msg;

	switch (command) {
		case 'addUserWorker':
			addUserWorker(data);
			break;
		case 'getUserWorker':
			getUserWorker(data);
			break;
		case 'getUserWorkers':
			return getUserWorkers();
		case 'getWorkersStat':
			getWorkersStat(data);
			break;
		case 'deleteUserWorkers':
			deleteUserWorkers(data);
			break;
		case 'sendMessage':
			sendMessage(data);
	}
} 

module.exports = {
	masterEventHandler,
}
