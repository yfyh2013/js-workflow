# Changelog

## Version 1.2.4

Lint sources.
Add build of 1.2.3 release. Will work much better with this.

## Version 1.2.3

Introducing configure method to ConditionnalNode, enabling post-init configuration.

## Version 1.2.2

Introducing more unit tests with Jasmine (Node, Workflow, Driver classes).

Plus some safety errors throwed :
- Node.addOutNode will throw an exception when a non-node thing is passed in argument.
- SynchronizingMergeNode.addInNode will throw an exception when a non-node thing is passed in argument.
- MergeNode.addInNode will throw an exception when a non-node thing is passed in argument.
- XorMergeNode.addInNode will throw an exception when a non-node thing is passed in argument.

## Version 1.2.1

Introducing more unit tests with Jasmine

Fix a critical bug in defining Driver main class, which disallow its usage.

## Version 1.2

Introducing :
- Unit tests with Jasmine
- Driver storage features (with ConsoleDriver and the StorageNode)

## Version 1.1.6

Fix the undefined xorMerge error

## Version 1.1.5

Build process. Allows to develop this framework in ES6 and converts it into an ES5 compatible package.

## Version 1.1.4

Transpiled ES6 files to ES5.

## Version 1.1.3

Failed npm push, sorry for this useless version.

## Version 1.1.2

Put dev dependencies in devDependencies

## Version 1.1.1

Introducing correct usage via npm and require method.

## Version 1.1

Introducing some missing things to 1.0 :
- XorMergeNode, this node accepts only one input node with a success status. 0 or more than one will put this node's status in "failed". 
- failure callback for ConditionnalNode and XorMergeNode, this kind of callback only run when the node fails.

## Version 1.0

Introducing the main Workflow classes :
- Workflow
- Node
- ConditionnalNode
- SynchronizingNode
- MergeNode