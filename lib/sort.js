var select = require('./select.js');
var undef = undefined;

var _sort = Array.prototype.sort;
var sort = function(arr) {
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

module.exports = sort;
