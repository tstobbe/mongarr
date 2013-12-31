var marr = require('../').extendPrototypes();

var tests = module.exports;

var products = [
	{ _id: 1, name: 'Keyboard', type: 'Input', price: 39.49, tags: [ 'input', 'computer' ], complex: [ { id: 10 }, { id: 15, tags: [ 'hello', 'goodbye' ] } ]  },
	{ _id: 2, name: 'Moniter', type: 'Output', price: 172.63, tags: [ 'video', 'display', 'computer' ], disabled: true, complex: [ { id: 20 }, { id: 25 } ] },
	{ _id: 3, name: 'Mouse', type: 'Input', price: 15.98, bigInt: 9007199254740991, tags: [ 'input', 'accessory', 'computer' ], complex: [ { id: 30, tags: [ 'world', 'universe' ] }, { id: 35 } ] }
];

tests.findEmpty = function(test) {
	var res = products.find();
	test.strictEqual(res.length, 3, 'No supplied query expected to return all results');
	res = products.find({ });
	test.strictEqual(res.length, 3, 'Empty object literal expected to return all results');
	test.done();
};

tests.findEquality = function(test) {
	//!standard-mongo
	var res = products.find({ _id: 1 });
	test.strictEqual(res.length, 1, 'find({ _id: 1 }) expected to return 1 result');
	test.strictEqual(res[0], products[0], 'find({ _id: 1 }) expected to return the first object');
	//!non-standard-mongo
	res = products.find({ _id: { $eq: 3 } });
	test.strictEqual(res.length, 1, 'find({ _id: { $eq: 3 } }) expected to return 1 result');
	test.strictEqual(res[0], products[2], 'find({ _id: { $eq: 3 } }) expected to return the third object');
	//!non-standard-mongo
	res = products.find({ $eq: { _id: 3 } });
	test.strictEqual(res.length, 1, 'find({ $eq: { _id: 3 } }) expected to return 1 result');
	test.strictEqual(res[0], products[2], 'find({ $eq: { _id: 3 } }) expected to return the third object');
	test.done();
};

tests.findNegation = function(test) {
	//!standard-mongo
	var res = products.find({ _id: { $ne: 1 } });
	test.strictEqual(res.length, 2, 'find({ _id: { $ne: 1 } }) expected to return 2 results');
	test.strictEqual(res[0], products[1], 'find({ _id: { $ne: 1 } }) expected to return the second object');
	test.strictEqual(res[1], products[2], 'find({ _id: { $ne: 1 } }) expected to return the third object');
	//!standard-mongo
	res = products.find({ $not: { _id: 1 } });
	test.strictEqual(res.length, 2, 'find({ $not: { _id: 1 } }) expected to return 2 results');
	test.strictEqual(res[0], products[1], 'find({ $not: { _id: 1 } }) expected to return the second object');
	test.strictEqual(res[1], products[2], 'find({ $not: { _id: 1 } }) expected to return the third object');
	//!non-standard-mongo
	res = products.find({ $ne: { _id: 1 } });
	test.strictEqual(res.length, 2, 'find({ $ne: { _id: 1 } }) expected to return 2 results');
	test.strictEqual(res[0], products[1], 'find({ $ne: { _id: 1 } }) expected to return the second object');
	test.strictEqual(res[1], products[2], 'find({ $ne: { _id: 1 } }) expected to return the third object');
	//!non-standard-mongo
	res = products.find({ _id: { $not: 1 } });
	test.strictEqual(res.length, 2, 'find({ _id: { $not: 1 } }) expected to return 2 results');
	test.strictEqual(res[0], products[1], 'find({ _id: { $not: 1 } }) expected to return the second object');
	test.strictEqual(res[1], products[2], 'find({ _id: { $not: 1 } }) expected to return the third object');
	//!non-standard-mongo
	res = products.find({ $ne: { _id: { $eq: 1 } } });
	test.strictEqual(res.length, 2, 'find({ $ne: { _id: { $eq: 1 } } }) expected to return 2 results');
	test.strictEqual(res[0], products[1], 'find({ $ne: { _id: { $eq: 1 } } }) expected to return the second object');
	test.strictEqual(res[1], products[2], 'find({ $ne: { _id: { $eq: 1 } } }) expected to return the third object');
	//!non-standard-mongo
	res = products.find({ $not: { _id: { $eq: 1 } } });
	test.strictEqual(res.length, 2, 'find({ $not: { _id: { $eq: 1 } } }) expected to return 2 results');
	test.strictEqual(res[0], products[1], 'find({ $not: { _id: { $eq: 1 } } }) expected to return the second object');
	test.strictEqual(res[1], products[2], 'find({ $not: { _id: { $eq: 1 } } }) expected to return the third object');
	test.done();
};

tests.findNumberRange = function(test) {
	//!standard-mongo
	var res = products.find({ price: { $gt: 39.49 } });
	test.strictEqual(res.length, 1, 'find({ price: { $gt: 39.49 } }) expected to return 1 result');
	test.strictEqual(res[0], products[1], 'find({ price: { $gt: 39.49 } }) expected to return the second object');
	//!standard-mongo
	res = products.find({ price: { $not: { $gt: 39.49 } } });
	test.strictEqual(res.length, 2, 'find({ price: { $not: { $gt: 39.49 } } }) expected to return 2 results');
	test.strictEqual(res[0], products[0], 'find({ price: { $not: { $gt: 39.49 } } }) expected to return the first object');
	test.strictEqual(res[1], products[2], 'find({ price: { $not: { $gt: 39.49 } } }) expected to return the third object');
	//!standard-mongo
	res = products.find({ price: { $lt: 39.49 } });
	test.strictEqual(res.length, 1, 'find({ price: { $lt: 39.49 } }) expected to return 1 result');
	test.strictEqual(res[0], products[2], 'find({ price: { $lt: 39.49 } }) expected to return the third object');
	//!standard-mongo
	res = products.find({ price: { $not: { $lt: 39.49 } } });
	test.strictEqual(res.length, 2, 'find({ price: { $not: { $lt: 39.49 } } }) expected to return 2 results');
	test.strictEqual(res[0], products[0], 'find({ price: { $not: { $lt: 39.49 } } }) expected to return the first object');
	test.strictEqual(res[1], products[1], 'find({ price: { $not: { $lt: 39.49 } } }) expected to return the second object');
	//!standard-mongo
	res = products.find({ price: { $gte: 39.49 } });
	test.strictEqual(res.length, 2, 'find({ price: { $gte: 39.49 } }) expected to return 2 results');
	test.strictEqual(res[0], products[0], 'find({ price: { $gte: 39.49 } }) expected to return the first object');
	test.strictEqual(res[1], products[1], 'find({ price: { $gte: 39.49 } }) expected to return the second object');
	//!standard-mongo
	res = products.find({ price: { $lte: 39.49 } });
	test.strictEqual(res.length, 2, 'find({ price: { $lte: 39.49 } }) expected to return 2 results');
	test.strictEqual(res[0], products[0], 'find({ price: { $lte: 39.49 } }) expected to return the first object');
	test.strictEqual(res[1], products[2], 'find({ price: { $lte: 39.49 } }) expected to return the third object');
	test.done();
};

tests.findIn = function(test) {
	//!nb: $in is really just $or while $nin is really just $nor
	//!standard-mongo
	var res = products.find({ _id: { $in: [ 1, 3 ] } });
	test.strictEqual(res.length, 2, 'find({ _id: { $in: [ 1, 3 ] } }) expected to return 2 results');
	test.strictEqual(res[0], products[0], 'find({ _id: { $in: [ 1, 3 ] } }) expected to return the first object');
	test.strictEqual(res[1], products[2], 'find({ _id: { $in: [ 1, 3 ] } }) expected to return the third object');
	//!non-standard-mongo
	res = products.find({ _id: { $in: [ { $eq: 1 }, { $ne: 2 } ] } });
	test.strictEqual(res.length, 2, 'find({ _id: { $in: [ { $eq: 1 }, { $ne: 2 } ] } }) expected to return 2 results');
	test.strictEqual(res[0], products[0], 'find({ _id: { $in: [ { $eq: 1 }, { $ne: 2 } ] } }) expected to return the first object');
	test.strictEqual(res[1], products[2], 'find({ _id: { $in: [ { $eq: 1 }, { $ne: 2 } ] } }) expected to return the third object');
	//!non-standard-mongo
	res = products.find({ $in: [ { _id: 1 }, { price: 15.98 } ] });
	test.strictEqual(res.length, 2, 'find({ $in: [ { _id: 1 }, { price: 15.98 } ] }) expected to return 2 results');
	test.strictEqual(res[0], products[0], 'find({ $in: [ { _id: 1 }, { price: 15.98 } ] }) expected to return the first object');
	test.strictEqual(res[1], products[2], 'find({ $in: [ { _id: 1 }, { price: 15.98 } ] }) expected to return the third object');
	test.done();
};

tests.findAnd = function(test) {
	//!standard-mongo
	var res = products.find({ $and: [ { type: 'Input' }, { price: { $gt: 20 } } ] });
	test.strictEqual(res.length, 1, 'find({ $and: [ { type: \'Input\' }, { price: { $gt: 20 } } ] }) expected to return 1 result');
	test.strictEqual(res[0], products[0], 'find({ $and: [ { type: \'Input\' }, { price: { $gt: 20 } } ] }) expected to return the first object');
	//#TODO: non-standard tests similar to $or (would only work on array value, function, or regexp tests I believe)
	test.done();
};

tests.findNand = function(test) {
	//!non-standard-mongo
	var res = products.find({ $nand: [ { type: 'Input' }, { price: { $gt: 20 } } ] });
	test.strictEqual(res.length, 2, 'find({ $nand: [ { type: \'Input\' }, { price: { $gt: 20 } } ] }) expected to return 1 result');
	test.strictEqual(res[0], products[1], 'find({ $nand: [ { type: \'Input\' }, { price: { $gt: 20 } } ] }) expected to return the second object');
	test.strictEqual(res[1], products[2], 'find({ $nand: [ { type: \'Input\' }, { price: { $gt: 20 } } ] }) expected to return the third object');
	//#TODO: more non-standard tests similar to $nor (would only work on array value, function, or regexp tests I believe)
	test.done();
};

tests.findOr = function(test) {
	//!standard-mongo
	var res = products.find({ $or: [ { _id: 1 }, { price: 15.98 } ] });
	test.strictEqual(res.length, 2, 'find({ $or: [ { _id: 1 }, { price: 15.98 } ] }) expected to return 2 results');
	test.strictEqual(res[0], products[0], 'find({ $or: [ { _id: 1 }, { price: 15.98 } ] }) expected to return the first object');
	test.strictEqual(res[1], products[2], 'find({ $or: [ { _id: 1 }, { price: 15.98 } ] }) expected to return the third object');
	//!non-standard-mongo
	res = products.find({ _id: { $or: [ 1, 3 ] } });
	test.strictEqual(res.length, 2, 'find({ _id: { $or: [ 1, 3 ] } }) expected to return 2 results');
	test.strictEqual(res[0], products[0], 'find({ _id: { $or: [ 1, 3 ] } }) expected to return the first object');
	test.strictEqual(res[1], products[2], 'find({ _id: { $or: [ 1, 3 ] } }) expected to return the third object');
	//!non-standard-mongo
	res = products.find({ _id: { $or: [ { $eq: 1 }, { $ne: 2 } ] } });
	test.strictEqual(res.length, 2, 'find({ _id: { $or: [ { $eq: 1 }, { $ne: 2 } ] } }) expected to return 2 results');
	test.strictEqual(res[0], products[0], 'find({ _id: { $or: [ { $eq: 1 }, { $ne: 2 } ] } }) expected to return the first object');
	test.strictEqual(res[1], products[2], 'find({ _id: { $or: [ { $eq: 1 }, { $ne: 2 } ] } }) expected to return the third object');
	//!non-standard-mongo
	res = products.find({ _id: { $or: [ 1, { $ne: 2 } ] } });
	test.strictEqual(res.length, 2, 'find({ _id: { $or: [ 1, { $ne: 2 } ] } }) expected to return 2 results');
	test.strictEqual(res[0], products[0], 'find({ _id: { $or: [ 1, { $ne: 2 } ] } }) expected to return the first object');
	test.strictEqual(res[1], products[2], 'find({ _id: { $or: [ 1, { $ne: 2 } ] } }) expected to return the third object');
	test.done();
};


tests.findNor = function(test) {
	//!standard-mongo
	var res = products.find({ $nor: [ { _id: 1 }, { price: 15.98 } ] });
	test.strictEqual(res.length, 1, 'find({ $nor: [ { _id: 1 }, { price: 15.98 } ] }) expected to return 1 result');
	test.strictEqual(res[0], products[1], 'find({ $nor: [ { _id: 1 }, { price: 15.98 } ] }) expected to return the second object');
	//!non-standard-mongo
	res = products.find({ _id: { $nor: [ 1, 3 ] } });
	test.strictEqual(res.length, 1, 'find({ _id: { $nor: [ 1, 3 ] } }) expected to return 1 result');
	test.strictEqual(res[0], products[1], 'find({ _id: { $nor: [ 1, 3 ] } }) expected to return the second object');
	//!non-standard-mongo
	res = products.find({ _id: { $nor: [ { $eq: 1 }, { $ne: 2 } ] } });
	test.strictEqual(res.length, 1, 'find({ _id: { $nor: [ { $eq: 1 }, { $ne: 2 } ] } }) expected to return 1 result');
	test.strictEqual(res[0], products[1], 'find({ _id: { $nor: [ { $eq: 1 }, { $ne: 2 } ] } }) expected to return the second object');
	//!non-standard-mongo
	res = products.find({ _id: { $nor: [ 1, { $ne: 2 } ] } });
	test.strictEqual(res.length, 1, 'find({ _id: { $nor: [ 1, { $ne: 2 } ] } }) expected to return 1 result');
	test.strictEqual(res[0], products[1], 'find({ _id: { $nor: [ 1, { $ne: 2 } ] } }) expected to return the second object');
	test.done();
};

tests.findMod = function(test) {
	//!standard-mongo
	var res = products.find({ _id: { $mod: [ 2, 0 ] } });
	test.strictEqual(res.length, 1, 'find({ _id: { $mod: [ 2, 0 ] } }) expected to return 1 result');
	test.strictEqual(res[0], products[1], 'find({ _id: { $mod: [ 2, 0 ] } }) expected to return the second object');
	//!standard-mongo
	res = products.find({ _id: { $mod: [ 3, 0 ] } });
	test.strictEqual(res.length, 1, 'find({ _id: { $mod: [ 3, 0 ] } }) expected to return 1 result');
	test.strictEqual(res[0], products[2], 'find({ _id: { $mod: [ 3, 0 ] } }) expected to return the third object');
	//!standard-mongo
	res = products.find({ tags: { $mod: [ 3, 0 ] } });
	test.strictEqual(res.length, 0, 'find({ tags: { $mod: [ 3, 0 ] } }) expected to return no results');
	//!non-standard-mongo
	res = products.find({ _id: { $mod: [ 2 ] } });
	test.strictEqual(res.length, 1, 'find({ _id: { $mod: [ 2 ] } }) expected to return 1 result');
	test.strictEqual(res[0], products[1], 'find({ _id: { $mod: [ 2 ] } }) expected to return the second object');
	//!non-standard-mongo
	res = products.find({ _id: { $mod: 2 } });
	test.strictEqual(res.length, 1, 'find({ _id: { $mod: 2 } }) expected to return 1 result');
	test.strictEqual(res[0], products[1], 'find({ _id: { $mod: 2 } }) expected to return the second object');
	test.done();
};

tests.findArray = function(test) {
	//!standard-mongo
	var res = products.find({ tags: 'input' });
	test.strictEqual(res.length, 2, 'find({ tags: \'input\' }) expected to return 2 results');
	test.strictEqual(res[0], products[0], 'find({ tags: \'input\' }) expected to return the first object');
	test.strictEqual(res[1], products[2], 'find({ tags: \'input\' }) expected to return the third object');
	//!standard-mongo
	res = products.find({ tags: /input/ });
	test.strictEqual(res.length, 2, 'find({ tags: /input/ }) expected to return 2 results');
	test.strictEqual(res[0], products[0], 'find({ tags: /input/ }) expected to return the first object');
	test.strictEqual(res[1], products[2], 'find({ tags: /input/ }) expected to return the third object');
	//!standard-mongo
	res = products.find({ tags: { $in: [ 'video', 'accessory' ] } });
	test.strictEqual(res.length, 2, 'find({ tags: { $in: [ \'video\', \'accessory\' ] } }) expected to return 2 results');
	test.strictEqual(res[0], products[1], 'find({ tags: { $in: [ \'video\', \'accessory\' ] } }) expected to return the second object');
	test.strictEqual(res[1], products[2], 'find({ tags: { $in: [ \'video\', \'accessory\' ] } }) expected to return the third object');
	//!standard-mongo
	res = products.find({ tags: { $nin: [ 'video', 'accessory' ] } });
	test.strictEqual(res.length, 1, 'find({ tags: { $nin: [ \'video\', \'accessory\' ] } }) expected to return 1 result');
	test.strictEqual(res[0], products[0], 'find({ tags: { $nin: [ \'video\', \'accessory\' ] } }) expected to return the first object');
	test.done();
};

tests.findAll = function(test) {
	//!nb: $all is really just $and
	//!standard-mongo
	var res = products.find({ tags: { $all: [ 'computer', 'input' ] } });
	test.strictEqual(res.length, 2, 'find({ tags: { $all: [ \'computer\', \'input\' ] } }) expected to return 2 results');
	test.strictEqual(res[0], products[0], 'find({ tags: { $all: [ \'computer\', \'input\' ] } }) expected to return the first object');
	test.strictEqual(res[1], products[2], 'find({ tags: { $all: [ \'computer\', \'input\' ] } }) expected to return the third object');
	//!non-standard-mongo
	res = products.find({ tags: { $all: [ 'computer', { $ne: 'display' } ] } });
	test.strictEqual(res.length, 2, 'find({ tags: { $all: [ \'computer\', { $ne: \'display\' } ] } }) expected to return 2 results');
	test.strictEqual(res[0], products[0], 'find({ tags: { $all: [ \'computer\', { $ne: \'display\' } ] } }) expected to return the first object');
	test.strictEqual(res[1], products[2], 'find({ tags: { $all: [ \'computer\', { $ne: \'display\' } ] } }) expected to return the third object');
	test.done();
};

tests.findSub = function(test) {
	//!standard-mongo
	var res = products.find({ 'complex.id': 15 });
	test.strictEqual(res.length, 1, 'find({ \'complex.id\': 15 }) expected to return 1 result');
	test.strictEqual(res[0], products[0], 'find({ \'complex.id\': 15 }) expected to return the first object');
	test.done();
};

tests.findSubArray = function(test) {
	//!standard-mongo
	var res = products.find({ 'complex.tags': 'hello' });
	test.strictEqual(res.length, 1, 'find({ \'complex.tags\': \'hello\' }) expected to return 1 result');
	test.strictEqual(res[0], products[0], 'find({ \'complex.tags\': \'hello\' }) expected to return the first object');
	test.done();
};

tests.findElemMatch = function(test) {
	//!standard-mongo
	var res = products.find({ complex: { $elemMatch: { id: 30, tags: 'universe' } } });
	test.strictEqual(res.length, 1, 'find({ complex: { $elemMatch: { id: id: 30, tags: \'universe\' } } }) expected to return 1 result');
	test.strictEqual(res[0], products[2], 'find({ complex: { $elemMatch: { id: 30, tags: \'universe\' } } }) expected to return the third object');
	//!standard-mongo
	res = products.find({ complex: { $elemMatch: { tags: { $all: [ 'world', 'universe' ] } } } });
	test.strictEqual(res.length, 1, 'find({ complex: { $elemMatch: { tags: { $all: [ \'world\', \'universe\' ] } } } }) expected to return 1 result');
	test.strictEqual(res[0], products[2], 'find({ complex: { $elemMatch: { tags: { $all: [ \'world\', \'universe\' ] } } } }) expected to return the third object');
	//!standard-mongo
	res = products.find({ complex: { $elemMatch: { tags: { $exists: 1 } } } });
	test.strictEqual(res.length, 2, 'find({ complex: { $elemMatch: { tags: { $exists: 1 } } } }) expected to return 2 results');
	test.strictEqual(res[0], products[0], 'find({ complex: { $elemMatch: { tags: { $exists: 1 } } } }) expected to return the third object');
	test.strictEqual(res[1], products[2], 'find({ complex: { $elemMatch: { tags: { $exists: 1 } } } }) expected to return the third object');
	test.done();
};

tests.findSparse = function(test) {
	//!standard-mongo
	var res = products.find({ disabled: true });
	test.strictEqual(res.length, 1, 'find({ disabled: true }) expected to return 1 result');
	test.strictEqual(res[0], products[1], 'find({ disabled: true }) expected to return the second object');
	//!standard-mongo
	res = products.find({ disabled: false });
	test.strictEqual(res.length, 0, 'find({ disabled: false }) expected to return no results');
	//!standard-mongo
	res = products.find({ disabled: { $exists: true } });
	test.strictEqual(res.length, 1, 'find({ disabled: { $exists: true } }) expected to return 1 result');
	test.strictEqual(res[0], products[1], 'find({ disabled: { $exists: true } }) expected to return the second object');
	//!standard-mongo
	res = products.find({ disabled: { $exists: false } });
	test.strictEqual(res.length, 2, 'find({ disabled: { $exists: false } }) expected to return 2 results');
	test.strictEqual(res[0], products[0], 'find({ disabled: { $exists: false } }) expected to return the first object');
	test.strictEqual(res[1], products[2], 'find({ disabled: { $exists: false } }) expected to return the third object');
	//!standard-mongo
	res = products.find({ disabled: { $ne: true } });
	test.strictEqual(res.length, 2, 'find({ disabled: { $ne: true } }) expected to return 2 results');
	test.strictEqual(res[0], products[0], 'find({ disabled: { $ne: true } }) expected to return the first object');
	test.strictEqual(res[1], products[2], 'find({ disabled: { $ne: true } }) expected to return the third object');
	//!standard-mongo
	res = products.find({ disabled: { $ne: false } });
	test.strictEqual(res.length, 3, 'find({ disabled: { $ne: false } }) expected to return 3 results');
	test.strictEqual(res[0], products[0], 'find({ disabled: { $ne: false } }) expected to return the first object');
	test.strictEqual(res[1], products[1], 'find({ disabled: { $ne: false } }) expected to return the second object');
	test.strictEqual(res[2], products[2], 'find({ disabled: { $ne: false } }) expected to return the third object');
	test.done();
};

tests.findSize = function(test) {
	//!standard-mongo
	var res = products.find({ tags: { $size: 2 } });
	test.strictEqual(res.length, 1, 'find({ tags: { $size: 2 } }) expected to return 1 result');
	test.strictEqual(res[0], products[0], 'find({ tags: { $size: 2 } }) expected to return the first object');
	//!non-standard-mongo
	res = products.find({ tags: { $size: { $lt: 3 } } });
	test.strictEqual(res.length, 1, 'find({ tags: { $size: { $lt: 3 } } }) expected to return 1 result');
	test.strictEqual(res[0], products[0], 'find({ tags: { $size: { $lt: 3 } } }) expected to return the first object');
	//!non-standard-mongo
	res = products.find({ 'complex.tags': { $size: { $lt: 2 } } });
	test.strictEqual(res.length, 0, 'find({ \'complex.tags\': { $size: { $lt: 2 } } }) expected to return no results');
	test.done();
};

tests.findType = function(test) {
	//!standard-mongo
	var res = products.find({ price: { $type: 1 } });
	test.strictEqual(res.length, 3, 'find({ price: { $type: 1 } }) expected to return 3 results');
	//!standard-mongo
	res = products.find({ _id: { $type: 16 } });
	test.strictEqual(res.length, 3, 'find({ _id: { $type: 16 } }) expected to return 3 results');
	//!standard-mongo
	res = products.find({ bigInt: { $type: 18 } });
	test.strictEqual(res.length, 1, 'find({ bigInt: { $type: 18 } }) expected to return 1 result');
	test.strictEqual(res[0], products[2], 'find({ bigInt: { $type: 18 } }) expected to return the third object');
	//!nb: You can also do all the non-standard stuff like you can do with $size. Not bothering to test those right now.
	test.done();
};

tests.findWhere = function(test) {
	//!standard-mongo
	var res = products.find(function(obj) {
			return obj._id === 2;
		});
	test.strictEqual(res.length, 1, 'find(function(obj) { return obj._id === 2; }) expected to return 1 result');
	test.strictEqual(res[0], products[1], 'find(function(obj) { return obj._id === 2; }) expected to return the second object');
	//!standard-mongo
	res = products.find({ $where: function(obj) {
			return obj._id === 2;
		} });
	test.strictEqual(res.length, 1, 'find({ $where: function(obj) { return obj._id === 2; } }) expected to return 1 result');
	test.strictEqual(res[0], products[1], 'find({ $where: function(obj) { return obj._id === 2; } }) expected to return the second object');
	//!standard-mongo
	res = products.find({ $where: function() {
			return this._id === 2;
		} });
	test.strictEqual(res.length, 1, 'find({ $where: function() { return this._id === 2; } }) expected to return 1 result');
	test.strictEqual(res[0], products[1], 'find({ $where: function() { return this._id === 2; } }) expected to return the second object');
	//!standard-mongo
	res = products.find({ $where: 'obj._id === 2' });
	test.strictEqual(res.length, 1, 'find({ $where: \'obj._id === 2\' }) expected to return 1 result');
	test.strictEqual(res[0], products[1], 'find({ $where: \'obj._id === 2\' }) expected to return the second object');
	//!non-standard-mongo
	res = products.find({ _id: { $where: function(id) {
			return id === 2;
		} } });
	test.strictEqual(res.length, 1, 'find({ _id: { $where: function(id) { return id === 2; } } }) expected to return 1 result');
	test.strictEqual(res[0], products[1], 'find({ _id: { $where: function(id) { return id === 2; } } }) expected to return the second object');
	//!non-standard-mongo
	res = products.find({ _id: function(id) {
			return id === 2;
		} });
	test.strictEqual(res.length, 1, 'find({ _id: function(id) { return id === 2; } }) expected to return 1 result');
	test.strictEqual(res[0], products[1], 'find({ _id: function(id) { return id === 2; } }) expected to return the second object');
	//!non-standard-mongo
	res = products.find({ _id: { $in: [ function(id) { return id === 2; } ] } });
	test.strictEqual(res.length, 1, 'find({ _id: { $in: [ function(id) { return id === 2; } ] }) expected to return 1 result');
	test.strictEqual(res[0], products[1], 'find({ _id: { $in: [ function(id) { return id === 2; } ] }) expected to return the second object');
	//!non-standard-mongo
	res = products.find({ _id: { $in: [ 1, function(id) { return id === 2; } ] } });
	test.strictEqual(res.length, 2, 'find({ _id: { $in: [ 1, function(id) { return id === 2; } ] }) expected to return 2 results');
	test.strictEqual(res[0], products[0], 'find({ _id: { $in: [ 1, function(id) { return id === 2; } ] }) expected to return the first object');
	test.strictEqual(res[1], products[1], 'find({ _id: { $in: [ 1, function(id) { return id === 2; } ] }) expected to return the second object');
	test.done();
};
