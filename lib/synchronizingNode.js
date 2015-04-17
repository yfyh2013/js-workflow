'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/*globals exports, require */

var Node = require('./node').Node;

/**
 * SynchronizingNode is the representation of logical operator AND
 */

var SynchronizingNode = (function (_Node) {
    function SynchronizingNode() {
        _classCallCheck(this, SynchronizingNode);

        _get(Object.getPrototypeOf(SynchronizingNode.prototype), 'constructor', this).call(this);
        this.inNodes = [];
    }

    _inherits(SynchronizingNode, _Node);

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
    }]);

    return SynchronizingNode;
})(Node);

exports.SynchronizingNode = SynchronizingNode;