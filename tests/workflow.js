/*globals require, describe, it, expect */

var Workflow = require('./../index').Workflow;
require('jasmine-expect');

describe('Workflow', function () {
    it('should be defined', function (done) {
        expect(Workflow).toBeDefined();
        done();
    });

    it('should have right data whith params', function (done) {
        var wf = new Workflow();

        expect(wf.data).not.toBeDefined();
        expect(wf.outNodes).toBeEmptyArray();

        wf = new Workflow(2);

        expect(wf.data).toBe(2);
        expect(wf.outNodes).toBeEmptyArray();

        wf = new Workflow(0);

        expect(wf.data).toBe(0);
        expect(wf.outNodes).toBeEmptyArray();

        wf = new Workflow(true);

        expect(wf.data).toBe(true);
        expect(wf.outNodes).toBeEmptyArray();

        wf = new Workflow(false);

        expect(wf.data).toBe(false);
        expect(wf.outNodes).toBeEmptyArray();

        wf = new Workflow('a');

        expect(wf.data).toBe('a');
        expect(wf.outNodes).toBeEmptyArray();

        wf = new Workflow(new Date());

        expect(wf.data).toBeDate();
        expect(wf.outNodes).toBeEmptyArray();

        wf = new Workflow({});

        expect(wf.data).toBeEmptyObject();
        expect(wf.outNodes).toBeEmptyArray();

        wf = new Workflow({
            a: 0
        });

        expect(wf.data).toBeNonEmptyObject();
        expect(wf.outNodes).toBeEmptyArray();

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