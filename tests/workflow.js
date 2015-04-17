/*globals require, describe, it */

var Workflow = require('./../lib/workflow').Workflow;

describe('Workflow', function () {
    it('should be defined', function (done) {
        expect(Workflow).toBeDefined();
        done();
    });
});