/*globals require, describe, it, expect */

var MergeNode = require('./../index').MergeNode,
    Node = require('./../index').Node;

describe('MergeNode', function () {
    it('should be defined', function (done) {
        expect(MergeNode).toBeDefined();
        done();
    });

    it('should have right data', function (done) {
        var node = new MergeNode();
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
            MergeNode();
            expect(2).toBe(3);
        } catch (eX) {
            expect(typeof eX).toBe('object');
            expect(eX instanceof TypeError).toBeTruthy();
        }
        done();
    });

    describe('#run', function () {

        it('will return false for an empty inNode', function (done) {
            var condNode = new MergeNode();
            expect(condNode.canRun()).toBeDefined();
            expect(condNode.canRun()).toBeBoolean();
            expect(condNode.canRun()).toBeFalsy();
            done();
        });

        it('will return false for a inNode which throw during canRun', function (done) {
            var condNode = new MergeNode(),
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
            var condNode = new MergeNode(),
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

        it('will return true for a inNode which is finished', function (done) {
            var condNode = new MergeNode(),
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

        it('will return true for a inNode which throw during canRun', function (done) {
            var condNode = new MergeNode(),
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
            expect(condNode.canRun()).toBeTruthy();
            done();
        });
    });
});