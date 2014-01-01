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


var select = require('./lib/select.js');
var matches = require('./lib/matches.js');
var find = require('./lib/find.js');
var sort = require('./lib/sort.js');
var group = require('./lib/group.js');
var join = require('./lib/join.js');

var marr = module.exports = { };

marr.find = find.find;
marr.findOne = find.findOne;
marr.matches = matches;
marr.select = select;
marr.sort = sort;
marr.group = group;
marr.join = join;

marr.extendPrototypes = function() {
	function extendWith(fn) {
		return function() {
				var args = Array.prototype.slice.call(arguments, 0);
				args.unshift(this);
				return fn.apply(this, args);
			};
	};
	if (arguments.length === 0)
		return marr.extendPrototypes(Array, Object);
	for (var i = 0, n = arguments.length; i !== n; ++i) {
		if ((arguments[i] === Array) || (arguments[i] === 'array')) {
			Array.prototype.find = extendWith(marr.find);
			Array.prototype.findOne = extendWith(marr.findOne);
			Array.prototype.sort = extendWith(marr.sort);
			Array.prototype.group = extendWith(marr.group);
			Array.prototype.join = extendWith(marr.join);
		} else if ((arguments[i] === Object) || (arguments[i] === 'object')) {
			Object.prototype.matches = extendWith(marr.matches);
			Object.prototype.select = extendWith(marr.select);
		} else {
			throw Error('Can\'t extend prototype of unsupported type "' + arguments[i] + '"');
		}
	}
	return marr;
};

