var select = require('./select.js');

var undef = undefined;

var matches = module.exports = function(selection, where/*, context */) {
	//#TODO: pass-around "context" of root document, current path, current full where object, etc
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
			if (!op(val, where[k], k, selection, where))
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

matches.ops.$and = function(selection, where) {
	if (!where.length)
		return true;
	for (var i = 0, n = where.length; i !== n; ++i) {
		if (!matches(selection, where[i]))
			return false;
	}
	return true;
};

matches.ops.$or = function(selection, where) {
	if (!where.length)
		return false;
	for (var i = 0, n = where.length; i !== n; ++i) {
		if (matches(selection, where[i]))
			return true;
	}
	return false;
};

matches.ops.$nand = function(selection, where) {
	if (!where.length)
		return false;
	for (var i = 0, n = where.length; i !== n; ++i) {
		if (!matches(selection, where[i]))
			return true;
	}
	return false;
};

matches.ops.$nor = function(selection, where) {
	if (!where.length)
		return false;
	for (var i = 0, n = where.length; i !== n; ++i) {
		if (matches(selection, where[i]))
			return false;
	}
	return true;
};

matches.ops.$exists = function(selection, where) {
	return (selection.length !== 0) === !!where;
};

matches.ops.$eq = function(selection, where) {
	return matches(selection, where);
};

matches.ops.$ne = function(selection, where) {
	return !matches(selection, where);
};

matches.ops.$not = function(selection, where) {
	return !matches(selection, where);
};

matches.ops.$in = matches.ops.$or;
matches.ops.$nin = matches.ops.$nor;

matches.ops.$all = matches.ops.$and;

matches.ops.$lt = function(selection, where) {
	for (var i = 0, n = selection.length; i !== n; ++i) {
		if (selection[i] < where)
			return true;
	}
	return false;
};

matches.ops.$lte = function(selection, where) {
	for (var i = 0, n = selection.length; i !== n; ++i) {
		if (selection[i] <= where)
			return true;
	}
	return false;
};

matches.ops.$gt = function(selection, where) {
	for (var i = 0, n = selection.length; i !== n; ++i) {
		if (selection[i] > where)
			return true;
	}
	return false;
};

matches.ops.$gte = function(selection, where) {
	for (var i = 0, n = selection.length; i !== n; ++i) {
		if (selection[i] >= where)
			return true;
	}
	return false;
};

matches.ops.$mod = function(selection, where) {
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

matches.ops.$size = function(selection, where) {
	for (var i = 0, n = selection.length; i !== n; ++i) {
		if (matches([ selection[i].length ], where))
			return true;
	}
	return false;
};

matches.ops.$where = function(selection, where) {
	if ((typeof where === 'string') || (where instanceof String))
		where = new Function('obj', 'return (' + where + ');');
	for (var i = 0, n = selection.length; i !== n; ++i) {
		if (where.call(selection[i], selection[i]))
			return true;
	}
	return false;
};

matches.ops.$elemMatch = function(selection, where) {
	for (var i = 0, n = selection.length; i !== n; ++i) {
		if (!selection[i].length)
			return false;
		for (var j = 0, m = selection[i].length; j !== m; ++j) {
			if (matches([ selection[i][j] ], where))
				return true;
		}
	}
	return false;
};

var isInt = Number.isInteger || function(x) {
	return typeof x === 'number' && isFinite(x) && x > -9007199254740992 && x < 9007199254740992 && Math.floor(x) === x;
};

matches.ops.$type = function(selection, where) {
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
		if (matches([ type ], where))
			return true;
	}
	return false;
};
