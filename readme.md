# js-workflow

Modelize a workflow for JavaScript. Server side only. ES6 based.

## Usage

To allowed you to use js-workflow, you will need to load it :

`
npm i -S js-workflow
`

Add it to your code :

```
var Workflow = require('js-workflow').Workflow,
    Node = require('js-workflow').Node,
    ConditionnalNode = require('js-workflow').ConditionnalNode;
```

You can have a look to some examples there : https://github.com/Companeo/js-workflow-examples

## Store data

If you want to save the current state of your worklow, a branch of your workflow, or just debug, you can use the driver features.

js-workflow exposes a StorageNode with Driver and inherited ConsoleDriver. You can code your won, but it has too inherit of Driver.
 
 We will try to offer on Github some of simple drivers like : MongoDriver, PostgreDriver.

## Contribute

Everyone can contribute to js-workflow. You just have to fork this repo, edit code, and make a pull request.

If you don't want to code, you can suggest features, report issues or give your opinion.
 
Thanks for your help !

## License

MIT
