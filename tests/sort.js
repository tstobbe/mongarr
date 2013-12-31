var marr = require('../').extendPrototypes();
var tests = module.exports;

tests.originalSort = function(test) {
	var res = [ 3, 1, 2 ].sort();
	test.strictEqual(res.length, 3);
	test.strictEqual(res[0], 1);
	test.strictEqual(res[1], 2);
	test.strictEqual(res[2], 3);
	res = [ 3, 1, 2 ].sort(function(a, b) {
			return a - b;
		});
	test.strictEqual(res.length, 3);
	test.strictEqual(res[0], 1);
	test.strictEqual(res[1], 2);
	test.strictEqual(res[2], 3);
	test.done();
};

var products = [
	{ _id: 1, name: 'Keyboard', type: 'Input', price: 39.49, tags: [ 'input', 'computer' ], asort: [ 32, 1 ], complex: [ { id: 10, tags: 'abcde' }, { id: 15, tags: [ 'hello', 'goodbye' ] } ]  },
	{ _id: 2, name: 'Moniter', type: 'Output', price: 172.63, tags: [ 'display', 'video', 'computer' ], asort: [ 7, 24 ], disabled: true, complex: [ { id: 20 }, { id: 25 } ] },
	{ _id: 3, name: 'Mouse', type: 'Input', price: 15.98, bigInt: 9007199254740991, tags: [ 'input', 'computer',  'accessory' ], asort: [ 5 ], complex: [ { id: 30, tags: [ 'world', 'universe' ] }, { id: 35 } ] }
];

tests.simpleArgSort = function(test) {
	//!non-standard-mongo
	var res = products.slice(0).sort('_id');
	test.strictEqual(res.length, 3);
	test.strictEqual(res[0], products[0]);
	test.strictEqual(res[1], products[1]);
	test.strictEqual(res[2], products[2]);
	//!non-standard-mongo
	res = products.slice(0).sort('_id', 1);
	test.strictEqual(res.length, 3);
	test.strictEqual(res[0], products[0]);
	test.strictEqual(res[1], products[1]);
	test.strictEqual(res[2], products[2]);
	//!non-standard-mongo
	res = products.slice(0).sort('_id', -1);
	test.strictEqual(res.length, 3);
	test.strictEqual(res[0], products[2]);
	test.strictEqual(res[1], products[1]);
	test.strictEqual(res[2], products[0]);
	//!non-standard-mongo
	res = products.slice(0).sort('_id', false);
	test.strictEqual(res.length, 3);
	test.strictEqual(res[0], products[2]);
	test.strictEqual(res[1], products[1]);
	test.strictEqual(res[2], products[0]);
	//!non-standard-mongo
	res = products.slice(0).sort('_id', true);
	test.strictEqual(res.length, 3);
	test.strictEqual(res[0], products[0]);
	test.strictEqual(res[1], products[1]);
	test.strictEqual(res[2], products[2]);
	res = products.slice(0).sort('_id', function(a, b) {
			return -(a[0] - b[0]);
		});
	//!non-standard-mongo
	test.strictEqual(res.length, 3);
	test.strictEqual(res[0], products[2]);
	test.strictEqual(res[1], products[1]);
	test.strictEqual(res[2], products[0]);
	test.done();
};

tests.simpleObjSort = function(test) {
	//!standard-mongo
	var res = products.slice(0).sort({ _id: 1 });
	test.strictEqual(res.length, 3);
	test.strictEqual(res[0], products[0]);
	test.strictEqual(res[1], products[1]);
	test.strictEqual(res[2], products[2]);
	//!standard-mongo
	res = products.slice(0).sort({ _id: -1 });
	test.strictEqual(res.length, 3);
	test.strictEqual(res[0], products[2]);
	test.strictEqual(res[1], products[1]);
	test.strictEqual(res[2], products[0]);
	//!non-standard-mongo
	res = products.slice(0).sort({ _id: false });
	test.strictEqual(res.length, 3);
	test.strictEqual(res[0], products[2]);
	test.strictEqual(res[1], products[1]);
	test.strictEqual(res[2], products[0]);
	//!non-standard-mongo
	res = products.slice(0).sort({ _id: true });
	test.strictEqual(res.length, 3);
	test.strictEqual(res[0], products[0]);
	test.strictEqual(res[1], products[1]);
	test.strictEqual(res[2], products[2]);
	//!non-standard-mongo
	res = products.slice(0).sort({ _id: function(a, b) {
			return -(a[0] - b[0]);
		} });
	test.strictEqual(res.length, 3);
	test.strictEqual(res[0], products[2]);
	test.strictEqual(res[1], products[1]);
	test.strictEqual(res[2], products[0]);
	test.done();
};

tests.multiKeySort = function(test) {
	//!standard-mongo
	var res = products.slice(0).sort({ type: 1, _id: 1 });
	test.strictEqual(res.length, 3);
	test.strictEqual(res[0], products[0]);
	test.strictEqual(res[1], products[2]);
	test.strictEqual(res[2], products[1]);
	//!standard-mongo
	res = products.slice(0).sort({ type: 1, _id: -1 });
	test.strictEqual(res.length, 3);
	test.strictEqual(res[0], products[2]);
	test.strictEqual(res[1], products[0]);
	test.strictEqual(res[2], products[1]);
	test.done();
};

tests.sortHavingArray = function(test) {
	//!standard-mongo
	var res = products.slice(0).sort({ asort: 1 });
	test.strictEqual(res.length, 3);
	test.strictEqual(res[0], products[0]);
	test.strictEqual(res[1], products[2]);
	test.strictEqual(res[2], products[1]);
	//!standard-mongo
	res = products.slice(0).sort({ asort: -1 });
	test.strictEqual(res.length, 3);
	test.strictEqual(res[0], products[0]);
	test.strictEqual(res[1], products[1]);
	test.strictEqual(res[2], products[2]);
	//!non-standard-mongo
	//!nb: Mongo orders this as 0,1,2. It appears that mongo simply ignores
	//!nb: "undefined" when sorting like this (or something similar that's a
	//!nb: head-scratcher). We take the position that undefined < defined.
	res = products.slice(0).sort({ 'complex.tags': 1 });
	test.strictEqual(res.length, 3);
	test.strictEqual(res[0], products[1]);
	test.strictEqual(res[1], products[0]);
	test.strictEqual(res[2], products[2]);
	//!standard-mongo
	//!nb: Standard basically by-coincidence... see above
	res = products.slice(0).sort({ 'complex.tags': -1 });
	test.strictEqual(res.length, 3);
	test.strictEqual(res[0], products[2]);
	test.strictEqual(res[1], products[0]);
	test.strictEqual(res[2], products[1]);
	test.done();
};
