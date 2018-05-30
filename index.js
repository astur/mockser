const promisify = require('util').promisify;
const http = require('http');
const https = require('https');

module.exports = (options = null) => {
    const s = options ?
        https.createServer(options, (request, response) => {
            s.emit(request.url, request, response);
        }) :
        http.createServer((request, response) => {
            s.emit(request.url, request, response);
        });

    s.listen = promisify(s.listen);
    s.close = promisify(s.close);

    return s;
};
