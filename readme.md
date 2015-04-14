# js-workflow

Modelize a workflow for JavaScript. Server/browser agnostic, ES6 based.

## Usage

After install dependencies with :

`
npm i
`

you can try the workflow by running :

`
./node_modules/babel/bin/babel-node index.js
`

### Why call with babel-node ?

Because js-workflow uses ES6 (aka ES2015, aka Harmony) features which are not supported, for the moment by nodejs, even using the harmony flag.

On browser, you may probably have to transpile using babel to ES5.

## License

MIT