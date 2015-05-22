/*globals require, describe, it, expect */

var MergeNode = require('./../index').MergeNode;

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
    });
});