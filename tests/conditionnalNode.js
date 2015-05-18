/*globals require, describe, it, expect */

var ConditionnalNode = require('./../lib/conditionnalNode').ConditionnalNode;

describe('ConditionnalNode', function () {
    it('should be defined', function (done) {
        expect(ConditionnalNode).toBeDefined();
        //console.log(Object.getOwnPropertyNames(Node.prototype).filter(function (p) {
        //    return 'function' === typeof Node.prototype[p];
        //}));
        done();
    });

    describe('instance tests', function () {
        it('should be defined', function (done) {
            var condNode = new ConditionnalNode();
            expect(condNode).toBeDefined();
            expect(Object.keys(condNode).length).toBe(5);
            done();
        });

        describe('#outNodes', function () {
            it('should be defined', function (done) {
                var condNode = new ConditionnalNode();
                expect(condNode.outNodes).toBeDefined();
                expect(condNode.outNodes).toBeEmptyArray();
                done();
            });
        });

        describe('#finished', function () {
            it('should be defined', function (done) {
                var condNode = new ConditionnalNode();
                expect(condNode.finished).toBeDefined();
                expect(condNode.finished).toBeBoolean();
                expect(condNode.finished).toBeFalsy();
                done();
            });
        });

        describe('#failed', function () {
            it('should be defined', function (done) {
                var condNode = new ConditionnalNode();
                expect(condNode.failed).toBeDefined();
                expect(condNode.failed).toBeBoolean();
                expect(condNode.failed).toBeFalsy();
                done();
            });
        });

        describe('#condition', function () {
            it('should be defined', function (done) {
                var condNode = new ConditionnalNode();
                expect(condNode.condition).toBeDefined();
                expect(condNode.condition).toBeFunction();
                done();
            });
        });

        describe('#failCallback', function () {
            it('should be defined', function (done) {
                var condNode = new ConditionnalNode();
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                done();
            });
        });
    });
});