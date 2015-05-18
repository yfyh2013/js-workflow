/*globals require, describe, it, expect */

var ConditionnalNode = require('./../lib/conditionnalNode').ConditionnalNode,
    Node = require('./../lib/node').Node;

describe('ConditionnalNode', function () {
    it('should be defined', function (done) {
        expect(ConditionnalNode).toBeDefined();
        expect(ConditionnalNode).toBeFunction();
        done();
    });

    describe('instance tests', function () {
        it('should be defined', function (done) {
            var condNode = new ConditionnalNode();
            expect(condNode).toBeDefined();
            expect(Object.keys(condNode).length).toBe(5);
            done();
        });

        it('should have the correct inheritance', function (done) {
            var condNode = new ConditionnalNode();
            expect(condNode instanceof Node).toBeTruthy();
            expect(condNode instanceof ConditionnalNode).toBeTruthy();
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