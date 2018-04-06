/*

Helper Functions

*/

'use strict';

var moment = require('moment');

var _status = false;
var config = {};
var env = process.env.NODE_ENV || 'dev';

exports.setEnvServices = function () {
	if (env === 'production') {
		config = JSON.parse(Buffer.from(process.env.APP_TOKENS, 'base64').toString('utf8'));
	} else {
		config = require(__dirname + '/../credentials');
	}
};

exports.configService = function () {
	return config;
};

exports.startServices = function (admin) {
	if (_status === false) {
		if (typeof config.services === 'undefined' && admin.apps.length === 0) {
			exports.setEnvServices();

			_status = true;

			admin.initializeApp({
				credential: admin.credential.cert(config.services),
				databaseURL: config.env.database_url
			});
		}
	}
};

exports.capLetter = function (string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

exports.timestamp = function (type, body) {
	if (type == 'create') {
		body.created_at = moment().toISOString();
		body.updated_at = moment().toISOString();
	} else if (type == 'update') {
		body.updated_at = moment().toISOString();
	} else if (type == 'delete') {
		body.deleted_at = moment().toISOString();
	}
};

exports.getStatus = function (num, res, data) {
	if (num == 200) {
		if (data) {
			return res.status(num).json({
				'status': num,
				'message': 'Ok',
				'data': data
			});
		} else {
			return res.status(num).json({
				'status': num,
				'message': 'Ok'
			});
		}
	} else if (num == 201) {
		return res.status(num).json({
			'status': num,
			'message': 'Created',
			'data': data
		});
	} else if (num == 204) {
		return res.status(num).json({
			'status': num,
			'message': 'No content'
		});
	} else if (num == 304) {
		return res.status(num).json({
			'status': num,
			'message': 'Not modified'
		});
	} else if (num == 400) {
		return res.status(num).json({
			'status': num,
			'message': 'Bad request'
		});
	} else if (num == 401) {
		return res.status(num).json({
			'status': num,
			'message': 'Unauthorized'
		});
	} else if (num == 403) {
		return res.status(num).json({
			'status': num,
			'message': 'Forbidden'
		});
	} else if (num == 404) {
		return res.status(num).json({
			'status': num,
			'message': 'Not found'
		});
	} else if (num == 409) {
		return res.status(num).json({
			'status': num,
			'message': 'Conflict'
		});
	} else if (num == 500) {
		return res.status(num).json({
			'status': num,
			'message': 'Internal server error'
		});
	} else {
		throw 'The code ' + num + ' was not defined';
	}
};