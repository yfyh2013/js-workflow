/**
 * Node is the other main thing. Define the master pieces of a node behavior. You should not use it directly but inherit of it.
 */
class Node {
    constructor() {
        this.outNodes = [];
        this.finished = false;
        this.failed = false;
    }

    /**
     * Enable post-init configuration
     */
        configure() {
    }

    /**
     * You can add a node here to follow this one. If you want, you can add more than one.
     * Corresponding to a split into parallel execution.
     */
        addOutNode(node) {

        if (node instanceof Node) {
            this.outNodes.push(node);
        } else {
            throw new Error('Not a node instance.');
        }
    }

    /**
     * Is this node is finished ? Sometimes is useful. Mainly times to allows future nodes to be executed.
     */
        isFinished() {
        return this.finished;
    }

    /**
     * Is this node has failed ? Sometimes is useful. Mainly times to disallow future nodes to be executed.
     */
        hasFailed() {
        return this.failed;
    }

    /**
     * Set as finished
     */
        setFinished() {
        if (false === this.hasFailed()) {
            this.finished = true;
        }
    }

    /**
     * Set as failed
     */
        fail() {
        if (false === this.isFinished()) {
            this.failed = true;
        }
    }

    /**
     * Can I run ? For me, it's always true. That's why you should not use me but an inherited class that controls my state correctly.
     */
        canRun() {
        return true;
    }

    /**
     * Will run. Surprise ;)
     * Again.
     */
        run(data) {
        this.data = data;
        for (let currentNode in this.outNodes) {
            if (this.outNodes[currentNode].canRun(this.data)) {
                this.outNodes[currentNode].run(this.data);
            }
        }
    }
}

exports.Node = Node;
/*globals exports */

/**
 * Workflow is a main part of js-workflow. You need to use it as starter point.
 */
class Workflow {
    constructor(data) {
        this.data = data;
        this.outNodes = [];
    }

    /**
     * Not like a lot of workflow frameworks in various languages, you can start a lot of things from the starting point.
     * js-workflow allows you to add many node directly at the start and not after a first useless node.
     * Corresponding to a split into parallel execution
     */
        addOutNode(node) {
        if (node instanceof Node) {
            this.outNodes.push(node);
        } else {
            throw new Error('Not a node instance.');
        }
    }

    /**
     * Classical toString method
     */
        toString() {
        return 'data :' + JSON.stringify(this.data);
    }

    /**
     * Will run. Surprise ;)
     */
        run() {
        for (let n in this.outNodes) {
            this.outNodes[n].run(this.data);
        }
    }
}

exports.Workflow = Workflow;
class Driver {
    store() {
        throw new Error('Don\'t use the class Driver directly please.');
    }
}

exports.Driver = Driver;
class ConsoleDriver extends Driver {
    constructor() {
        super();
    }

    store(data) {
        if ('object' === typeof data) {
            console.log(JSON.stringify(data));
        } else {
            if (undefined !== data && undefined !== data.toString) {
                console.log(data.toString());
            } else {
                console.log(data);
            }
        }
    }
}

exports.ConsoleDriver = ConsoleDriver;
/**
 * ConditionnalNode can run only if the condition passed in params is true.
 * It is like an XOR split
 * Takes an expression or a function, condition needs to be evaluated to boolean true or false only (strict equality, "true" will correspond to false).
 * failCallback parameter function is optional. It receives, in this order : err, the problem which happened, data, data passed to the node.
 * failCallback will only be called if the condition returns false.
 */
class ConditionnalNode extends Node {
    constructor(condition, failCallback) {
        super();

        this.condition = (undefined !== condition) ? condition : function () {
        };
        this.failCallback = ('function' === typeof failCallback) ? failCallback : function () {
        };
    }

    /**
     * Enable post-init configuration
     */
        configure(options) {
        if ('object' === typeof options && null !== options) {
            if ('condition' in options) {
                this.condition = options.condition;
            }
            if ('failCallback' in options && 'function' === typeof options.failCallback) {
                this.failCallback = options.failCallback;
            }
        }
    }

    /**
     * is the condition allowed me to run ?
     */
        canRun(data) {
        var retour;

        if ('function' === typeof this.condition) {
            retour = this.condition(data);
        } else {
            retour = this.condition;
        }
        if (false === retour) {
            this.fail();
                this.failCallback(null, data);
        }

        return retour;
    }

    /**
     * Read the super.run comment
     */
        run(data) {
        this.data = data;
        super.setFinished();
        super.run(this.data);
    }
}

exports.ConditionnalNode = ConditionnalNode;
/**
 * SynchronizingNode is the representation of logical operator AND
 */
class SynchronizingNode extends Node {
    constructor() {
        super();
        this.inNodes = [];
    }

    addInNodes(node) {
        if (node instanceof Node) {
            this.inNodes.push(node);
        } else {
            throw new Error('Not a node instance.');
        }
    }

    canRun() {
        var retour = true,
            iterateurInNodes = 0,
            inNodesLength = this.inNodes.length;

        try {
            while (true === retour && iterateurInNodes < inNodesLength) {
                if (!this.inNodes[iterateurInNodes].isFinished()) {
                    retour = false;
                }
                iterateurInNodes += 1;
            }
        } catch (eX) {
            retour = false;
        }

        return retour;
    }

    run(data) {
        this.data = data;
        super.setFinished();
        super.run(this.data);
    }
}

exports.SynchronizingNode = SynchronizingNode;
/**
 * MergeNode is the representation of logical operator OR
 */
class MergeNode extends Node {
    constructor() {
        super();
        this.inNodes = [];
    }

    addInNodes(node) {
        if (node instanceof Node) {
            this.inNodes.push(node);
        } else {
            throw new Error('Not a node instance.');
        }
    }

    canRun() {
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

    run(data) {
        this.data = data;
        super.setFinished();
        super.run(this.data);
    }
}

exports.MergeNode = MergeNode;
/**
 * XorMergeNode is the representation of logical operator XOR
 * failCallback parameter function is optional. It receives, in this order : err, the problem which happened, data, data passed to the node
 */
class XorMergeNode extends Node {
    constructor(failCallback) {
        super();
        this.inNodes = [];
        this.failCallback = ('function' === typeof failCallback) ? failCallback : function () {
        };
    }

    addInNodes(node) {
        if (node instanceof Node) {
            this.inNodes.push(node);
        } else {
            throw new Error('Not a node instance.');
        }
    }

    canRun(data) {
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
            this.failCallback(eX, data);
            retour = false;
        }

        return retour;
    }

    run(data) {
        this.data = data;
        super.setFinished();
        super.run(this.data);
    }
}

exports.XorMergeNode = XorMergeNode;
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