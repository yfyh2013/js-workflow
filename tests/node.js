/*globals require, describe, it */

var Node = require('./../lib/node').Node;
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
        expect(node.failed).toBeFalsy();
        done();
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
                node.addOutNode(anotherNode)
            }).not.toThrow();
            expect(node.outNodes).toBeNonEmptyArray();

            done();
        });

        it('should throw when adding something else', function (done) {
            var node = new Node();

            expect(function () {
                node.addOutNode('a')
            }).toThrow(new Error('Not a node instance.'));
            expect(node.outNodes).toBeEmptyArray();

            expect(function () {
                node.addOutNode('2')
            }).toThrow(new Error('Not a node instance.'));
            expect(node.outNodes).toBeEmptyArray();

            expect(function () {
                node.addOutNode(2)
            }).toThrow(new Error('Not a node instance.'));
            expect(node.outNodes).toBeEmptyArray();

            expect(function () {
                node.addOutNode(0)
            }).toThrow(new Error('Not a node instance.'));
            expect(node.outNodes).toBeEmptyArray();

            expect(function () {
                node.addOutNode(true)
            }).toThrow(new Error('Not a node instance.'));
            expect(node.outNodes).toBeEmptyArray();

            expect(function () {
                node.addOutNode(false)
            }).toThrow(new Error('Not a node instance.'));
            expect(node.outNodes).toBeEmptyArray();

            expect(function () {
                node.addOutNode(new Date())
            }).toThrow(new Error('Not a node instance.'));
            expect(node.outNodes).toBeEmptyArray();

            done();
        });
    });

    describe('#isFinished', function () {
        it('should be defined', function (done) {
            var node = new Node();
            expect(node.isFinished).toBeDefined();
            done();
        });

        it('should return false at creation', function (done) {
            var node = new Node();
            expect(node.isFinished()).toBeFalsy();
            done();
        });
    });

    describe('#hasFailed', function () {
        it('should be defined', function (done) {
            var node = new Node();
            expect(node.hasFailed).toBeDefined();
            done();
        });

        it('should return false at creation', function (done) {
            var node = new Node();
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

            expect(node.finished).toBeFalsy();
            expect(node.setFinished()).not.toBeDefined();
            expect(node.finished).toBeTruthy();

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