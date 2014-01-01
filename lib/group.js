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
