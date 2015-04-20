/*globals exports */

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
        for (let n in this.outNodes) {
            if (!this.outNodes[n].isFinished() && this.outNodes[n].canRun(data)) {
                this.outNodes[n].run(this.data);
            }
        }
    }
}

exports.Node = Node;