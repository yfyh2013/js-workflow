/*globals require, describe, it */

var Workflow = require('./../lib/workflow').Workflow;

describe('Workflow', function () {
    it('should be defined', function (done) {
        expect(Workflow).toBeDefined();
        done();
    });

    describe('#addOutNode', function () {
        it('should be defined', function (done) {
            var wf = new Workflow();

            expect(wf.addOutNode).toBeDefined();
            done();
        });
    });

    describe('#toString', function () {
        it('should be defined', function (done) {
            var wf = new Workflow();

            expect(wf.toString).toBeDefined();
            done();
        });
    });

    describe('#run', function () {
        it('should be defined', function (done) {
            var wf = new Workflow();

            expect(wf.run).toBeDefined();
            done();
        });
    });
});