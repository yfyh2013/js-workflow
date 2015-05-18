/*globals exports, require, Driver */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Node = require('./node').Node;

/**
 * StorageNode will only store the state of data passed to it.
 *
 * Driver mandatory param should be an object inherited from Driver.
 * If not will throw an exception
 *
 * You can have one or more drivers per StorageNode, each one has its own.
 */

var StorageNode = (function (_Node) {
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

    _inherits(StorageNode, _Node);

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