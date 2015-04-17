/*globals exports, require */

var Node = require('./node').Node;

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
}

exports.MergeNode = MergeNode;