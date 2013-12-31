var select = require('./lib/select.js');
var matches = require('./lib/matches.js');
var find = require('./lib/find.js');
var sort = require('./lib/sort.js');

var marr = module.exports = { };

marr.find = find.find;
marr.findOne = find.findOne;
marr.matches = matches;
marr.select = select;
marr.sort = sort;


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
		} else if ((arguments[i] === Object) || (arguments[i] === 'object')) {
			Object.prototype.matches = extendWith(marr.matches);
			Object.prototype.select = extendWith(marr.select);
		} else {
			throw Error('Can\'t extend prototype of unknown type "' + arguments[i] + '"');
		}
	}
	return marr;
};

