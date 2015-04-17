/*globals require, describe, it */

var Node = require('./../lib/node').Node;

describe('Node', function () {
    it('should be defined', function (done) {
        expect(Node).toBeDefined();
        done();
    });

    describe('#addOutNode', function () {
        it('should be defined', function (done) {
            var node = new Node();
            expect(node.addOutNode).toBeDefined();
            done();
        });
    });

    describe('#isFinished', function () {
        it('should be defined', function (done) {
            var node = new Node();
            expect(node.isFinished).toBeDefined();
            done();
        });
    });

    describe('#hasFailed', function () {
        it('should be defined', function (done) {
            var node = new Node();
            expect(node.hasFailed).toBeDefined();
            done();
        });
    });

    describe('#setFinished', function () {
        it('should be defined', function (done) {
            var node = new Node();
            expect(node.setFinished).toBeDefined();
            done();
        });
    });

    describe('#fail', function () {
        it('should be defined', function (done) {
            var node = new Node();
            expect(node.fail).toBeDefined();
            done();
        });
    });

    describe('#canRun', function () {
        it('should be defined', function (done) {
            var node = new Node();
            expect(node.canRun).toBeDefined();
            done();
        });
    });

    describe('#run', function () {
        it('should be defined', function (done) {
            var node = new Node();
            expect(node.run).toBeDefined();
            done();
        });
    });
});