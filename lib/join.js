var finders = require('./find.js');
var select = require('./select.js');
var undef = undefined;

var _join = Array.prototype.join;

var join = module.exports = function(selection, against, where/*, options */) {
	if (arguments.length < 3)
		return _join.apply(selection, Array.prototype.slice.call(arguments, 1));
	var opts = arguments[2] || { };
	var res = [ ];
	return res;
};
