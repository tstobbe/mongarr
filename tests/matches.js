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
