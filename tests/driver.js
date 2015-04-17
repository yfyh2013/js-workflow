/*globals require, describe, it */

var Driver = require('./../lib/driver').Driver;

describe('Driver', function () {
    it('should be defined', function (done) {
        expect(Driver).toBeDefined();
        done();
    });
});