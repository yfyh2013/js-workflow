'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/*globals exports, require */

var Driver = require('./driver').Driver;

var ConsoleDriver = (function (_Driver) {
    function ConsoleDriver() {
        _classCallCheck(this, ConsoleDriver);

        if (_Driver != null) {
            _Driver.apply(this, arguments);
        }
    }

    _inherits(ConsoleDriver, _Driver);

    _createClass(ConsoleDriver, [{
        key: 'store',
        value: function store(data) {
            if ('object' === typeof data) {
                console.log(JSON.stringify(data));
            } else {
                console.log(data.toString());
            }
        }
    }]);

    return ConsoleDriver;
})(Driver);