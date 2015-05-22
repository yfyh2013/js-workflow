/*globals require, describe, it, expect */

var SynchronizingNode = require('./../index').SynchronizingNode,
    Node = require('./../index').Node;

describe('SynchronizingNode', function () {
    it('should be defined', function (done) {
        expect(SynchronizingNode).toBeDefined();
        done();
    });

    it('should have right data', function (done) {
        var node = new SynchronizingNode();
        expect(node.inNodes).toBeEmptyArray();
        expect(node.outNodes).toBeEmptyArray();
        expect(node.finished).toBeFalsy();
        expect(node.finished).toBeBoolean();
        expect(node.failed).toBeFalsy();
        expect(node.failed).toBeBoolean();
        done();
    });

    it('should throw when bad call', function (done) {
        try {
            SynchronizingNode();
            expect(2).toBe(3);
        } catch (eX) {
            expect(typeof eX).toBe('object');
            expect(eX instanceof TypeError).toBeTruthy();
        }
        done();
    });

    describe('instance tests', function () {
        it('should be defined', function (done) {
            var condNode = new SynchronizingNode();
            expect(condNode).toBeDefined();
            expect(Object.keys(condNode).length).toBe(4);
            done();
        });

        it('should have the correct inheritance', function (done) {
            var condNode = new SynchronizingNode();
            expect(condNode instanceof Node).toBeTruthy();
            expect(condNode instanceof SynchronizingNode).toBeTruthy();
            done();
        });

        describe('#inNodes', function () {
            it('#with a correct Node arg', function (done) {
                var condNode = new SynchronizingNode(),
                    aNode = new Node();

                try {
                    condNode.addInNodes(aNode);
                    expect(condNode.inNodes).toBeNonEmptyArray();
                    expect(condNode.inNodes.length).toBe(1);
                    expect(condNode.inNodes[0]).toBeObject();
                    expect(condNode.inNodes[0] instanceof Node).toBeTruthy();
                } catch (eX) {
                    expect(2).toBe(3);
                }
                done();
            });

            it('#with a dirty arg', function (done) {
                var condNode = new SynchronizingNode();

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
                var condNode = new SynchronizingNode();
                expect(condNode.outNodes).toBeDefined();
                expect(condNode.outNodes).toBeEmptyArray();
                done();
            });
        });

        describe('#canRun', function () {
            it('should be defined', function (done) {
                var condNode = new SynchronizingNode();
                expect(condNode.canRun).toBeFunction();
                done();
            });

            it('will return true for an empty inNode', function (done) {
                var condNode = new SynchronizingNode();
                expect(condNode.canRun()).toBeDefined();
                expect(condNode.canRun()).toBeBoolean();
                expect(condNode.canRun()).toBeTruthy();
                done();
            });

            it('will return false for a inNode which throw during canRun', function (done) {
                var condNode = new SynchronizingNode(),
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

            it('will return false for a inNode which is not finished', function (done) {
                var condNode = new SynchronizingNode(),
                    aFailNode = new Node();

                aFailNode.isFinished = function () {
                    return false;
                };
                condNode.addInNodes(aFailNode);
                expect(condNode.canRun()).toBeDefined();
                expect(condNode.canRun()).toBeBoolean();
                expect(condNode.canRun()).toBeFalsy();
                done();
            });

            it('will return true for a inNode which are all finished', function (done) {
                var condNode = new SynchronizingNode(),
                    aFailNode = new Node(),
                    bFailNode = new Node();

                aFailNode.isFinished = function () {
                    return true;
                };
                bFailNode.isFinished = function () {
                    return true;
                };
                condNode.addInNodes(aFailNode);
                condNode.addInNodes(bFailNode);
                expect(condNode.canRun()).toBeDefined();
                expect(condNode.canRun()).toBeBoolean();
                expect(condNode.canRun()).toBeTruthy();
                done();
            });

            it('will return false for inNodes which one is finished and the other not', function (done) {
                var condNode = new SynchronizingNode(),
                    aFailNode = new Node(),
                    bFailNode = new Node();

                aFailNode.isFinished = function () {
                    return false;
                };
                bFailNode.isFinished = function () {
                    return true;
                };
                condNode.addInNodes(aFailNode);
                condNode.addInNodes(bFailNode);
                expect(condNode.canRun()).toBeDefined();
                expect(condNode.canRun()).toBeBoolean();
                expect(condNode.canRun()).toBeFalsy();
                done();
            });
        });

        describe('#run', function () {
            it('should be defined', function (done) {
                var condNode = new SynchronizingNode();
                expect(condNode.run).toBeFunction();
                done();
            });

            it('should not run', function (done) {
                var condNode = new SynchronizingNode();
                expect(condNode.run()).not.toBeDefined();
                done();
            });
        });
    });
});