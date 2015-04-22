'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/*globals exports, require */

var Node = require('./node').Node;

/**
 * MergeNode is the representation of logical operator OR
 */

var MergeNode = (function (_Node) {
    function MergeNode() {
        _classCallCheck(this, MergeNode);

        _get(Object.getPrototypeOf(MergeNode.prototype), 'constructor', this).call(this);
        this.inNodes = [];
    }

    _inherits(MergeNode, _Node);

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