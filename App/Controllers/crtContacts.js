/*

Core Contacts Controller

*/

'use strict';

var fn = require('../../Helpers/fn');
var service = require('../../Services/servContacts');

exports.getOne = function (req, res) {
	service.getOne(req.params)
		.then(function (data) {
			if (data != null) {
				fn.getStatus(200, res, data);
			} else {
				fn.getStatus(404, res);
			}
		})
		.catch(function () {
			fn.getStatus(500, res);
		});
};

exports.getAll = function (req, res) {
	service.getAll()
		.then(function (data) {
			fn.getStatus(200, res, data);
		})
		.catch(function () {
			fn.getStatus(500, res);
		});
};

exports.createOne = function (req, res) {
	req.body.accountId = req.params.accountId;
	fn.timestamp('create', req.body);

	service.createOne(req.body)
		.then(function (data) {
			fn.getStatus(201, res, data);
		})
		.catch(function () {
			fn.getStatus(500, res);
		});
};

exports.updateOne = function (req, res) {
	req.body.accountId = req.params.accountId;
	fn.timestamp('update', req.body);

	service.updateOne(req.params, req.body)
		.then(function () {
			fn.getStatus(200, res);
		})
		.catch(function () {
			fn.getStatus(500, res);
		});
};

exports.deleteOne = function (req, res) {
	fn.timestamp('delete', req.body);

	service.deleteOne(req.params)
		.then(function () {
			fn.getStatus(200, res);
		})
		.catch(function () {
			fn.getStatus(500, res);
		});
};