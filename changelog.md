# Changelog

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