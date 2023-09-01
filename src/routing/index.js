const path = require('path');
const router = require('express').Router();
const { checkSchema } = require('express-validator');
const jsonValidator = require('../utils/json-validator');

const getRate = require('./api/get_rate');

router.get('/', function (req, res) {
	// Для простоты отдаю страницу, просто файлом, что бы не подключать шаблонизаторы или шарить папку public. 
	res.sendFile(path.resolve(__dirname, '../public/html/index.html'));
});


router.post('/api/get_rate', checkSchema(jsonValidator.userConnectSchema), getRate);

module.exports = router;