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
        this.outNodes.push(node);
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

/**
 * Node is the other main thing. Define the master pieces of a node behavior. You should not use it directly but inherit of it.
 */
class Node {
    constructor() {
        this.outNodes = [];
        this.finished = false;
    }

    /**
     * You can add a node here to follow this one. If you want, you can add more than one.
     * Corresponding to a split into parallel execution.
     */
    addOutNode(node) {
        this.outNodes.push(node);
    }

    /**
     * Is this node is finished ? Sometimes is useful. Mainly times to allows future nodes to execute.
     */
    isFinished() {
        return this.finished;
    }

    /**
     * Set as finished
     */
    setFinished() {
        this.finished = true;
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
/**
 * ConsoleNode is useful for debug. It only displays in console the data.
 */
class ConsoleNode extends Node {
    constructor(message) {
        super();
        this.message = message;
    }

    /**
     * Will run. Surprise ;)
     * Again. Again.
     */
    run(data) {
        this.data = data;
        if (undefined !== this.message) {
            console.log(this.message);
        }
        console.log('data :', JSON.stringify(this.data));
        super.setFinished();
        super.run(this.data);
    }
}
/**
 * ConditionnalNode can run only if the condition passed in params is true.
 * Takes an expression or a function, condition needs to be evaluated to boolean true or false only (strict equality, "true" will correspond to false).
 * It is like an XOR split
 */
class ConditionnalNode extends Node {
    constructor(condition) {
        super();
        this.condition = condition;
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
/**
 * SynchronizingNode is the reprenstation of logical operator AND
 */
class SynchronizingNode extends Node {
    constructor() {
        super();
        this.inNodes = [];
    }

    addInNodes(node) {
        this.inNodes.push(node);
    }

    canRun() {
        var retour = true,
            iterateurInNodes = 0,
            inNodesLength = this.inNodes.length;

        while (true === retour && iterateurInNodes < inNodesLength) {
            if (!this.inNodes[iterateurInNodes].isFinished()) {
                retour = false;
            }
            iterateurInNodes += 1;
        }

        return retour;
    }
}
/**
 * SynchronizingNode is the reprenstation of logical operator OR
 */
class MergeNode extends Node {
    constructor() {
        super();
        this.inNodes = [];
    }

    addInNodes(node) {
        this.inNodes.push(node);
    }

    canRun() {
        var retour = true,
            iterateurInNodes = 0,
            inNodesLength = this.inNodes.length;

        while (true === retour && iterateurInNodes < inNodesLength) {
            if (!this.inNodes[iterateurInNodes].isFinished()) {
                retour = false;
            }
            iterateurInNodes += 1;
        }

        return retour;
    }
}

/**
 * Add1Node is a sample. It just
 */
class Add1Node extends Node {
    constructor() {
        super();
    }

    run(data) {
        this.data = +data + 1;
        super.setFinished();
        super.run(this.data);
    }
}

var wf = new Workflow(2),
    consoleNodeA = new ConsoleNode('consoleNodeA'),
    consoleNodeB = new ConsoleNode('consoleNodeB'),
    consoleNodeC = new ConsoleNode('consoleNodeC'),
    consoleNodeD = new ConsoleNode('consoleNodeD'),
    consoleNodeE = new ConsoleNode('consoleNodeE'),
    node1A = new Add1Node(),
    node1B = new Add1Node(),
    cond1 = new ConditionnalNode(function (data) {
        console.log('cond1', data, (2 !== data));
        return (2 !== data);
    }),
    cond2 = new ConditionnalNode(function (data) {
        console.log('cond2', data, (3 !== data));
        return (3 !== data);
    });

wf.addOutNode(consoleNodeA);
consoleNodeA.addOutNode(node1A);
consoleNodeA.addOutNode(node1B);
node1A.addOutNode(consoleNodeB);
node1B.addOutNode(consoleNodeC);
consoleNodeB.addOutNode(cond1);
cond1.addOutNode(consoleNodeD);
consoleNodeC.addOutNode(cond2);
cond2.addOutNode(consoleNodeE);
wf.run();