'use strict';

const fs = require('fs')
const server = require('../src/config/server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Strings ', () => {

	const textOneBasicResponse = fs.readFileSync("./test/results/text_1_basic_response", "utf-8");
	const textOneIntermediaryResponse = fs.readFileSync("./test/results/text_1_intermediary_response", "utf-8");
	const textTwoBasicResponse = fs.readFileSync("./test/results/text_2_basic_response", "utf-8");
	const textTwoIntermediaryResponse = fs.readFileSync("./test/results/text_2_intermediary_response", "utf-8");
	const textThreeBasicResponse = fs.readFileSync("./test/results/text_3_basic_response", "utf-8");
	const textThreeIntermediaryResponse = fs.readFileSync("./test/results/text_3_intermediary_response", "utf-8");

	it('it should GET default Text 1 result basic with success', (done) => {
	chai.request(server)
		.get('/results?rowSize=40')
		.end(function(err, res) {	
			expect(res).to.have.status(200)
			expect(res.text).to.equal(textOneBasicResponse);
			done();
		})
	});

	it('it should GET default Text 1 result intermediary with success', (done) => {
	chai.request(server)
		.get('/results?rowSize=40&type=intermediary')
		.end(function(err, res) {	
			expect(res).to.have.status(200)
			expect(res.text).to.equal(textOneIntermediaryResponse);
			done();
		})
	});

	it('it should GET Text 2 result basic with success', (done) => {
	chai.request(server)
		.get('/results?rowSize=40&test=text_2')
		.end(function(err, res) {	
			expect(res).to.have.status(200)
			expect(res.text).to.equal(textTwoBasicResponse);
			done();
		})
	});	

	it('it should GET Text 2 result intermediary with success', (done) => {
	chai.request(server)
		.get('/results?rowSize=40&type=intermediary&test=text_2')
		.end(function(err, res) {	
			expect(res).to.have.status(200)
			expect(res.text).to.equal(textTwoIntermediaryResponse);
			done();
		})
	});

	it('it should GET Text 3 result basic with success', (done) => {
	chai.request(server)
		.get('/results?rowSize=40&test=text_3')
		.end(function(err, res) {	
			expect(res).to.have.status(200)
			expect(res.text).to.equal(textThreeBasicResponse);
			done();
		})
	});

	it('it should GET Text 3 result intermediary with success', (done) => {
	chai.request(server)
		.get('/results?rowSize=40&type=intermediary&test=text_3')
		.end(function(err, res) {	
			expect(res).to.have.status(200)
			expect(res.text).to.equal(textThreeIntermediaryResponse);
			done();
		})
	});

	it('it should GET default result with different results', (done) => {
	chai.request(server)
		.get('/results?')
		.end(function(err, res) {	
			expect(res).to.have.status(200)
			expect(res.text).to.not.equal('somevalue');
			done();
		})
	});

	it('it should GET default result with invalid rowSize param', (done) => {
	chai.request(server)
		.get('/results?rowSize=A')
		.end(function(err, res) {	
			expect(res).to.have.status(400)
			done();
		})
	});

	it('it should GET default result with invalid type param', (done) => {
	chai.request(server)
		.get('/results?type=invalid')
		.end(function(err, res) {	
			expect(res).to.have.status(400)
			done();
		})
	});

	it('it should GET default result with invalid test param', (done) => {
	chai.request(server)
		.get('/results?test=invalidtest')
		.end(function(err, res) {	
			expect(res).to.have.status(400)
			done();
		})
	});
});