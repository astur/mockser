const test = require('ava');
const m = require('.');

test('mockser', t => {
    t.true(true);
    t.is(m, m);
});
