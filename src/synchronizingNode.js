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