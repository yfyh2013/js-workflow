/*globals require, describe, it, expect */

var Driver = require('./../lib/driver').Driver;

describe('Driver', function () {
    it('should be defined', function (done) {
        expect(Driver).toBeDefined();
        done();
    });

    describe('#store', function () {
        it('should be defined', function (done) {
            var driver = new Driver();

            expect(driver.store).toBeDefined();

            done();
        });

        it('should throw an error when called', function (done) {
            var driver = new Driver();

            expect(function () {
                driver.store();
            }).toThrow(new Error('Don\'t use the class Driver directly please.'));

            done();
        });
    });
});