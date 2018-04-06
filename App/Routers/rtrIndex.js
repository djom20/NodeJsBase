/*

Core Index Router

*/

'use strict';

module.exports = function (router) {
	var pl = require('pluralize');
	var glob = require('glob');
	var tempM = null;
	var tempJs = null;
	var matches = glob.sync('Routers/**/*s.js', { mark: true, matchBase: true });

	matches.forEach(function (item) {
		tempM = item.replace('Routers/', '');
		tempJs = tempM.replace('.js', '').replace('rtr', '').toLowerCase();
		require('./' + tempM)(pl.singular(tempJs), router);
	});
};