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

        it('should take the correct value when defining failCallback with good value', function (done) {
            var condNode = new XorMergeNode(function () {
            });
            expect(condNode.failCallback).toBeDefined();
            expect(condNode.failCallback).toBeFunction();
            done();
        });

        it('should take the correct value when defining failCallback with dirty value', function (done) {
            var condNode = new XorMergeNode(undefined);
            expect(condNode.failCallback).toBeDefined();
            expect(condNode.failCallback).toBeFunction();
            condNode = new XorMergeNode(null);
            expect(condNode.failCallback).toBeDefined();
            expect(condNode.failCallback).toBeFunction();
            condNode = new XorMergeNode(true);
            expect(condNode.failCallback).toBeDefined();
            expect(condNode.failCallback).toBeFunction();
            condNode = new XorMergeNode(false);
            expect(condNode.failCallback).toBeDefined();
            expect(condNode.failCallback).toBeFunction();
            condNode = new XorMergeNode(0);
            expect(condNode.failCallback).toBeDefined();
            expect(condNode.failCallback).toBeFunction();
            condNode = new XorMergeNode(1);
            expect(condNode.failCallback).toBeDefined();
            expect(condNode.failCallback).toBeFunction();
            condNode = new XorMergeNode(4);
            expect(condNode.failCallback).toBeDefined();
            expect(condNode.failCallback).toBeFunction();
            condNode = new XorMergeNode(Infinity);
            expect(condNode.failCallback).toBeDefined();
            expect(condNode.failCallback).toBeFunction();
            condNode = new XorMergeNode(-0);
            expect(condNode.failCallback).toBeDefined();
            expect(condNode.failCallback).toBeFunction();
            condNode = new XorMergeNode(-1);
            expect(condNode.failCallback).toBeDefined();
            expect(condNode.failCallback).toBeFunction();
            condNode = new XorMergeNode(-4);
            expect(condNode.failCallback).toBeDefined();
            expect(condNode.failCallback).toBeFunction();
            condNode = new XorMergeNode(-Infinity);
            expect(condNode.failCallback).toBeDefined();
            expect(condNode.failCallback).toBeFunction();
            condNode = new XorMergeNode('abc');
            expect(condNode.failCallback).toBeDefined();
            expect(condNode.failCallback).toBeFunction();
            done();
        });

        describe('#inNodes', function (done) {
            it('#with a correct Node arg', function (done) {
                var condNode = new XorMergeNode(),
                    aNode = new Node();

                try {
                    condNode.addInNodes(aNode);
                    expect(condNode.inNodes).toBeNonEmptyArray();
                    expect(condNode.inNodes.length).toBe(1);
                    expect(condNode.inNodes[0]).toBeObject();
                    expect(condNode.inNodes[0] instanceof Node).toBeTruthy()
                } catch (eX) {
                    expect(2).toBe(3);
                }
                done();
            });

            it('#with a dirty arg', function (done) {
                var condNode = new XorMergeNode(),
                    aNode = new Node();

                try {
                    condNode.addInNodes();
                    expect(true).toBeFalsy();
                } catch (eX) {
                    expect(3).toBe(3);
                }
                try {
                    condNode.addInNodes(true);
                    expect(true).toBeFalsy();
                } catch (eX) {
                    expect(3).toBe(3);
                }
                try {
                    condNode.addInNodes(false);
                    expect(true).toBeFalsy();
                } catch (eX) {
                    expect(3).toBe(3);
                }
                try {
                    condNode.addInNodes(function () {
                    });
                    expect(true).toBeFalsy();
                } catch (eX) {
                    expect(3).toBe(3);
                }
                done();
            });
        });

        describe('#outNodes', function () {
            it('should be defined', function (done) {
                var condNode = new XorMergeNode();
                expect(condNode.outNodes).toBeDefined();
                expect(condNode.outNodes).toBeEmptyArray();
                done();
            });
        });

        describe('#canRun', function () {
            it('should be defined', function (done) {
                var condNode = new XorMergeNode();
                expect(condNode.canRun).toBeFunction();
                done();
            });

            it('will return false for an empty inNode', function (done) {
                var condNode = new XorMergeNode();
                expect(condNode.canRun()).toBeDefined();
                expect(condNode.canRun()).toBeBoolean();
                expect(condNode.canRun()).toBeFalsy();
                done();
            });

            it('will return false for a inNode which throw during canRun', function (done) {
                var condNode = new XorMergeNode(),
                    aFailNode = new Node();

                aFailNode.isFinished = function () {
                    throw '';
                };
                condNode.addInNodes(aFailNode);
                expect(condNode.canRun()).toBeDefined();
                expect(condNode.canRun()).toBeBoolean();
                expect(condNode.canRun()).toBeFalsy();
                done();
            });
        })
    });
});