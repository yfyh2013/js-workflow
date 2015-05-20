/*globals exports, require */

var Node = require('./node').Node;

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
            if ('function' === typeof this.failCallback) {
                this.failCallback(eX, data);
            }
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