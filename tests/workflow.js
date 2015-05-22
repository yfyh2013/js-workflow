/*globals require, describe, it, expect */

var Workflow = require('./../index').Workflow,
    Node = require('./../index').Node;
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

        it('should not add a non node arg', function (done) {
            var wf = new Workflow();

            try {
                expect(wf.addOutNode());
                expect(2).toBe(3);
            } catch (eX) {
                expect(wf.outNodes).toBeEmptyArray();
            }
            try {
                expect(wf.addOutNode('a'));
                expect(2).toBe(3);
            } catch (eX) {
                expect(wf.outNodes).toBeEmptyArray();
            }
            try {
                expect(wf.addOutNode({}));
                expect(2).toBe(3);
            } catch (eX) {
                expect(wf.outNodes).toBeEmptyArray();
            }
            try {
                expect(wf.addOutNode(true));
                expect(2).toBe(3);
            } catch (eX) {
                expect(wf.outNodes).toBeEmptyArray();
            }
            try {
                expect(wf.addOutNode(false));
                expect(2).toBe(3);
            } catch (eX) {
                expect(wf.outNodes).toBeEmptyArray();
            }
            try {
                expect(wf.addOutNode(null));
                expect(2).toBe(3);
            } catch (eX) {
                expect(wf.outNodes).toBeEmptyArray();
            }
            try {
                expect(wf.addOutNode([]));
                expect(2).toBe(3);
            } catch (eX) {
                expect(wf.outNodes).toBeEmptyArray();
            }
            try {
                expect(wf.addOutNode(0));
                expect(2).toBe(3);
            } catch (eX) {
                expect(wf.outNodes).toBeEmptyArray();
            }
            try {
                expect(wf.addOutNode(1));
                expect(2).toBe(3);
            } catch (eX) {
                expect(wf.outNodes).toBeEmptyArray();
            }
            try {
                expect(wf.addOutNode(4));
                expect(2).toBe(3);
            } catch (eX) {
                expect(wf.outNodes).toBeEmptyArray();
            }
            try {
                expect(wf.addOutNode(Infinity));
                expect(2).toBe(3);
            } catch (eX) {
                expect(wf.outNodes).toBeEmptyArray();
            }
            try {
                expect(wf.addOutNode(-0));
                expect(2).toBe(3);
            } catch (eX) {
                expect(wf.outNodes).toBeEmptyArray();
            }
            try {
                expect(wf.addOutNode(-1));
                expect(2).toBe(3);
            } catch (eX) {
                expect(wf.outNodes).toBeEmptyArray();
            }
            try {
                expect(wf.addOutNode(-4));
                expect(2).toBe(3);
            } catch (eX) {
                expect(wf.outNodes).toBeEmptyArray();
            }
            try {
                expect(wf.addOutNode(-Infinity));
                expect(2).toBe(3);
            } catch (eX) {
                expect(wf.outNodes).toBeEmptyArray();
            }
            done();
        });

        it('should not add a correct Node arg', function (done) {
            var wf = new Workflow(),
                aNode = new Node();

            expect(wf.addOutNode(aNode)).not.toBeDefined();
            expect(wf.outNodes).not.toBeEmptyArray();
            expect(wf.outNodes.length).toBe(1);
            done();
        });
    });

    describe('#toString', function () {
        it('should be defined', function (done) {
            var wf = new Workflow();

            expect(wf.toString).toBeDefined();
            done();
        });

        it('should output the good things', function (done) {
            var wf = new Workflow();

            expect(wf.toString()).toBeString();
            expect(wf.toString()).toBe('data :undefined');
            wf = new Workflow(null);
            expect(wf.toString()).toBeString();
            expect(wf.toString()).toBe('data :null');
            wf = new Workflow(0);
            expect(wf.toString()).toBeString();
            expect(wf.toString()).toBe('data :0');
            wf = new Workflow(2);
            expect(wf.toString()).toBeString();
            expect(wf.toString()).toBe('data :2');
            wf = new Workflow(Infinity);
            expect(wf.toString()).toBeString();
            expect(wf.toString()).toBe('data :null');
            wf = new Workflow(-0);
            expect(wf.toString()).toBeString();
            expect(wf.toString()).toBe('data :0');
            wf = new Workflow(-2);
            expect(wf.toString()).toBeString();
            expect(wf.toString()).toBe('data :-2');
            wf = new Workflow(-Infinity);
            expect(wf.toString()).toBeString();
            expect(wf.toString()).toBe('data :null');
            wf = new Workflow('');
            expect(wf.toString()).toBeString();
            expect(wf.toString()).toBe('data :""');
            wf = new Workflow([]);
            expect(wf.toString()).toBeString();
            expect(wf.toString()).toBe('data :[]');
            done();
        });
    });

    describe('#run', function () {
        it('should be defined', function (done) {
            var wf = new Workflow();

            expect(wf.run).toBeDefined();
            done();
        });

        it('should do nothing', function (done) {
            var wf = new Workflow();

            expect(wf.run()).not.toBeDefined();
            done();
        });

        it('should call run of outNodes', function (done) {
            var wf = new Workflow(),
                aNode = new Node(),
                counter = 0;

            aNode.run = function () {
                expect(true).toBe(true);
                counter += 1;
            };

            wf.addOutNode(aNode);
            expect(wf.run()).not.toBeDefined();
            expect(counter).toBe(1);
            done();
        });
    });
});