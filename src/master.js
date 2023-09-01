const cluster = require('cluster');
const config = require('config');
const { setWorker } = require('./services/worker-api');
const { masterEventHandler } = require('./services/master-event-handler');

const workerCount = config.get('workerCount');

for (let i = 0; i < workerCount; i++) {
	const worker = cluster.fork();
	
	// ставим основной процесс на прослушивание событий от воркеров
	worker.on('message', masterEventHandler);

	// сохраняем айдишник воркера
	setWorker(worker.process.pid, worker);
} 
