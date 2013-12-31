var marr = require('../').extendPrototypes();
var tests = module.exports;

tests.objectMatches = function(test) {
	test.strictEqual({ }.matches({ }), true);
	test.strictEqual({ hello: 1 }.matches({ hello: 1 }), true);
	test.strictEqual({ hello: 1 }.matches({ hello: { $ne: 3 } }), true);
	test.strictEqual({ hello: 3 }.matches({ hello: { $ne: 3 } }), false);
	test.strictEqual({ hello: 1 }.matches({ goodbye: 1 }), false);
	test.done();
};

tests.stringMatches = function(test) {
	test.strictEqual(''.matches(''), true);
	test.strictEqual(''.matches({ $eq: '' }), true);
	test.strictEqual(''.matches({ $ne: '' }), false);
	test.strictEqual('1234'.matches(1234), false);
	test.strictEqual('1234'.matches('1234'), true);
	test.strictEqual('1234'.matches([ '1234' ]), false);
	test.strictEqual('1234'.matches({ $in: [ '4321', '1234' ] }), true);
	test.done();
};

//!nb: All other tests covered by find(). These are just here to test the
//!nb: basics of matching on arbitrary values after prototype extension.
