/*globals require, describe, it, expect */

var ConsoleDriver = require('./../lib/consoleDriver').ConsoleDriver;

describe('ConsoleDriver', function () {
    it('should be defined', function (done) {
        expect(ConsoleDriver).toBeDefined();
        done();
    });
});