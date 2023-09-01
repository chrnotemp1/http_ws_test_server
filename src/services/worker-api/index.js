// хранилище сущестующих воркеров, для управления

const workers = {}; 

function getWorker(id) {
	return workers[id];
}

function setWorker(id, worker) {
	return workers[id] = worker;
}

function getWorkersCount() {
	return Object.keys(workers).length;
}

function getWorkersIds() {
	return Object.keys(workers);
}

module.exports = {
	getWorker,
	setWorker,
	getWorkersCount,
	getWorkersIds,
};