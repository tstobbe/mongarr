var select = require('./select.js');
var undef = undefined;

var group = module.exports = function(selection, groupBy/*, context */) {
	var res = { };
	for (var i = 0, n = selection.length; i !== n; ++i) {
		var keys = select(selection[i], groupBy, { flatten: 'fully' });
		var key;
		for (var j = 0, m = keys.length; j !== m; ++j) {
			if (res[keys[j]] === undef)
				res[keys[j]] = [ ];
			res[keys[j]][res[keys[j]].length] = selection[i];
		}
	}
	return res;
};
