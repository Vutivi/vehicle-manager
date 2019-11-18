var expect  = require('chai').expect;
var request = require('request');

it('Main page content', function(done) {
    request('http://localhost:8000' , function(error, response, body) {
        expect(response.statusCode).to.equal(404);
        done();
    });
});

it('All users request', function(done) {
    request('http://localhost:8000/users' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        expect(JSON.parse(body)).to.be.a('array');;
        done();
    });
});

it('Single user request', function(done) {
    request('http://localhost:8000/users/1' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        expect(JSON.parse(body)).to.be.a('object');;
        done();
    });
});