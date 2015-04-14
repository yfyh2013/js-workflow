class Workflow {
    constructor(data) {
        this.data = data;
        this.nodes = [];
    }

    addOutNode(node) {
        this.nodes.push(node);
    }

    toString() {
        return 'data :' + JSON.stringify(this.data);
    }

    run() {
        for (let n in this.nodes) {
            this.nodes[n].run(this.data);
        }
    }
}

class Node {
    constructor() {
        this.nodes = [];
        this.finished = false;
    }

    addOutNode(node) {
        this.nodes.push(node);
    }

    isFinished() {
        return this.finished;
    }

    setFinished() {
        this.finished = true;
    }

    canRun() {
        return true;
    }

    run(data) {
        this.data = data;
        for (let n in this.nodes) {
            if (!this.nodes[n].isFinished() && this.nodes[n].canRun(data)) {
                this.nodes[n].run(this.data);
            }
        }
    }
}
class ConsoleNode extends Node {
    constructor(message) {
        super();
        this.message = message;
    }

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
class ConditionnalNode extends Node {
    constructor(condition) {
        super();
        this.condition = condition;
    }

    canRun(data) {
        var retour;

        if ('function' === typeof this.condition) {
            retour = this.condition(data);
        } else {
            retour = this.condition;
        }

        return retour;
    }

    run(data) {
        this.data = data;
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