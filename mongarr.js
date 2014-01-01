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
(function() {

var undef = void 0;

var marr = { };
if (this.process !== undef) {
	module.exports = marr;
} else {
	this.marr = marr;
}

var select = marr.select = function(ns, key/*, options */) {
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


var matches = marr.matches = function(selection, where/*, opts */) {
	var opts = arguments[2] || { };
	if ((selection instanceof Array) === false)
		selection = (selection === undef) ? [ ] : [ selection ];
	if ((typeof where === 'function') || (where instanceof Function)) {
		for (var i = 0, n = selection.length; i !== n; ++i) {
			if (where.call(selection[i], selection[i]))
				return true;
		}
		return false;
	} else if ((typeof where === 'object') && (where.constructor === Object)) {
		var keys = Object.keys(where);
		for (var i = 0, n = keys.length; i !== n; ++i) {
			var k = keys[i];
			var op = matches.ops[k];
			var val;
			if (op) {
				val = selection;
			} else {
				val = select(selection, k, { flatten: true });
				op = matches.ops.$eq;
			}
			if (!op(val, where[k], opts, k, selection, where))
				return false;
		}
		return true;
	} else if (where instanceof RegExp) {
		for (var i = 0, n = selection.length; i !== n; ++i) {
			if (selection[i] instanceof Array) {
				for (var j = 0, m = selection[i].length; j !== m; ++j) {
					if (where.test(selection[i][j]))
						return true;
				}
			} else {
				if (where.test(selection[i]))
					return true;
			}
		}
		return false;
	} else {
		for (var i = 0, n = selection.length; i !== n; ++i) {
			if (selection[i] instanceof Array) {
				for (var j = 0, m = selection[i].length; j !== m; ++j) {
					if (selection[i][j] === where)
						return true;
					if ((selection[i][j] !== undef) && (where !== undef) && (selection[i][j].valueOf() === where.valueOf()))
						return true;
				}
			} else {
				if (selection[i] === where)
					return true;
				if ((selection[i] !== undef) && (where !== undef) && (selection[i].valueOf() === where.valueOf()))
					return true;
			}
		}
		return false;
	}
};

matches.ops = { };

matches.ops.$and = function(selection, where, opts) {
	if (!where.length)
		return true;
	for (var i = 0, n = where.length; i !== n; ++i) {
		if (!matches(selection, where[i], opts))
			return false;
	}
	return true;
};

matches.ops.$or = function(selection, where, opts) {
	if (!where.length)
		return false;
	for (var i = 0, n = where.length; i !== n; ++i) {
		if (matches(selection, where[i], opts))
			return true;
	}
	return false;
};

matches.ops.$nand = function(selection, where, opts) {
	if (!where.length)
		return false;
	for (var i = 0, n = where.length; i !== n; ++i) {
		if (!matches(selection, where[i], opts))
			return true;
	}
	return false;
};

matches.ops.$nor = function(selection, where, opts) {
	if (!where.length)
		return false;
	for (var i = 0, n = where.length; i !== n; ++i) {
		if (matches(selection, where[i], opts))
			return false;
	}
	return true;
};

matches.ops.$exists = function(selection, where, opts) {
	return (selection.length !== 0) === !!where;
};

matches.ops.$eq = function(selection, where, opts) {
	return matches(selection, where, opts);
};

matches.ops.$ne = function(selection, where, opts) {
	return !matches(selection, where, opts);
};

matches.ops.$not = function(selection, where, opts) {
	return !matches(selection, where, opts);
};

matches.ops.$in = matches.ops.$or;
matches.ops.$nin = matches.ops.$nor;

matches.ops.$all = matches.ops.$and;

matches.ops.$lt = function(selection, where, opts) {
	for (var i = 0, n = selection.length; i !== n; ++i) {
		if (selection[i] < where)
			return true;
	}
	return false;
};

matches.ops.$lte = function(selection, where, opts) {
	for (var i = 0, n = selection.length; i !== n; ++i) {
		if (selection[i] <= where)
			return true;
	}
	return false;
};

matches.ops.$gt = function(selection, where, opts) {
	for (var i = 0, n = selection.length; i !== n; ++i) {
		if (selection[i] > where)
			return true;
	}
	return false;
};

matches.ops.$gte = function(selection, where, opts) {
	for (var i = 0, n = selection.length; i !== n; ++i) {
		if (selection[i] >= where)
			return true;
	}
	return false;
};

matches.ops.$mod = function(selection, where, opts) {
	var mod = where[0];
	if (mod === undef)
		mod = where;
	var eq = where[1] || 0;
	for (var i = 0, n = selection.length; i !== n; ++i) {
		if ((selection[i] % mod) === eq)
			return true;
	}
	return false;
};

matches.ops.$size = function(selection, where, opts) {
	for (var i = 0, n = selection.length; i !== n; ++i) {
		if (matches([ selection[i].length ], where, opts))
			return true;
	}
	return false;
};

matches.ops.$where = function(selection, where, opts) {
	if ((typeof where === 'string') || (where instanceof String))
		where = new Function('obj', 'return (' + where + ');');
	for (var i = 0, n = selection.length; i !== n; ++i) {
		if (where.call(selection[i], selection[i]))
			return true;
	}
	return false;
};

matches.ops.$elemMatch = function(selection, where, opts) {
	for (var i = 0, n = selection.length; i !== n; ++i) {
		if (!selection[i].length)
			return false;
		for (var j = 0, m = selection[i].length; j !== m; ++j) {
			if (matches([ selection[i][j] ], where, opts))
				return true;
		}
	}
	return false;
};

var isInt = Number.isInteger || function(x) {
	return typeof x === 'number' && isFinite(x) && x > -9007199254740992 && x < 9007199254740992 && Math.floor(x) === x;
};

matches.ops.$type = function(selection, where, opts) {
	for (var i = 0, n = selection.length; i !== n; ++i) {
		var type = undef;
		if (selection[i] === null) {
			type = 10;
		} else if ((typeof selection[i] === 'string') || (selection[i] instanceof String)) {
			type = 2;
		} else if ((typeof selection[i] === 'boolean') || (selection[i] instanceof Boolean)) {
			type = 8;
		} else if (selection[i] instanceof Array) {
			type = 4;
		} else if (selection[i] instanceof RegExp) {
			type = 11;
		} else if (selection[i] instanceof Date) {
			type = 9;
		} else if ((typeof selection[i] === 'function') || (selection[i] instanceof Function)) {
			type = 13;
		} else if ((typeof selection[i] === 'number') || (selection[i] instanceof Number)) {
			if (!isInt(selection[i])) {
				//double
				type = 1;
			} else if ((selection[i] >> 0) === selection[i].valueOf()) {
				//int32
				type = 16;
			} else {
				//int64
				type = 18;
			}
		//#TODO: Support "binary" via things like testing for node objects (most notably Buffer) and ArrayView
		} else {
			//object
			type = 3;
		}
		if (matches([ type ], where, opts))
			return true;
	}
	return false;
};


var find = marr.find = function(arr, where/*, projection[, opts] */) {
	var proj = arguments[2];
	var opts = arguments[3] || { };
	if (!where) {
		var res = Array.prototype.slice.call(arr, 0);
		if (opts.$join)
			res = join(res, opts.$join.$with, opts.$join.$where);
		return res;
	}
	var res = [ ];
	if (!arr.length)
		return res;
	for (var i = 0, n = arr.length; i !== n; ++i) {
		if (matches([ arr[i] ], where)) {
			if (opts.$join) {
				var r = join([ arr[i] ], opts.$join.$with, opts.$join.$where);
				if (r[0])
					res[res.length] = r[0];
			} else {
				res[res.length] = arr[i];
			}
		}
	}
	return res;
};

var findOne = marr.findOne = function(arr, where/*, projection[, opts] */) {
	var proj = arguments[2];
	var opts = arguments[3] || { };
	if (!arr.length)
		return null;
	if (!where) {
		var res = arr[0];
		if (opts.$join) {
			res = join([ res ], opts.$join.$with, opts.$join.$where);
			return res[0] || null;
		}
		return res;
	}
	for (var i = 0, n = arr.length; i !== n; ++i) {
		if (matches([ arr[i] ], where)) {
			var res = arr[i];
			if (opts.$join) {
				res = join([ res ], opts.$join.$with, opts.$join.$where);
				return res[0] || null;
			}
			return res;
		}
	}
	return null;
};


var _sort = Array.prototype.sort;
var sort = marr.sort = function(arr) {
	var params = { };
	if (arguments.length === 1)
		return _sort.call(arr);

	if ((typeof arguments[1] === 'function') || (arguments[1] instanceof Function))
		return _sort.call(arr, arguments[1]);

	if ((typeof arguments[1] === 'string') || (arguments[1] instanceof String)) {
		params = { };
		params[arguments[1].valueOf()] = (arguments[2] !== undef) ? arguments[2] : 1;
	} else {
		params = arguments[1];
	}

	var key = Object.keys(params);
	if (key.length === 0)
		return arr;
	var dir = [ ];
	for (var i = 0, n = key.length; i !== n; ++i) {
		var d = (params[key[i]] !== undef) ? params[key[i]] : 1;
		if ((typeof d !== 'function') && ((d instanceof Function) === false)) {
			if (d === false) {
				d = -1;
			} else if (d === true) {
				d = 1;
			} else if (d < 0) {
				d = -1;
			} else if (d > 0) {
				d = 1;
			} else {
				throw Error('Unknown direction "' + d + '" for field "' + key[i] + '"');
			}
		}
		dir[i] = d;
	}
	return arr.sort(function(ao, bo) {
			var cmp = 0;
			for (var i = 0, n = key.length; i !== n; ++i) {
				if ((typeof dir[i] === 'function') || (dir[i] instanceof Function)) {
					var av = select(ao, key[i], { flatten: 'fully' });
					var bv = select(bo, key[i], { flatten: 'fully' });
					cmp = dir[i].call(this, av, bv);
				} else {
					var av = select(ao, key[i], { flatten: 'min-max' });
					var bv = select(bo, key[i], { flatten: 'min-max' });
					var a = (dir[i] < 0) ? av[1] : av[0];
					var b = (dir[i] < 0) ? bv[1] : bv[0];
					if (a === b) {
						cmp = 0;
					} else if (a === undef) {
						cmp = -1;
					} else if (b === undef) {
						cmp = 1;
					} else if (a < b) {
						cmp = -1;
					} else if (a > b) {
						cmp = 1;
					} else {
						throw Error('Shouldn\'t get here!');
					}
					cmp *= dir[i];
				}
				if (cmp)
					break;
			}
			return cmp;
		});
};


var group = marr.group = function(selection, groupBy/*, options */) {
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

function clone(obj) {
	var res = { };
	var keys = Object.keys(obj);
	for (var i = 0, n = keys.length; i !== n; ++i)
		res[keys[i]] = obj[keys[i]];
	return res;
};

function merge(lhs, rhs) {
	var keys = Object.keys(rhs);
	for (var i = 0, n = keys.length; i !== n; ++i) {
		if (lhs[keys[i]] === undefined)
			lhs[keys[i]] = rhs[keys[i]];
	}
	return lhs;
};

function transform(value, obj) {
	if (value instanceof Array) {
		var arr = [ ];
		for (var j = 0, m = value.length; j !== m; ++j)
			arr[j] = transform(value[j], obj);
		return arr;
	} else if ((typeof value === 'object') && (value.constructor === Object)) {
		return buildWhere(value, obj);
	} else if ((typeof value === 'string') || (value instanceof String)) {
		if (value.substr(0, 2) === '$.') {
			return { $in: select(obj, value.substr(2), { flatten: 'fully' }) };
		} else {
			return value;
		}
	} else {
		return value;
	}
};

function buildWhere(where, obj) {
	var res = { };
	var keys = Object.keys(where);
	for (var i = 0, n = keys.length; i !== n; ++i)
		res[keys[i]] = transform(where[keys[i]], obj);
	return res;
};

var _join = Array.prototype.join;

var join = marr.join = function(selection, against, where/*, options */) {
	if (arguments.length < 3)
		return _join.apply(selection, Array.prototype.slice.call(arguments, 1));
	var opts = arguments[3] || { };
	var res = [ ];
	for (var i = 0, n = selection.length; i !== n; ++i) {
		var rhs = findOne(against, buildWhere(where, selection[i]));
		if (rhs) {
			var lhs = clone(selection[i]);
			merge(lhs, rhs);
			res[res.length] = lhs;
		}
	}
	return res;
};


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

})();