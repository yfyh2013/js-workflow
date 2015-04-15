/*globals exports, require */

var Driver = require('./driver').Driver;

class ConsoleDriver extends Driver {
    store(data) {
        if ('object' === typeof data) {
            console.log(JSON.stringify(data));
        } else {
            console.log(data.toString());
        }
    }
}