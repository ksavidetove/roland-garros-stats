'use strict';

const should = require("should");
const request = require('supertest');

require('chai').Should();

describe('app', () => {
    it('get all Players', (done) => {
        request('localhost:3000')
            .get('/players')
            .expect(200)
            .end((err, res) => {
                should.exist(res.body.players);
                res.body.players.should.have.lengthOf(5);
                done();
            });
    });

    it('get a single Player', (done) => {
        request('localhost:3000')
            .get('/players/52')
            .expect(200)
            .end((err, res) => {
                should.exist(res.body);
                res.body.should.have.property('id').which.equal(52);
                done();
            });
    });

    it('returns 404 if Player doesn\'t exists', (done) => {
        request('localhost:3000')
            .get('/player/55')
            .expect(404, done);
    });
});