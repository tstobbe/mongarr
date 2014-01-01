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

var undef = undefined;

var select = function(ns, key/*, options */) {
	var opts = arguments[2] || { };
	if ((key instanceof Array) === false)
		key = key.split('.');
	var keyIndex = opts.keyIndex || 0;
	var subOpts = { };
	var ok = Object.keys(opts);
	for (var i = 0, n = ok.length; i !== n; ++i)
		subOpts[ok[i]] = opts[ok[i]];
	var ref = ns;
	for (var i = keyIndex, n = key.length; i < n; ++i) {
		if (ref instanceof Array) {
			var idx;
			if (key[i] === (idx = (key[i] >> 0)).toString()) {
				if (idx < 0) {
					ref = ref[ref.length + idx];
				} else {
					ref = ref[idx];
				}
			} else {
				var res = (opts.flatten === 'min-max') ? [ undef, undef ] : [ ];
				for (var j = 0, m = ref.length; j !== m; ++j) {
					subOpts.keyIndex = i;
					var sres = select(ref[j], key, subOpts);
					if (opts.flatten === 'min-max') {
						if ((res[0] === undef) || (sres[0] < res[0]))
							res[0] = sres[0];
						if ((res[1] === undef) || (sres[1] > res[1]))
							res[1] = sres[1];
					} else if (opts.flatten) {
						for (var k = 0, l = sres.length; k !== l; ++k)
							res[res.length] = sres[k];
					} else {
						res[res.length] = sres;
					}
				}
				return res;
			}
		} else {
			ref = ref[key[i]];
		}
		if (ref === undef)
			break;
	}
	if (opts.flatten) {
		if (opts.flatten === 'min-max') {
			var res = [ undef, undef ];
			if (ref instanceof Array) {
				for (var i = 0, n = ref.length; i !== n; ++i) {
					if ((res[0] === undef) || (ref[i] < res[0]))
						res[0] = ref[i];
					if ((res[1] === undef) || (ref[i] > res[1]))
						res[1] = ref[i];
				}
			} else {
				res = [ ref, ref ];
			}
			return res;
		} else if ((opts.flatten === 'fully') && (ref instanceof Array)) {
			return ref;
		}
		return (ref === undef) ? [ ] : [ ref ];
	}
	return ref;
};

module.exports = select;