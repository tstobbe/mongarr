var marr = require('../').extendPrototypes();
var tests = module.exports;

var products = [
	{ _id: 1, name: 'Keyboard', type: 'Input', price: 39.49, tags: [ 'input', 'computer' ], asort: [ 32, 1 ], complex: [ { id: 10, tags: 'abcde' }, { id: 15, tags: [ 'hello', 'goodbye' ] } ]  },
	{ _id: 2, name: 'Moniter', type: 'Output', price: 172.63, tags: [ 'display', 'video', 'computer' ], asort: [ 7, 24 ], disabled: true, complex: [ { id: 20 }, { id: 25 } ] },
	{ _id: 3, name: 'Mouse', type: 'Input', price: 15.98, bigInt: 9007199254740991, tags: [ 'input', 'computer',  'accessory' ], asort: [ 5 ], complex: [ { id: 30, tags: [ 'world', 'universe' ] }, { id: 35 } ] }
];

tests.joinOriginal = function(test) {
	var res = [ 'hello', 'world' ].join(' ');
	test.strictEqual(res, 'hello world');
	test.done();
};
