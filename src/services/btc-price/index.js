// получение и хранение цены биткоина

const sendRequest = require('request');
const config = require('config');
const btcPriceApiHost = config.get('btcPriceApiHost');
const checkPriceInterval = config.get('checkPriceInterval');

let price = 0;

function setActualePrice() {
	sendRequest.get({
		url : btcPriceApiHost
	}, (err, response, body) => {
		if (!err) {
			try {
				let usdPrice = JSON.parse(body);
				price = usdPrice['USD'];
			}
			catch(error) {
				console.log(error);
			}
		}
	})
}

setActualePrice();
setInterval(setActualePrice, checkPriceInterval)


function getPrice() {
	return price;
}

module.exports = {
	getPrice,
};
