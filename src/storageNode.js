/*globals exports, require, Driver */

var Node = require('./node').Node,
    Driver = require('./../lib/driver').Driver;

/**
 * StorageNode will only store the state of data passed to it.
 *
 * Driver mandatory param should be an object inherited from Driver.
 * If not will throw an exception
 *
 * You can have one or more drivers per StorageNode, each one has its own.
 */
class StorageNode extends Node {
    constructor(driver) {
        super();
        this.drivers = [];
        if (driver instanceof Driver) {
            this.drivers.push(driver);
        } else {
            throw driver.toString() + 'is not a driver instance.';
        }
    }

    /**
     * Add driver for storage.
     * Driver param should be an object inherited from Driver.
     * If not will throw an exception
     */
        addDriver(driver) {
        if (driver instanceof Driver) {
            this.drivers.push(driver);
        } else {
            throw driver.toString() + 'is not a driver instance.';
        }
    }

    /**
     * Read the super.run comment
     */
        run(data) {
        var iterateurDrivers = 0,
            driversLength = this.drivers.length;

        this.data = data;

        for (iterateurDrivers; driversLength > iterateurDrivers; iterateurDrivers += 1) {
            if (this.drivers.hasOwnProperty(iterateurDrivers)) {
                this.drivers[iterateurDrivers].store(this.data);
            }
        }

        super.setFinished();
        super.run(this.data);
    }
}

exports.StorageNode = StorageNode;