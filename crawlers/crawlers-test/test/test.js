'use strict';

const fs = require('fs')
const server = require('../src/config/server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Crawler ', () => {		
	it('it should GET resutls to subreddits askreddit and cats', (done) => {
		chai.request(server)
			.get('/api/subreddits?list=askreddit;cats')
			.end(function(err, res) {
				expect(res).to.have.status(200)
				done();
			})
	});
});