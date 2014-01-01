var marr = require('../').extendPrototypes();
var tests = module.exports;

var products = [
	{ _id: 1, name: 'Keyboard', type: 'Input', price: 39.49, tags: [ 'input', 'computer' ], asort: [ 32, 1 ], complex: [ { id: 10, tags: 'abcde' }, { id: 15, tags: [ 'hello', 'goodbye' ] } ]  },
	{ _id: 2, name: 'Moniter', type: 'Output', price: 172.63, tags: [ 'display', 'video', 'computer' ], asort: [ 7, 24 ], disabled: true, complex: [ { id: 20 }, { id: 25 } ] },
	{ _id: 3, name: 'Mouse', type: 'Input', price: 15.98, bigInt: 9007199254740991, tags: [ 'input', 'computer',  'accessory' ], asort: [ 5 ], complex: [ { id: 30, tags: [ 'world', 'universe' ] }, { id: 35 } ] }
];

tests.oneToOneGrouping = function(test) {
	var res = products.group('_id');
	var keys = Object.keys(res);
	test.strictEqual(keys.length, 3);
	test.equal(keys[0], 1);
	test.equal(keys[1], 2);
	test.equal(keys[2], 3);
	test.strictEqual(res[1].length, 1);
	test.strictEqual(res[2].length, 1);
	test.strictEqual(res[3].length, 1);
	test.strictEqual(res[1][0]._id, 1);
	test.strictEqual(res[2][0]._id, 2);
	test.strictEqual(res[3][0]._id, 3);
	test.done();
};

tests.manyToOneGrouping = function(test) {
	var res = products.group('type');
	var keys = Object.keys(res);
	test.strictEqual(keys.length, 2);
	test.strictEqual(keys[0], 'Input');
	test.strictEqual(keys[1], 'Output');
	test.strictEqual(res['Input'].length, 2);
	test.strictEqual(res['Input'][0]._id, 1);
	test.strictEqual(res['Input'][1]._id, 3);
	test.strictEqual(res['Output'].length, 1);
	test.strictEqual(res['Output'][0]._id, 2);
	test.done();
};

tests.arrayGrouping = function(test) {
	var res = products.group('tags');
	var keys = Object.keys(res);
	test.strictEqual(keys.length, 5);
	test.strictEqual(keys[0], 'input');
	test.strictEqual(keys[1], 'computer');
	test.strictEqual(keys[2], 'display');
	test.strictEqual(keys[3], 'video');
	test.strictEqual(keys[4], 'accessory');
	test.strictEqual(res['input'].length, 2);
	test.strictEqual(res['input'][0]._id, 1);
	test.strictEqual(res['input'][1]._id, 3);
	test.strictEqual(res['computer'].length, 3);
	test.strictEqual(res['computer'][0]._id, 1);
	test.strictEqual(res['computer'][1]._id, 2);
	test.strictEqual(res['computer'][2]._id, 3);
	test.strictEqual(res['display'].length, 1);
	test.strictEqual(res['display'][0]._id, 2);
	test.strictEqual(res['video'].length, 1);
	test.strictEqual(res['video'][0]._id, 2);
	test.strictEqual(res['accessory'].length, 1);
	test.strictEqual(res['accessory'][0]._id, 3);
	test.done();
};

tests.sparseGrouping = function(test) {
	var res = products.group('disabled');
	var keys = Object.keys(res);
	test.strictEqual(keys.length, 1);
	test.equal(keys[0], true.toString());
	test.strictEqual(res[true].length, 1);
	test.strictEqual(res[true][0]._id, 2);
	test.done();
};

tests.sparseSubArrayGrouping = function(test) {
	var res = products.group('complex.tags');
	var keys = Object.keys(res);
	test.strictEqual(keys.length, 5);
	test.strictEqual(keys[0], 'abcde');
	test.strictEqual(keys[1], 'hello');
	test.strictEqual(keys[2], 'goodbye');
	test.strictEqual(keys[3], 'world');
	test.strictEqual(keys[4], 'universe');
	test.strictEqual(res['abcde'].length, 1);
	test.strictEqual(res['abcde'][0]._id, 1);
	test.strictEqual(res['hello'].length, 1);
	test.strictEqual(res['hello'][0]._id, 1);
	test.strictEqual(res['goodbye'].length, 1);
	test.strictEqual(res['goodbye'][0]._id, 1);
	test.strictEqual(res['world'].length, 1);
	test.strictEqual(res['world'][0]._id, 3);
	test.strictEqual(res['universe'].length, 1);
	test.strictEqual(res['universe'][0]._id, 3);
	test.done();
};

tests.defaultedSparseGroupingViaOptions = function(test) {
	var res = products.group('disabled', { $default: '' });
	var keys = Object.keys(res);
	test.strictEqual(keys.length, 2);
	test.strictEqual(keys[0], '');
	test.strictEqual(keys[1], true.toString());
	test.strictEqual(res[''].length, 2);
	test.strictEqual(res[''][0]._id, 1);
	test.strictEqual(res[''][1]._id, 3);
	test.strictEqual(res[true].length, 1);
	test.strictEqual(res[true][0]._id, 2);
	test.done();
};