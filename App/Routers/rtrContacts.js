/*

Core Contacts Router

*/

'use strict';

var pl = require('pluralize');
var ctrl = require('../../Controllers/ctrContacts');
var path = process.env.APIPATH || '/api/v1';
var pathId = null;

module.exports = function (key, router) {
	path = path + pl(key);
	pathId = path + '/:' + key + 'Id';

	router.get(path, ctrl.getAll);
	router.get(pathId, ctrl.getOne);
	router.post(path, ctrl.createOne);
	router.put(pathId, ctrl.updateOne);
	router.delete(pathId, ctrl.deleteOne);
};