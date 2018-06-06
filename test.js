const got = require('got');
const pem = require('pem');
const promisify = require('util').promisify;
const test = require('ava');
const m = require('.');

const createCertificate = promisify(pem.createCertificate);
const httpUrl = 'http://localhost:1703';
const httpsUrl = 'https://localhost:1147';
let s;
let ss;

test.before('setup', async () => {
    // HTTP
    s = m();
    s.on('/', (req, res) => {
        res.end('ok');
    });
    await s.listen(1703);

    // HTTPS
    const {serviceKey: key, certificate: cert} = await createCertificate({days: 1, selfSigned: true});
    ss = m({key, cert});
    ss.on('/', (req, res) => {
        res.end('ok');
    });
    await ss.listen(1147);

    // enable self signed certificates
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
});

test('main', async t => {
    // HTTP
    const p = got(httpUrl);
    await t.notThrows(p);
    const response = await p;
    t.is(response.statusCode, 200);
    t.is(response.body, 'ok');

    // HTTPS
    const ps = got(httpsUrl);
    await t.notThrows(ps);
    const responseS = await ps;
    t.is(responseS.statusCode, 200);
    t.is(responseS.body, 'ok');
});

test.after('cleanup', async () => {
    // HTTP
    await s.close();

    // HTTPS
    await ss.close();
});
