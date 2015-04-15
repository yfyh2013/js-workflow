'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/*globals exports, require */

var Node = require('./node').Node;

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
        this.condition = condition;
        this.failCallback = failCallback;
    }

    _inherits(ConditionnalNode, _Node);

    _createClass(ConditionnalNode, [{
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
                if ('function' === typeof this.failCallback) {
                    this.failCallback(null, data);
                }
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