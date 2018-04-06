'use strict';

var express = require('express');
var router = express.Router();
var server = express();
var cookieParser = require('cookie-parser');
var cors = require('cors');
var bodyParser = require('body-parser');
var ssl = false;

var docs = require('./Helpers/routerDocs');
var helmet = require('helmet');

var env = process.env.NODE_ENV || 'dev';
var DEFAULT_PORT = process.env.PORT || 5000;

server.use(bodyParser.json({
	limit: '5mb'
}));

server.use(bodyParser.urlencoded({
	extended: true,
	limit: '5mb'
}));

server.use(bodyParser.json({ type: 'application/json' }));

if (env == 'production') {
	// Parsing base64 to json
	server.use(function(req, res, next){
		req.body = JSON.parse(Buffer.from(req.body.keys, 'base64').toString('utf8'))
		next();
	});

	if (ssl){
		// Using https
		server.use(function (req, res, next) {
			if (req.secure) return next();
			res.redirect(`https://${req.hostname}${req.url}`); /*eslint-disable*/
		});
	}
}

if (env != 'production') server.use(cors());

server.use(cookieParser());
server.use(helmet());

server.set('trust proxy', 1);
server.disable('x-powered-by');

// Routers
require('./routers/core/rtrIndex')(router);

if (process.env.INSTALLTYPE && process.env.INSTALLTYPE == 'INAPP') {
	console.log('Enabling CORS for IN-APP integration');
	server.use(require('cors')());
}

server.use(router);

server.use(function (err, req, res) {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

docs.writeRoutes(env, router.stack);

server.listen(process.env.PORT || DEFAULT_PORT, function () {
	if (env != 'production') {
		console.log('environment ' + env);
		console.log('listening on port ' + DEFAULT_PORT);
	}
});

if (env == 'test') module.exports = server;