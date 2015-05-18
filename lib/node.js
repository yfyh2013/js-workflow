/*globals exports */

/**
 * Node is the other main thing. Define the master pieces of a node behavior. You should not use it directly but inherit of it.
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Node = (function () {
    function Node() {
        _classCallCheck(this, Node);

        this.outNodes = [];
        this.finished = false;
        this.failed = false;
    }

    _createClass(Node, [{
        key: 'configure',

        /**
         * Enable post-init configuration
         */
        value: function configure() {}
    }, {
        key: 'addOutNode',

        /**
         * You can add a node here to follow this one. If you want, you can add more than one.
         * Corresponding to a split into parallel execution.
         */
        value: function addOutNode(node) {

            if (node instanceof Node) {
                this.outNodes.push(node);
            } else {
                throw new Error('Not a node instance.');
            }
        }
    }, {
        key: 'isFinished',

        /**
         * Is this node is finished ? Sometimes is useful. Mainly times to allows future nodes to be executed.
         */
        value: function isFinished() {
            return this.finished;
        }
    }, {
        key: 'hasFailed',

        /**
         * Is this node has failed ? Sometimes is useful. Mainly times to disallow future nodes to be executed.
         */
        value: function hasFailed() {
            return this.failed;
        }
    }, {
        key: 'setFinished',

        /**
         * Set as finished
         */
        value: function setFinished() {
            if (false === this.hasFailed()) {
                this.finished = true;
            }
        }
    }, {
        key: 'fail',

        /**
         * Set as failed
         */
        value: function fail() {
            if (false === this.isFinished()) {
                this.failed = true;
            }
        }
    }, {
        key: 'canRun',

        /**
         * Can I run ? For me, it's always true. That's why you should not use me but an inherited class that controls my state correctly.
         */
        value: function canRun() {
            return true;
        }
    }, {
        key: 'run',

        /**
         * Will run. Surprise ;)
         * Again.
         */
        value: function run(data) {
            this.data = data;
            for (var currentNode in this.outNodes) {
                if (!this.outNodes[currentNode].isFinished() && this.outNodes[currentNode].canRun(data)) {
                    this.outNodes[currentNode].run(this.data);
                }
            }
        }
    }]);

    return Node;
})();

exports.Node = Node;