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