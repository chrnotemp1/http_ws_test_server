const express = require('express');
const config = require('config');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const routing = require('./routing');
const wsControl = require('./ws-control');

const httpServerPort = config.get('httpServerPort');
const wsServerPort = config.get('wsServerPort');

const app = express();

const cluster = require('cluster');
console.log('cluster.worker.id', cluster.worker.id)

app.use(bodyParser.urlencoded({ 
	extended: false,
}));

app.use(bodyParser.json());

app.use('/ping', (req, res) => res.sendStatus(200));
app.use('/', routing);

app.listen(httpServerPort, () => {
	console.log(`http server is running on port: ${httpServerPort}`);
});

const wss = new WebSocket.Server({ 
	port: wsServerPort,
})

wss.on('connection', wsControl.connectionHandler);
