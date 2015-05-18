/*globals exports */

/**
 * Workflow is a main part of js-workflow. You need to use it as starter point.
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Workflow = (function () {
    function Workflow(data) {
        _classCallCheck(this, Workflow);

        this.data = data;
        this.outNodes = [];
    }

    _createClass(Workflow, [{
        key: 'addOutNode',

        /**
         * Not like a lot of workflow frameworks in various languages, you can start a lot of things from the starting point.
         * js-workflow allows you to add many node directly at the start and not after a first useless node.
         * Corresponding to a split into parallel execution
         */
        value: function addOutNode(node) {
            this.outNodes.push(node);
        }
    }, {
        key: 'toString',

        /**
         * Classical toString method
         */
        value: function toString() {
            return 'data :' + JSON.stringify(this.data);
        }
    }, {
        key: 'run',

        /**
         * Will run. Surprise ;)
         */
        value: function run() {
            for (var n in this.outNodes) {
                this.outNodes[n].run(this.data);
            }
        }
    }]);

    return Workflow;
})();

exports.Workflow = Workflow;