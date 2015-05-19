/*globals require, describe, it, expect */

var Driver = require('./../lib/driver').Driver;

describe('Driver', function () {
    it('should be defined', function (done) {
        expect(Driver).toBeDefined();
        done();
    });

    it('should throw when bad call', function (done) {
        try {
            var node = Driver();
            expect(2).toBe(3);
        } catch (eX) {
            expect(typeof eX).toBe('object');
            expect(eX instanceof TypeError).toBeTruthy();
        }
        done();
    });

    it('should have right data', function (done) {
        var theConsole = new Driver();
        expect(theConsole).toBeEmptyObject();
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