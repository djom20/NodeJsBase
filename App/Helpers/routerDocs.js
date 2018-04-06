/*

Routers Docs

*/

'use strict';

exports.writeRoutes = function (env, routes) {
	if (env !== 'production' && env !== 'test') {
		var Table = require('cli-table');
		var table = null;

		table = new Table({ head: ['Method', 'Path'] });

		for (var key in routes) {
			if (routes.hasOwnProperty(key)) {
				var val = routes[key];
				if (val.route) {
					val = val.route;
					var _o = {};
					_o[val.stack[0].method.toUpperCase()] = val.path;
					table.push(_o);
				}
			}
		}

		console.log(table.toString());
	}
};