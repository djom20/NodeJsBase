var chai = require('chai');
var expect = chai.expect;

var dbKey = 'contacts';
var accountId = '123456';

var server = require('../testserver').server;
var newObj = null;
var path = process.env.APIPATH + '/accounts/' + accountId + '/' + dbKey;
var obj = null;

describe('Contacts API', function () {
	it('should be able to get all', function (done) {
		server
			.get(path)
			.expect(200)
			.end(function (err, res) {
				expect(err).to.not.exist;
				expect(res).to.exist;

				done();
			});
	});

	it('should be able to create one', function (done) {
		server
			.post(path)
			.expect(201)
			.send(newObj)
			.end(function (err, res) {
				expect(err).to.not.exist;
				expect(res).to.exist;

				done();
			});
	});

	it('should be able to get one', function (done) {
		server
			.get(path + '/' + obj.id)
			.expect(200)
			.end(function (err, res) {
				expect(err).to.not.exist;
				expect(res).to.exist;

				done();
			});
	});

	it('should be able to update one', function (done) {
		server
			.put(path + '/' + obj.id)
			.expect(200)
			.send(obj)
			.end(function (err, res) {
				expect(err).to.not.exist;
				expect(res).to.exist;

				done();
			});
	});

	it('should be able to delete one', function (done) {
		server
			.delete(path + '/' + obj.id)
			.expect(200)
			.end(function (err, res) {
				expect(err).to.not.exist;
				expect(res).to.exist;

				done();
			});
	});
});