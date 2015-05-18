/*globals exports */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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