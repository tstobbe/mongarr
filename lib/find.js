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

var matches = require('./matches.js');

function find(arr, where) {
	if (!where)
		return Array.prototype.slice.call(arr, 0);
	var res = [ ];
	if (!arr.length)
		return res;
	for (var i = 0, n = arr.length; i !== n; ++i) {
		if (matches([ arr[i] ], where))
			res[res.length] = arr[i];
	}
	return res;
};

function findOne(arr, where) {
	if (!where)
		return (arr[0] === undef) ? null : arr[0];
	if (!arr.length)
		return null;
	for (var i = 0, n = arr.length; i !== n; ++i) {
		if (matches([ arr[i] ], where))
			return arr[i];
	}
	return null;
};

module.exports = {
	find: find,
	findOne: findOne
};
