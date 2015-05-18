/*globals exports, require */

var Node = require('./node').Node;

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
        this.condition = condition || function () {};
        this.failCallback = failCallback || function () {};
    }

    /**
     * Enable post-init configuration
     */
        configure(options) {
        if ('condition' in options) {
            this.condition = options.condition;
        }
        if ('failCallback' in options) {
            this.failCallback = options.failCallback;
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
            if ('function' === typeof this.failCallback) {
                this.failCallback(null, data);
            }
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