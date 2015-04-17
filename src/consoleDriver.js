/*globals exports, require */

var Driver = require('./driver.js').Driver;

class ConsoleDriver extends Driver {
    constructor() {
        super();
    }

    store(data) {
        if ('object' === typeof data) {
            console.log(JSON.stringify(data));
        } else {
            console.log(data.toString());
        }
    }
}

exports.ConsoleDriver = ConsoleDriver;