/*globals require, describe, it, expect */

var ConditionnalNode = require('./../lib/conditionnalNode').ConditionnalNode,
    Node = require('./../lib/node').Node;

describe('ConditionnalNode', function () {
    it('should be defined', function (done) {
        expect(ConditionnalNode).toBeDefined();
        expect(ConditionnalNode).toBeFunction();
        done();
    });

    it('should throw when bad call', function (done) {
        try {
            var node = ConditionnalNode();
            expect(2).toBe(3);
        } catch (eX) {
            expect(typeof eX).toBe('object');
            expect(eX instanceof TypeError).toBeTruthy();
        }
        done();
    });

    describe('instance tests', function () {
        it('should be defined', function (done) {
            var condNode = new ConditionnalNode();
            expect(condNode).toBeDefined();
            expect(Object.keys(condNode).length).toBe(5);
            done();
        });

        it('should have the correct inheritance', function (done) {
            var condNode = new ConditionnalNode();
            expect(condNode instanceof Node).toBeTruthy();
            expect(condNode instanceof ConditionnalNode).toBeTruthy();
            done();
        });

        describe('#outNodes', function () {
            it('should be defined', function (done) {
                var condNode = new ConditionnalNode();
                expect(condNode.outNodes).toBeDefined();
                expect(condNode.outNodes).toBeEmptyArray();
                done();
            });
        });

        describe('#finished', function () {
            it('should be defined', function (done) {
                var condNode = new ConditionnalNode();
                expect(condNode.finished).toBeDefined();
                expect(condNode.finished).toBeBoolean();
                expect(condNode.finished).toBeFalsy();
                done();
            });
        });

        describe('#failed', function () {
            it('should be defined', function (done) {
                var condNode = new ConditionnalNode();
                expect(condNode.failed).toBeDefined();
                expect(condNode.failed).toBeBoolean();
                expect(condNode.failed).toBeFalsy();
                done();
            });
        });

        describe('#condition', function () {
            it('should be defined', function (done) {
                var condNode = new ConditionnalNode();
                expect(condNode.condition).toBeDefined();
                expect(condNode.condition).toBeFunction();
                done();
            });

            it('should take the correct value when defining condition', function (done) {
                var condNode = new ConditionnalNode(undefined);
                expect(condNode.condition).toBeDefined();
                expect(condNode.condition).toBeFunction();
                condNode = new ConditionnalNode(null);
                expect(condNode.condition).toBeDefined();
                expect(condNode.condition).toBeNull();
                condNode = new ConditionnalNode(true);
                expect(condNode.condition).toBeDefined();
                expect(condNode.condition).toBeBoolean();
                expect(condNode.condition).toBeTruthy();
                condNode = new ConditionnalNode(false);
                expect(condNode.condition).toBeDefined();
                expect(condNode.condition).toBeBoolean();
                expect(condNode.condition).toBeFalsy();
                condNode = new ConditionnalNode(0);
                expect(condNode.condition).toBeDefined();
                expect(condNode.condition).toBeNumber();
                expect(condNode.condition).toBe(0);
                condNode = new ConditionnalNode(1);
                expect(condNode.condition).toBeDefined();
                expect(condNode.condition).toBeNumber();
                expect(condNode.condition).toBe(1);
                condNode = new ConditionnalNode(4);
                expect(condNode.condition).toBeDefined();
                expect(condNode.condition).toBeNumber();
                expect(condNode.condition).toBe(4);
                condNode = new ConditionnalNode(Infinity);
                expect(condNode.condition).toBeDefined();
                expect(condNode.condition).toBeNumber();
                expect(condNode.condition).toBe(Infinity);
                condNode = new ConditionnalNode(-0);
                expect(condNode.condition).toBeDefined();
                expect(condNode.condition).toBeNumber();
                expect(condNode.condition).toBe(-0);
                condNode = new ConditionnalNode(-1);
                expect(condNode.condition).toBeDefined();
                expect(condNode.condition).toBeNumber();
                expect(condNode.condition).toBe(-1);
                condNode = new ConditionnalNode(-4);
                expect(condNode.condition).toBeDefined();
                expect(condNode.condition).toBeNumber();
                expect(condNode.condition).toBe(-4);
                condNode = new ConditionnalNode(-Infinity);
                expect(condNode.condition).toBeDefined();
                expect(condNode.condition).toBeNumber();
                expect(condNode.condition).toBe(-Infinity);
                condNode = new ConditionnalNode('abc');
                expect(condNode.condition).toBeDefined();
                expect(condNode.condition).toBeString();
                expect(condNode.condition).toBe('abc');
                done();
            });

            it('should take the correct value when defining failCallback with good value', function (done) {
                var condNode = new ConditionnalNode(true, function () {
                });
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                done();
            });

            it('should take the correct value when defining failCallback with dirty value', function (done) {
                var condNode = new ConditionnalNode(true, undefined);
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                condNode = new ConditionnalNode(true, null);
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                condNode = new ConditionnalNode(true, true);
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                condNode = new ConditionnalNode(true, false);
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                condNode = new ConditionnalNode(true, 0);
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                condNode = new ConditionnalNode(true, 1);
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                condNode = new ConditionnalNode(true, 4);
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                condNode = new ConditionnalNode(true, Infinity);
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                condNode = new ConditionnalNode(true, -0);
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                condNode = new ConditionnalNode(true, -1);
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                condNode = new ConditionnalNode(true, -4);
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                condNode = new ConditionnalNode(true, -Infinity);
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                condNode = new ConditionnalNode(true, 'abc');
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                done();
            });
        });

        describe('#configure', function () {
            it('should be defined', function (done) {
                var condNode = new ConditionnalNode();
                expect(condNode.configure).toBeDefined();
                expect(condNode.configure).toBeFunction();
                done();
            });

            it('should do the good things with dirty values', function (done) {
                var condNode = new ConditionnalNode();
                expect(condNode.configure()).not.toBeDefined();
                expect(condNode.condition).toBeDefined();
                expect(condNode.condition).toBeFunction();
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                expect(condNode.configure(null)).not.toBeDefined();
                expect(condNode.condition).toBeDefined();
                expect(condNode.condition).toBeFunction();
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                expect(condNode.configure(NaN)).not.toBeDefined();
                expect(condNode.condition).toBeDefined();
                expect(condNode.condition).toBeFunction();
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                expect(condNode.configure(true)).not.toBeDefined();
                expect(condNode.condition).toBeDefined();
                expect(condNode.condition).toBeFunction();
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                expect(condNode.configure(false)).not.toBeDefined();
                expect(condNode.condition).toBeDefined();
                expect(condNode.condition).toBeFunction();
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                expect(condNode.configure(0)).not.toBeDefined();
                expect(condNode.condition).toBeDefined();
                expect(condNode.condition).toBeFunction();
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                expect(condNode.configure(1)).not.toBeDefined();
                expect(condNode.condition).toBeDefined();
                expect(condNode.condition).toBeFunction();
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                expect(condNode.configure(4)).not.toBeDefined();
                expect(condNode.condition).toBeDefined();
                expect(condNode.condition).toBeFunction();
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                expect(condNode.configure(Infinity)).not.toBeDefined();
                expect(condNode.condition).toBeDefined();
                expect(condNode.condition).toBeFunction();
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                expect(condNode.configure(-0)).not.toBeDefined();
                expect(condNode.condition).toBeDefined();
                expect(condNode.condition).toBeFunction();
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                expect(condNode.configure(-1)).not.toBeDefined();
                expect(condNode.condition).toBeDefined();
                expect(condNode.condition).toBeFunction();
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                expect(condNode.configure(-4)).not.toBeDefined();
                expect(condNode.condition).toBeDefined();
                expect(condNode.condition).toBeFunction();
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                expect(condNode.configure(-Infinity)).not.toBeDefined();
                expect(condNode.condition).toBeDefined();
                expect(condNode.condition).toBeFunction();
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                expect(condNode.configure('a')).not.toBeDefined();
                expect(condNode.condition).toBeDefined();
                expect(condNode.condition).toBeFunction();
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                expect(condNode.configure({})).not.toBeDefined();
                expect(condNode.condition).toBeDefined();
                expect(condNode.condition).toBeFunction();
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                done();
            });

            it('should do the good things with good condition', function (done) {
                var condNode = new ConditionnalNode();
                expect(condNode.configure({
                    condition: true
                })).not.toBeDefined();
                expect(condNode.condition).toBeBoolean();
                expect(condNode.condition).toBeTruthy();
                expect(condNode.configure({
                    condition: false
                })).not.toBeDefined();
                expect(condNode.condition).toBeBoolean();
                expect(condNode.condition).toBeFalsy();
                expect(condNode.configure({
                    condition: 0
                })).not.toBeDefined();
                expect(condNode.condition).toBeNumber();
                expect(condNode.condition).toBe(0);
                expect(condNode.configure({
                    condition: 1
                })).not.toBeDefined();
                expect(condNode.condition).toBeNumber();
                expect(condNode.condition).toBe(1);
                expect(condNode.configure({
                    condition: 4
                })).not.toBeDefined();
                expect(condNode.condition).toBeNumber();
                expect(condNode.condition).toBe(4);
                expect(condNode.configure({
                    condition: Infinity
                })).not.toBeDefined();
                expect(condNode.condition).toBeNumber();
                expect(condNode.condition).toBe(Infinity);
                expect(condNode.configure({
                    condition: -0
                })).not.toBeDefined();
                expect(condNode.condition).toBeNumber();
                expect(condNode.condition).toBe(-0);
                expect(condNode.configure({
                    condition: -1
                })).not.toBeDefined();
                expect(condNode.condition).toBeNumber();
                expect(condNode.condition).toBe(-1);
                expect(condNode.configure({
                    condition: -4
                })).not.toBeDefined();
                expect(condNode.condition).toBeNumber();
                expect(condNode.condition).toBe(-4);
                expect(condNode.configure({
                    condition: -Infinity
                })).not.toBeDefined();
                expect(condNode.condition).toBeNumber();
                expect(condNode.condition).toBe(-Infinity);
                expect(condNode.configure({
                    condition: NaN
                })).not.toBeDefined();
                expect(condNode.condition).toBeNaN();
                done();
            });

            it('should do the good things with dirty failCallback', function (done) {
                var condNode = new ConditionnalNode();
                expect(condNode.configure({
                    failCallback: true
                })).not.toBeDefined();
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                expect(condNode.configure({
                    failCallback: false
                })).not.toBeDefined();
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                expect(condNode.configure({
                    failCallback: 0
                })).not.toBeDefined();
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                expect(condNode.configure({
                    failCallback: 1
                })).not.toBeDefined();
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                expect(condNode.configure({
                    failCallback: 4
                })).not.toBeDefined();
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                expect(condNode.configure({
                    failCallback: Infinity
                })).not.toBeDefined();
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                expect(condNode.configure({
                    failCallback: -0
                })).not.toBeDefined();
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                expect(condNode.configure({
                    failCallback: -1
                })).not.toBeDefined();
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                expect(condNode.configure({
                    failCallback: -4
                })).not.toBeDefined();
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                expect(condNode.configure({
                    failCallback: -Infinity
                })).not.toBeDefined();
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                expect(condNode.configure({
                    failCallback: NaN
                })).not.toBeDefined();
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                done();
            });

            it('should do the good things with good failCallback', function (done) {
                var condNode = new ConditionnalNode();
                expect(condNode.configure({
                    failCallback: function () {
                    }
                })).not.toBeDefined();
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                expect(condNode.configure({
                    failCallback: function () {
                        return 'TOTO';
                    }
                })).not.toBeDefined();
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                expect(condNode.failCallback()).toBeString();
                expect(condNode.failCallback()).toBe('TOTO');
                done();
            });
        });

        describe('#failCallback', function () {
            it('should be defined', function (done) {
                var condNode = new ConditionnalNode();
                expect(condNode.failCallback).toBeDefined();
                expect(condNode.failCallback).toBeFunction();
                done();
            });
        });

        describe('#canRun', function () {
            it('should be defined', function (done) {
                var condNode = new ConditionnalNode();
                expect(condNode.canRun).toBeFunction();
                done();
            });

            it('will return false for a failing condition', function (done) {
                var condNode = new ConditionnalNode();

                condNode.configure({
                    condition: false
                });
                expect(condNode.canRun()).toBeDefined();
                expect(condNode.canRun()).toBeBoolean();
                expect(condNode.canRun()).toBeFalsy();
                condNode.configure({
                    condition: function () {
                        return false;
                    }
                });
                expect(condNode.canRun()).toBeDefined();
                expect(condNode.canRun()).toBeBoolean();
                expect(condNode.canRun()).toBeFalsy();
                done();
            });

            it('will return true for a success condition', function (done) {
                var condNode = new ConditionnalNode();

                condNode.configure({
                    condition: true
                });
                expect(condNode.canRun()).toBeDefined();
                expect(condNode.canRun()).toBeBoolean();
                expect(condNode.canRun()).toBeTruthy();
                condNode.configure({
                    condition: function () {
                        return true;
                    }
                });
                expect(condNode.canRun()).toBeDefined();
                expect(condNode.canRun()).toBeBoolean();
                expect(condNode.canRun()).toBeTruthy();
                done();
            });
        });

        describe('#run', function () {
            it('should be defined', function (done) {
                var condNode = new ConditionnalNode();
                expect(condNode.run).toBeFunction();
                done();
            });

            it('should not run', function (done) {
                var condNode = new ConditionnalNode();
                expect(condNode.run()).not.toBeDefined();
                done();
            });
        });
    });
});