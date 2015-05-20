/*globals require, describe, it, expect */

var StorageNode = require('./../lib/storageNode').StorageNode,
    ConsoleDriver = require('./../lib/consoleDriver').ConsoleDriver;

describe('StorageNode', function () {
    it('should be defined', function (done) {
        expect(StorageNode).toBeDefined();
        done();
    });

    it('should have right data', function (done) {
        var node = new StorageNode(new ConsoleDriver());
        expect(node.outNodes).toBeEmptyArray();
        expect(node.finished).toBeFalsy();
        expect(node.finished).toBeBoolean();
        expect(node.failed).toBeFalsy();
        expect(node.failed).toBeBoolean();
        done();
    });

    it('should throw when bad call', function (done) {
        try {
            var node = StorageNode(new ConsoleDriver());
            expect(2).toBe(3);
        } catch (eX) {
            expect(typeof eX).toBe('object');
            expect(eX instanceof TypeError).toBeTruthy();
        }
        done();
    });

    describe('#configure', function () {
        it('should be defined', function (done) {
            var node = new StorageNode(new ConsoleDriver());
            expect(node.configure).toBeDefined();
            expect(node.configure).toBeFunction();
            done();
        });

        it('should return nothing', function (done) {
            var node = new StorageNode(new ConsoleDriver());
            expect(node.configure()).not.toBeDefined();
            done();
        });
    });

    describe('#addOutNode', function () {
        it('should be defined', function (done) {
            var node = new StorageNode(new ConsoleDriver());
            expect(node.addOutNode).toBeDefined();
            done();
        });

        it('should not throw when adding a node', function (done) {
            var node = new StorageNode(new ConsoleDriver()),
                anotherNode = new StorageNode(new ConsoleDriver());

            expect(function () {
                node.addOutNode(anotherNode);
            }).not.toThrow();
            expect(node.outNodes).toBeNonEmptyArray();

            done();
        });

        it('should throw when adding something else', function (done) {
            var node = new StorageNode(new ConsoleDriver());

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
            var node = new StorageNode(new ConsoleDriver());
            expect(node.isFinished).toBeDefined();
            expect(node.isFinished).toBeFunction();
            done();
        });

        it('should return false at creation', function (done) {
            var node = new StorageNode(new ConsoleDriver());
            expect(node.isFinished()).toBeFalsy();
            expect(node.isFinished()).toBeBoolean();
            done();
        });
    });

    describe('#hasFailed', function () {
        it('should be defined', function (done) {
            var node = new StorageNode(new ConsoleDriver());
            expect(node.hasFailed).toBeDefined();
            expect(node.hasFailed).toBeFunction();
            done();
        });

        it('should return false at creation', function (done) {
            var node = new StorageNode(new ConsoleDriver());
            expect(node.hasFailed()).toBeBoolean();
            expect(node.hasFailed()).toBeFalsy();
            done();
        });
    });

    describe('#setFinished', function () {
        it('should be defined', function (done) {
            var node = new StorageNode(new ConsoleDriver());

            expect(node.setFinished).toBeDefined();

            done();
        });

        it('should set the node to finished', function (done) {
            var node = new StorageNode(new ConsoleDriver());

            expect(node.finished).toBeBoolean();
            expect(node.finished).toBeFalsy();
            expect(node.setFinished()).not.toBeDefined();
            expect(node.finished).toBeBoolean();
            expect(node.finished).toBeTruthy();

            done();
        });

        it('should not set the node to finished if already failed', function (done) {
            var node = new StorageNode(new ConsoleDriver());
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
            var node = new StorageNode(new ConsoleDriver());
            expect(node.fail).toBeDefined();
            done();
        });

        it('should set the node to failed', function (done) {
            var node = new StorageNode(new ConsoleDriver());

            expect(node.failed).toBeBoolean();
            expect(node.failed).toBeFalsy();
            expect(node.fail()).not.toBeDefined();
            expect(node.failed).toBeBoolean();
            expect(node.failed).toBeTruthy();

            done();
        });

        it('should not set the node to failed if already finished', function (done) {
            var node = new StorageNode(new ConsoleDriver());
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
            var node = new StorageNode(new ConsoleDriver());
            expect(node.canRun).toBeDefined();
            expect(node.canRun).toBeFunction();
            done();
        });

        it('should say that you can run, don\'t care of state', function (done) {
            var node = new StorageNode(new ConsoleDriver());
            expect(node.canRun()).toBeBoolean();
            expect(node.canRun()).toBeTruthy();
            node.fail();
            expect(node.canRun()).toBeBoolean();
            expect(node.canRun()).toBeTruthy();
            node = new StorageNode(new ConsoleDriver());
            node.setFinished();
            expect(node.canRun()).toBeBoolean();
            expect(node.canRun()).toBeTruthy();
            done();
        });
    });

    describe('#run', function () {
        it('should be defined', function (done) {
            var node = new StorageNode(new ConsoleDriver());
            expect(node.run).toBeDefined();
            expect(node.run).toBeFunction();
            done();
        });

        it('should run with child node running too', function (done) {
            var nodeA = new StorageNode(new ConsoleDriver()),
                nodeB = new StorageNode(new ConsoleDriver()),
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
            var nodeA = new StorageNode(new ConsoleDriver()),
                nodeB = new StorageNode(new ConsoleDriver()),
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

            nodeA.addOutNode(nodeB);

            nodeA.run(8);

            expect(testCounter).toBe(2);
            done();
        });
    });
});