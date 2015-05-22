/*globals require, describe, it, expect */

var ConsoleDriver = require('./../index').ConsoleDriver;

describe('ConsoleDriver', function () {
    it('should be defined', function (done) {
        expect(ConsoleDriver).toBeDefined();
        done();
    });

    it('should throw when bad call', function (done) {
        try {
            ConsoleDriver();
            expect(2).toBe(3);
        } catch (eX) {
            expect(typeof eX).toBe('object');
            expect(eX instanceof TypeError).toBeTruthy();
        }
        done();
    });

    it('should have right data', function (done) {
        var theConsole = new ConsoleDriver();
        expect(theConsole).toBeEmptyObject();
        done();
    });

    describe('#store', function () {
        it('should be defined', function (done) {
            var theConsole = new ConsoleDriver();
            expect(theConsole.store).toBeDefined();
            expect(theConsole.store).toBeFunction();
            done();
        });

        it('should call console log for dirty values', function (done) {
            var theConsole = new ConsoleDriver(),
                counter = 0;

            console.log = function (data) {
                expect(data).not.toBeDefined();
                counter += 1;
            };

            expect(theConsole.store()).not.toBeDefined();
            expect(counter).toBe(1);

            console.log = function (data) {
                expect(data).not.toBeNull();
                counter += 1;
            };

            expect(theConsole.store(null)).not.toBeDefined();
            expect(counter).toBe(2);
            done();
        });

        it('should call console log for primitive values', function (done) {
            var theConsole = new ConsoleDriver(),
                counter = 0,
                theData;

            console.log = function (data) {
                expect(data).toBeDefined();
                expect(data).toBeString();
                theData = data;
                counter += 1;
            };

            expect(theConsole.store(1)).not.toBeDefined();
            expect(counter).toBe(1);
            expect(theData).toBe('1');
            expect(theConsole.store(2)).not.toBeDefined();
            expect(counter).toBe(2);
            expect(theData).toBe('2');
            expect(theConsole.store(5)).not.toBeDefined();
            expect(counter).toBe(3);
            expect(theData).toBe('5');
            expect(theConsole.store(0)).not.toBeDefined();
            expect(counter).toBe(4);
            expect(theData).toBe('0');
            done();
        });

        it('should call console log for objects', function (done) {
            var theConsole = new ConsoleDriver(),
                counter = 0,
                theData = null;

            console.log = function (data) {
                expect(data).toBeDefined();
                expect(data).toBeString();
                theData = data;
                counter += 1;
            };

            expect(theConsole.store({})).not.toBeDefined();
            expect(counter).toBe(1);
            expect(theData).toBe('{}');
            done();
        });
    });
});