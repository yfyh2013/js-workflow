/*globals require, describe, it */

var Node = require('./../lib/node').Node;

describe('Node', function () {
    it('should be defined', function (done) {
        expect(Node).toBeDefined();
        done();
    });
});