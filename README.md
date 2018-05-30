# mockser

Server to test http clients

[![Build Status][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]

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