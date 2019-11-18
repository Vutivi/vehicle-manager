var expect  = require('chai').expect;
var request = require('request');

it('All vehicles request', function(done) {
    request('http://localhost:8000/vehicles' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        expect(JSON.parse(body)).to.be.a('array');;
        done();
    });
});

it('Single vehicle request', function(done) {
    request('http://localhost:8000/vehicles/33' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        expect(JSON.parse(body)).to.be.a('object');;
        done();
    });
});

it('All vehicles for user request', function(done) {
    request('http://localhost:8000/vehicles/user/1' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        expect(JSON.parse(body)).to.be.a('array');;
        done();
    });
});