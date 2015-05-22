/**
 * Node is the other main thing. Define the master pieces of a node behavior. You should not use it directly but inherit of it.
 */
'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

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
                if (this.outNodes[currentNode].canRun(this.data)) {
                    this.outNodes[currentNode].run(this.data);
                }
            }
        }
    }]);

    return Node;
})();

exports.Node = Node;
/*globals exports */

/**
 * Workflow is a main part of js-workflow. You need to use it as starter point.
 */

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
            if (node instanceof Node) {
                this.outNodes.push(node);
            } else {
                throw new Error('Not a node instance.');
            }
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

var Driver = (function () {
    function Driver() {
        _classCallCheck(this, Driver);
    }

    _createClass(Driver, [{
        key: 'store',
        value: function store() {
            throw new Error('Don\'t use the class Driver directly please.');
        }
    }]);

    return Driver;
})();

exports.Driver = Driver;

var ConsoleDriver = (function (_Driver) {
    function ConsoleDriver() {
        _classCallCheck(this, ConsoleDriver);

        _get(Object.getPrototypeOf(ConsoleDriver.prototype), 'constructor', this).call(this);
    }

    _inherits(ConsoleDriver, _Driver);

    _createClass(ConsoleDriver, [{
        key: 'store',
        value: function store(data) {
            if ('object' === typeof data) {
                console.log(JSON.stringify(data));
            } else {
                if (undefined !== data && undefined !== data.toString) {
                    console.log(data.toString());
                } else {
                    console.log(data);
                }
            }
        }
    }]);

    return ConsoleDriver;
})(Driver);

exports.ConsoleDriver = ConsoleDriver;
/**
 * ConditionnalNode can run only if the condition passed in params is true.
 * It is like an XOR split
 * Takes an expression or a function, condition needs to be evaluated to boolean true or false only (strict equality, "true" will correspond to false).
 * failCallback parameter function is optional. It receives, in this order : err, the problem which happened, data, data passed to the node.
 * failCallback will only be called if the condition returns false.
 */

var ConditionnalNode = (function (_Node) {
    function ConditionnalNode(condition, failCallback) {
        _classCallCheck(this, ConditionnalNode);

        _get(Object.getPrototypeOf(ConditionnalNode.prototype), 'constructor', this).call(this);

        this.condition = undefined !== condition ? condition : function () {};
        this.failCallback = 'function' === typeof failCallback ? failCallback : function () {};
    }

    _inherits(ConditionnalNode, _Node);

    _createClass(ConditionnalNode, [{
        key: 'configure',

        /**
         * Enable post-init configuration
         */
        value: function configure(options) {
            if ('object' === typeof options && null !== options) {
                if ('condition' in options) {
                    this.condition = options.condition;
                }
                if ('failCallback' in options && 'function' === typeof options.failCallback) {
                    this.failCallback = options.failCallback;
                }
            }
        }
    }, {
        key: 'canRun',

        /**
         * is the condition allowed me to run ?
         */
        value: function canRun(data) {
            var retour;

            if ('function' === typeof this.condition) {
                retour = this.condition(data);
            } else {
                retour = this.condition;
            }
            if (false === retour) {
                this.fail();
                this.failCallback(null, data);
            }

            return retour;
        }
    }, {
        key: 'run',

        /**
         * Read the super.run comment
         */
        value: function run(data) {
            this.data = data;
            _get(Object.getPrototypeOf(ConditionnalNode.prototype), 'setFinished', this).call(this);
            _get(Object.getPrototypeOf(ConditionnalNode.prototype), 'run', this).call(this, this.data);
        }
    }]);

    return ConditionnalNode;
})(Node);

exports.ConditionnalNode = ConditionnalNode;
/**
 * SynchronizingNode is the representation of logical operator AND
 */

var SynchronizingNode = (function (_Node2) {
    function SynchronizingNode() {
        _classCallCheck(this, SynchronizingNode);

        _get(Object.getPrototypeOf(SynchronizingNode.prototype), 'constructor', this).call(this);
        this.inNodes = [];
    }

    _inherits(SynchronizingNode, _Node2);

    _createClass(SynchronizingNode, [{
        key: 'addInNodes',
        value: function addInNodes(node) {
            if (node instanceof Node) {
                this.inNodes.push(node);
            } else {
                throw new Error('Not a node instance.');
            }
        }
    }, {
        key: 'canRun',
        value: function canRun() {
            var retour = true,
                iterateurInNodes = 0,
                inNodesLength = this.inNodes.length;

            while (true === retour && iterateurInNodes < inNodesLength) {
                if (!this.inNodes[iterateurInNodes].isFinished()) {
                    retour = false;
                }
                iterateurInNodes += 1;
            }

            return retour;
        }
    }, {
        key: 'run',
        value: function run(data) {
            this.data = data;
            _get(Object.getPrototypeOf(SynchronizingNode.prototype), 'setFinished', this).call(this);
            _get(Object.getPrototypeOf(SynchronizingNode.prototype), 'run', this).call(this, this.data);
        }
    }]);

    return SynchronizingNode;
})(Node);

exports.SynchronizingNode = SynchronizingNode;
/**
 * MergeNode is the representation of logical operator OR
 */

var MergeNode = (function (_Node3) {
    function MergeNode() {
        _classCallCheck(this, MergeNode);

        _get(Object.getPrototypeOf(MergeNode.prototype), 'constructor', this).call(this);
        this.inNodes = [];
    }

    _inherits(MergeNode, _Node3);

    _createClass(MergeNode, [{
        key: 'addInNodes',
        value: function addInNodes(node) {
            if (node instanceof Node) {
                this.inNodes.push(node);
            } else {
                throw new Error('Not a node instance.');
            }
        }
    }, {
        key: 'canRun',
        value: function canRun() {
            var retour = false,
                iterateurInNodes = 0,
                inNodesLength = this.inNodes.length;

            while (false === retour && iterateurInNodes < inNodesLength) {
                if (this.inNodes[iterateurInNodes].isFinished()) {
                    retour = true;
                }
                iterateurInNodes += 1;
            }

            return retour;
        }
    }, {
        key: 'run',
        value: function run(data) {
            this.data = data;
            _get(Object.getPrototypeOf(MergeNode.prototype), 'setFinished', this).call(this);
            _get(Object.getPrototypeOf(MergeNode.prototype), 'run', this).call(this, this.data);
        }
    }]);

    return MergeNode;
})(Node);

exports.MergeNode = MergeNode;
/**
 * XorMergeNode is the representation of logical operator XOR
 * failCallback parameter function is optional. It receives, in this order : err, the problem which happened, data, data passed to the node
 */

var XorMergeNode = (function (_Node4) {
    function XorMergeNode(failCallback) {
        _classCallCheck(this, XorMergeNode);

        _get(Object.getPrototypeOf(XorMergeNode.prototype), 'constructor', this).call(this);
        this.inNodes = [];
        this.failCallback = 'function' === typeof failCallback ? failCallback : function () {};
    }

    _inherits(XorMergeNode, _Node4);

    _createClass(XorMergeNode, [{
        key: 'addInNodes',
        value: function addInNodes(node) {
            if (node instanceof Node) {
                this.inNodes.push(node);
            } else {
                throw new Error('Not a node instance.');
            }
        }
    }, {
        key: 'canRun',
        value: function canRun(data) {
            var retour = false,
                iterateurInNodes = 0,
                inNodesLength = this.inNodes.length;

            // If all input nodes are not terminated (success or fail), the canRun will deliver false.
            // If only one has terminated with success and the rest are in fail status, canRun will return true.
            // If more than one input node has terminated with success, canRun will return false and call its failCallback.
            try {
                while (iterateurInNodes < inNodesLength) {
                    if (this.inNodes[iterateurInNodes].isFinished()) {
                        if (true === retour) {
                            throw 'XOR_EXCEPTION : more than one are finished';
                        }
                        retour = true;
                    }
                    iterateurInNodes += 1;
                }
            } catch (eX) {
                this.failCallback(eX, data);
                retour = false;
            }

            return retour;
        }
    }, {
        key: 'run',
        value: function run(data) {
            this.data = data;
            _get(Object.getPrototypeOf(XorMergeNode.prototype), 'setFinished', this).call(this);
            _get(Object.getPrototypeOf(XorMergeNode.prototype), 'run', this).call(this, this.data);
        }
    }]);

    return XorMergeNode;
})(Node);

exports.XorMergeNode = XorMergeNode;
/**
 * StorageNode will only store the state of data passed to it.
 *
 * Driver mandatory param should be an object inherited from Driver.
 * If not will throw an exception
 *
 * You can have one or more drivers per StorageNode, each one has its own.
 */

var StorageNode = (function (_Node5) {
    function StorageNode(driver) {
        _classCallCheck(this, StorageNode);

        _get(Object.getPrototypeOf(StorageNode.prototype), 'constructor', this).call(this);
        this.drivers = [];
        if (driver instanceof Driver) {
            this.drivers.push(driver);
        } else {
            throw driver.toString() + 'is not a driver instance.';
        }
    }

    _inherits(StorageNode, _Node5);

    _createClass(StorageNode, [{
        key: 'addDriver',

        /**
         * Add driver for storage.
         * Driver param should be an object inherited from Driver.
         * If not will throw an exception
         */
        value: function addDriver(driver) {
            if (driver instanceof Driver) {
                this.drivers.push(driver);
            } else {
                throw driver.toString() + 'is not a driver instance.';
            }
        }
    }, {
        key: 'run',

        /**
         * Read the super.run comment
         */
        value: function run(data) {
            var iterateurDrivers = 0,
                driversLength = this.drivers.length;

            this.data = data;

            for (iterateurDrivers; driversLength > iterateurDrivers; iterateurDrivers += 1) {
                if (this.drivers.hasOwnProperty(iterateurDrivers)) {
                    this.drivers[iterateurDrivers].store(this.data);
                }
            }

            _get(Object.getPrototypeOf(StorageNode.prototype), 'setFinished', this).call(this);
            _get(Object.getPrototypeOf(StorageNode.prototype), 'run', this).call(this, this.data);
        }
    }]);

    return StorageNode;
})(Node);

exports.StorageNode = StorageNode;