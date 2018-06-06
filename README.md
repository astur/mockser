# mockser

Server to test http clients. Actually it is old good core [http/https].createServer with few improvements.

[![Build Status][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]

## Why?

Because we need something to test our http-clients, scrapers, bots and so on. On the moment there are three solutions:

* some people make requests to online endpoints like [httpbin](http://httpbin.org). So they need to be online when testing.
* others use so complicated things as [nock](https://github.com/node-nock/nock) with all their pluses and minuses (numerous and well-documented).
* and in most real cases people write their own http-servers (right in test code or in 'helpers'). Such servers are not properly tested or documented so work with tests became too hard.

This server is easy, handy, tested and don't need more documentation. And it is open to your issues if you need something more.

## Features

* `listen` and `close` methods are promisified, so you can just `await` them in before-all and after-all sections of tests respectively.
* on every response server emits event named same as responsed path, so just write handlers for routs.
* by default `mocker` creates 'http' server but you may call it with options object and create `https` server, for example with `{key, cert}` pair of your choice.
* nothing more. Yes, it's so easy.

## Install

```bash
npm i mockser
```

## Usage

```js
const mocker = require('mocker');

// Creating server
const server = mocker();
// or
// const sslServer = mocker({key, cert});

// Routing (treat it as usual callback for 'request' event but routed to specific path)
server.on('/test', (req, res) => {
    res.end('ok');
});
server.on('/404', (req, res) => {
    res.statusCode = 404;
    res.end('Not Found');
});

// Let it be top-level-await REPL here or do the same inside async function

// Start server
await server.listen(3000);

// Testing
const goodResponse = await httpClient('http://localhost:3000/test'); // 200 - ok
const badResponse = await httpClient('http://localhost:3000/404'); // 404 - Not Found

// Cleanup
await server.close();

```

_See working example in test_

## License

MIT

[npm-url]: https://npmjs.org/package/mockser
[npm-image]: https://badge.fury.io/js/mockser.svg
[travis-url]: https://travis-ci.org/astur/mockser
[travis-image]: https://travis-ci.org/astur/mockser.svg?branch=master