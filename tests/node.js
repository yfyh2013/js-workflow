/*globals require, describe, it, expect */

var Node = require('./../index').Node;
require('jasmine-expect');

describe('Node', function () {
    it('should be defined', function (done) {
        expect(Node).toBeDefined();
        done();
    });

    it('should have right data', function (done) {
        var node = new Node();
        expect(node.outNodes).toBeEmptyArray();
        expect(node.finished).toBeFalsy();
        expect(node.finished).toBeBoolean();
        expect(node.failed).toBeFalsy();
        expect(node.failed).toBeBoolean();
        done();
    });

    it('should throw when bad call', function (done) {
        try {
            Node();
            expect(2).toBe(3);
        } catch (eX) {
            expect(typeof eX).toBe('object');
            expect(eX instanceof TypeError).toBeTruthy();
        }
        done();
    });

    describe('#configure', function () {
        it('should be defined', function (done) {
            var node = new Node();
            expect(node.configure).toBeDefined();
            expect(node.configure).toBeFunction();
            done();
        });

        it('should return nothing', function (done) {
            var node = new Node();
            expect(node.configure()).not.toBeDefined();
            done();
        });
    });

    describe('#addOutNode', function () {
        it('should be defined', function (done) {
            var node = new Node();
            expect(node.addOutNode).toBeDefined();
            done();
        });

        it('should not throw when adding a node', function (done) {
            var node = new Node(),
                anotherNode = new Node();

            expect(function () {
                node.addOutNode(anotherNode);
            }).not.toThrow();
            expect(node.outNodes).toBeNonEmptyArray();

            done();
        });

        it('should throw when adding something else', function (done) {
            var node = new Node();

            expect(function () {
                node.addOutNode('a');
            }).toThrow(new Error('Not a node instance.'));
            expect(node.outNodes).toBeEmptyArray();

            expect(function () {
                node.addOutNode('2');
            }).toThrow(new Error('Not a node instance.'));
            expect(node.outNodes).toBeEmptyArray();

            expect(function () {
                node.addOutNode(2);
            }).toThrow(new Error('Not a node instance.'));
            expect(node.outNodes).toBeEmptyArray();

            expect(function () {
                node.addOutNode(0);
            }).toThrow(new Error('Not a node instance.'));
            expect(node.outNodes).toBeEmptyArray();

            expect(function () {
                node.addOutNode(true);
            }).toThrow(new Error('Not a node instance.'));
            expect(node.outNodes).toBeEmptyArray();

            expect(function () {
                node.addOutNode(false);
            }).toThrow(new Error('Not a node instance.'));
            expect(node.outNodes).toBeEmptyArray();

            expect(function () {
                node.addOutNode(new Date());
            }).toThrow(new Error('Not a node instance.'));
            expect(node.outNodes).toBeEmptyArray();

            done();
        });
    });

    describe('#isFinished', function () {
        it('should be defined', function (done) {
            var node = new Node();
            expect(node.isFinished).toBeDefined();
            expect(node.isFinished).toBeFunction();
            done();
        });

        it('should return false at creation', function (done) {
            var node = new Node();
            expect(node.isFinished()).toBeFalsy();
            expect(node.isFinished()).toBeBoolean();
            done();
        });
    });

    describe('#hasFailed', function () {
        it('should be defined', function (done) {
            var node = new Node();
            expect(node.hasFailed).toBeDefined();
            expect(node.hasFailed).toBeFunction();
            done();
        });

        it('should return false at creation', function (done) {
            var node = new Node();
            expect(node.hasFailed()).toBeBoolean();
            expect(node.hasFailed()).toBeFalsy();
            done();
        });
    });

    describe('#setFinished', function () {
        it('should be defined', function (done) {
            var node = new Node();

            expect(node.setFinished).toBeDefined();

            done();
        });

        it('should set the node to finished', function (done) {
            var node = new Node();

            expect(node.finished).toBeBoolean();
            expect(node.finished).toBeFalsy();
            expect(node.setFinished()).not.toBeDefined();
            expect(node.finished).toBeBoolean();
            expect(node.finished).toBeTruthy();

            done();
        });

        it('should not set the node to finished if already failed', function (done) {
            var node = new Node();
            node.fail();

            expect(node.finished).toBeBoolean();
            expect(node.finished).toBeFalsy();
            expect(node.setFinished()).not.toBeDefined();
            expect(node.finished).toBeBoolean();
            expect(node.finished).toBeFalsy();

            done();
        });
    });

    describe('#fail', function () {
        it('should be defined', function (done) {
            var node = new Node();
            expect(node.fail).toBeDefined();
            done();
        });

        it('should set the node to failed', function (done) {
            var node = new Node();

            expect(node.failed).toBeBoolean();
            expect(node.failed).toBeFalsy();
            expect(node.fail()).not.toBeDefined();
            expect(node.failed).toBeBoolean();
            expect(node.failed).toBeTruthy();

            done();
        });

        it('should not set the node to failed if already finished', function (done) {
            var node = new Node();
            node.setFinished();

            expect(node.failed).toBeBoolean();
            expect(node.failed).toBeFalsy();
            expect(node.fail()).not.toBeDefined();
            expect(node.failed).toBeBoolean();
            expect(node.failed).toBeFalsy();

            done();
        });
    });

    describe('#canRun', function () {
        it('should be defined', function (done) {
            var node = new Node();
            expect(node.canRun).toBeDefined();
            expect(node.canRun).toBeFunction();
            done();
        });

        it('should say that you can run, don\'t care of state', function (done) {
            var node = new Node();
            expect(node.canRun()).toBeBoolean();
            expect(node.canRun()).toBeTruthy();
            node.fail();
            expect(node.canRun()).toBeBoolean();
            expect(node.canRun()).toBeTruthy();
            node = new Node();
            node.setFinished();
            expect(node.canRun()).toBeBoolean();
            expect(node.canRun()).toBeTruthy();
            done();
        });
    });

    describe('#run', function () {
        it('should be defined', function (done) {
            var node = new Node();
            expect(node.run).toBeDefined();
            expect(node.run).toBeFunction();
            done();
        });

        it('should run with child node running too', function (done) {
            var nodeA = new Node(),
                nodeB = new Node(),
                testCounter = 0;

            nodeB.canRun = function (arg) {
                expect(arg).toBe(8);
                expect(arg).toBeNumber();
                testCounter += 1;
                return true;
            };
            nodeB.run = function (arg) {
                expect(arg).toBe(8);
                expect(arg).toBeNumber();
                testCounter += 1;
                return true;
            };

            nodeB.setFinished();

            nodeA.addOutNode(nodeB);

            nodeA.setFinished();
            nodeA.run(8);

            expect(testCounter).toBe(2);
            done();
        });

        it('should run with child node which can\'t run beacause not finished', function (done) {
            var nodeA = new Node(),
                nodeB = new Node(),
                testCounter = 0;

            nodeB.canRun = function (arg) {
                expect(arg).toBe(8);
                expect(arg).toBeNumber();
                testCounter += 1;
                return false;
            };
            nodeB.run = function () {
                testCounter += 1;
                expect(true).toBe(false);
            };

            nodeA.addOutNode(nodeB);

            nodeA.run(8);

            expect(testCounter).toBe(1);
            done();
        });
    });
});