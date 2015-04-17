/*globals require, describe, it */

var StorageNode = require('./../lib/storageNode').StorageNode;

describe('StorageNode', function () {
    it('should be defined', function (done) {
        expect(StorageNode).toBeDefined();
        done();
    });
});