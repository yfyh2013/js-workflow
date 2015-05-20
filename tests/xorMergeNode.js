/*globals require, describe, it, expect */

var XorMergeNode = require('./../lib/xorMergeNode').XorMergeNode,
    Node = require('./../lib/node').Node;

describe('XorMergeNode', function () {
    it('should be defined', function (done) {
        expect(XorMergeNode).toBeDefined();
        done();
    });

    it('should have right data', function (done) {
        var node = new XorMergeNode();
        expect(node.inNodes).toBeEmptyArray();
        expect(node.outNodes).toBeEmptyArray();
        expect(node.finished).toBeFalsy();
        expect(node.finished).toBeBoolean();
        expect(node.failed).toBeFalsy();
        expect(node.failed).toBeBoolean();
        expect(node.failCallback).toBeDefined();
        expect(node.failCallback).toBeFunction();
        done();
    });

    it('should throw when bad call', function (done) {
        try {
            var node = XorMergeNode();
            expect(2).toBe(3);
        } catch (eX) {
            expect(typeof eX).toBe('object');
            expect(eX instanceof TypeError).toBeTruthy();
        }
        done();
    });

    describe('instance tests', function () {
        it('should be defined', function (done) {
            var condNode = new XorMergeNode();
            expect(condNode).toBeDefined();
            expect(Object.keys(condNode).length).toBe(5);
            done();
        });

        it('should have the correct inheritance', function (done) {
            var condNode = new XorMergeNode();
            expect(condNode instanceof Node).toBeTruthy();
            expect(condNode instanceof XorMergeNode).toBeTruthy();
            done();
        });

        describe('#outNodes', function () {
            it('should be defined', function (done) {
                var condNode = new XorMergeNode();
                expect(condNode.outNodes).toBeDefined();
                expect(condNode.outNodes).toBeEmptyArray();
                done();
            });
        });
    });
});