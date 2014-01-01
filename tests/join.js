/***************************************************************************\
 Copyright (C) 2013 G. T. Stobbe <mr.stobbe@gmail.com>

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

\***************************************************************************/

var marr = require('../').extendPrototypes();
var tests = module.exports;

var products = [
	{ _id: 1, name: 'Keyboard', type: 'Input', price: 39.49, tags: [ 'input', 'computer' ], asort: [ 32, 1 ], complex: [ { id: 10, tags: 'abcde' }, { id: 15, tags: [ 'hello', 'goodbye' ] } ]  },
	{ _id: 2, name: 'Moniter', type: 'Output', price: 172.63, tags: [ 'display', 'video', 'computer' ], asort: [ 7, 24 ], disabled: true, complex: [ { id: 20 }, { id: 25 } ] },
	{ _id: 3, name: 'Mouse', type: 'Input', price: 15.98, bigInt: 9007199254740991, tags: [ 'input', 'computer',  'accessory' ], asort: [ 5 ], complex: [ { id: 30, tags: [ 'world', 'universe' ] }, { id: 35 } ] }
];

var related1To1 = [
	{ _id: 20, productID: 1, descr: 'Some Keyboard' },
	{ _id: 21, productID: 2, descr: 'Some Monitor' },
	{ _id: 22, productID: 3, descr: 'Some Mouse' }
];

tests.joinOriginal = function(test) {
	var res = [ 'hello', 'world' ].join(' ');
	test.strictEqual(res, 'hello world');
	test.done();
};

tests.joinRootRightRoot = function(test) {
	var res = products.join(related1To1, { _id: 'productID' });
	test.strictEqual(res.length, 3);
	test.strictEqual(res[0]._id, 1);
	test.strictEqual(res[1]._id, 2);
	test.strictEqual(res[2]._id, 3);
	test.strictEqual(res[0].productID, 1);
	test.strictEqual(res[1].productID, 2);
	test.strictEqual(res[2].productID, 3);
	test.strictEqual(res[0].descr, 'Some Keyboard');
	test.strictEqual(res[1].descr, 'Some Monitor');
	test.strictEqual(res[2].descr, 'Some Mouse');
	test.done();
};
