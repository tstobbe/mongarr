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

tests.simpleObjSelect = function(test) {
	var obj = { _id: 123 };
	//!standard-mongo
	test.strictEqual(obj.select('_id'), 123, 'obj.select(\'_id\') expected to result in 123.');
	test.strictEqual(obj.select('nonExistant'), undefined, 'obj.select(\'nonExistant\') expected to result in undefined.');
	//!standard-mongo
	res = obj.select('_id', { flatten: true });
	test.strictEqual(res.length, 1, 'obj.select(\'_id\', { flatten: true }) expected to return exactly 1 result.');
	test.strictEqual(res[0], 123, 'obj.select(\'_id\', { flatten: true }) expected to return [ 123 ].');
	//!standard-mongo
	res = obj.select('nonExistant', { flatten: true });
	test.strictEqual(res.length, 0, 'obj.select(\'nonExistant\', { flatten: true }) expected to return no results.');
	test.done();
};

tests.objSelectArrayItemByIndex = function(test) {
	var obj = { tags: [ 'a', 'b', 'c' ] };
	//!standard-mongo
	test.strictEqual(obj.select('tags.0'), 'a', 'obj.select(\'tags.0\') expected to result in \'a\'.');
	test.strictEqual(obj.select('tags.1'), 'b', 'obj.select(\'tags.1\') expected to result in \'b\'.');
	test.strictEqual(obj.select('tags.2'), 'c', 'obj.select(\'tags.2\') expected to result in \'c\'.');
	test.strictEqual(obj.select('tags.3'), undefined, 'obj.select(\'tags.3\') expected to result in undefined.');
	//!non-standard-mongo
	test.strictEqual(obj.select('tags.-1'), 'c', 'obj.select(\'tags.-1\') expected to result in \'c\'.');
	test.strictEqual(obj.select('tags.-2'), 'b', 'obj.select(\'tags.-2\') expected to result in \'b\'.');
	test.strictEqual(obj.select('tags.-3'), 'a', 'obj.select(\'tags.-3\') expected to result in \'a\'.');
	test.strictEqual(obj.select('tags.-4'), undefined, 'obj.select(\'tags.-4\') expected to result in undefined.');
	test.done();
};
