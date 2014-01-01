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

var select = require('./select.js');
var undef = undefined;

var group = module.exports = function(selection, groupBy/*, options */) {
	var opts = arguments[2] || { };
	var res = { };
	for (var i = 0, n = selection.length; i !== n; ++i) {
		var keys = select(selection[i], groupBy, { flatten: 'fully' });
		if ((opts.$default !== undef) && (keys.length === 0)) {
			if (res[opts.$default] === undef)
				res[opts.$default] = [ ];
			res[opts.$default][res[opts.$default].length] = selection[i];
		} else {
			for (var j = 0, m = keys.length; j !== m; ++j) {
				if (res[keys[j]] === undef)
					res[keys[j]] = [ ];
				res[keys[j]][res[keys[j]].length] = selection[i];
			}
		}
	}
	return res;
};
