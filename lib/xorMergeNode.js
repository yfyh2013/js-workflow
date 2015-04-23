'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/*globals exports, require */

var Node = require('./node').Node;

/**
 * XorMergeNode is the representation of logical operator XOR
 * failCallback parameter function is optional. It receives, in this order : err, the problem which happened, data, data passed to the node
 */

var XorMergeNode = (function (_Node) {
    function XorMergeNode(failCallback) {
        _classCallCheck(this, XorMergeNode);

        _get(Object.getPrototypeOf(XorMergeNode.prototype), 'constructor', this).call(this);
        this.inNodes = [];
        this.failCallback = failCallback;
    }

    _inherits(XorMergeNode, _Node);

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
                if ('function' === typeof this.failCallback) {
                    this.failCallback(eX, data);
                }
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