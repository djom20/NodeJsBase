process.env['NODE_ENV'] = 'test';
process.env['APIPATH'] = '/api/v1';
process.env['PORT'] = 8000;

var request = require('supertest');
var app = require('../server');
var server = request.agent(app);

exports.app = app;
exports.server = server;