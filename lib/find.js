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
