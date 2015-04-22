/*globals require, describe, it, expect */

var MergeNode = require('./../lib/mergeNode').MergeNode,
    Node = require('./../lib/node').Node,
    Workflow = require('./../lib/workflow').Workflow;

describe('MergeNode', function () {
    it('should be defined', function (done) {
        expect(MergeNode).toBeDefined();
        done();
    });

    describe('#run', function () {
        it('should be defined', function (done) {
            var mergeNode = new MergeNode();
            expect(mergeNode.run).toBeDefined();
            done();
        });
        it('should run', function (done) {
            var mergeNode = new MergeNode(),
                node = new Node(),
                wf = new Workflow({});

            wf.addOutNode(node);
            node.addOutNode(mergeNode);

            wf.run();

            done();
        });
    });
});