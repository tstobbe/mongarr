MongArr
=======
Mongo syntax for pirates at heart. MongArr provides methods for finding sub-selections within an array, sorting using MongoDB snytax, or sub-selecting object property values in a a way that is similar to MongoDB. It aim's to be compatible with all MongoDB syntax, but goes overboard on allowing you to do more fun/elegant things if you wish.

MongArr allows...
-----------------
1. You to take an everyday JS array of objects and sub-select using standard MongoDB find() sytax.
2. You to sort an array using similar syntax to MongoDB.
2. You to select out sub-elements of an object using conecptually similar MongoDB syntax.
3. Much more to come.

What's the same?
----------------
1. Basic `find()`/`findOne()` syntax such as `find({ 'subdoc.tags': { $in: [ 'abc', 'zyx' ] })` acts the same.
2. Basic `sort()` syntax such as `sort({ timestamp: -1, name: 1 })` works (nearly completely) the same.

Essentially, if you took a mongodb query, and used MongArr, there's a 95%+ chance you'd see the exact same results. Nearly every operator is supported and originally developed/tested against the MongoDB docs and experimentation.

What's different?
-----------------
MongArr isn't constrained by the index/general architecture limitations that MongoDB inheritently is, so you're allowed to do much more flexible things with "mongo-esque" syntax. Furthermore, mongo treats certain situations, in my mind, illogically. This has been rectified. I must state (again) however that 95%+ of usages won't see those specific differences as they mostly have to do with sparse sub-arrays, expression of "undefined" and such.

That said, understand that MongoArr is allowed to be fully expressive without constraint. This means that `$in` and `$or` can be the same thing, that `{ color: { $ne: 'blue' } }` can be the same as `{ color: { $not: 'blue' } }` which can be the same as `{ $not: { color: 'blue' } }`. Exact operation order means nothing. In fact `$in` is really just `$or`, and `$nin` is really just `$nor`, and `$nand` has been added, and `$where` can be expressed anywhere implictly, for any reason, such as `{ $not: { color: function(color) { return color === 'blue'; } } }`.

Take this concept a bit further, you can even say `{ color: { $nin: [ 'blue', function(color) { return /greene?/.test(color) } } }` or even simply `{ color: { $nin: [ 'blue', /greene?/ ] } }`.

You get the idea. 

MongoArr state...
-----------------
Early alpha. Being such a singularly isolatable piece of code though it's being developed following TDD so the code getting commited is pretty solid. What works is quite likely to keep working through a long life-cylce. I would say feel free to start playing even in production. Just be very weary of the following for the time being...

1. Anything you might pass to it from external input.
2. Anthing the expection of an array when there isn't one (infinte loop). I think it's mostly unlikely, but do a pull request if you find one.
3. Expecting MongoArr to operate *exactly* as MongoDB would. It's close, but don't expect it to be 100%.
4. Expecting MongoArr to throw an error on invalid sytax. It likely won't. It'll just have undefined results.

NodeJS
------
Yes... it works (and currently *only* works because of packaging) in node. I'll add it to npm when we get to a 1.0.0-beta status. For now you can do a npm install git:whatever on it if you want.

Browsers
--------
There's nothing stopping it from it working in browsers. I just need to as some stuff to build it into a nice and neat browser package. If you really want, you can do it manually by stripping out the `requrire()` statements, properly namespacing stuff, and combining/minifying everything.


License
-------
Not decided. I will *probably* release under a permissive BSD or MIT, but I haven't decided. For now, the licensing terms of use are:

1. You ARE free to use this software, directly or indirectly, for non-commercial purposes of any kind.
2. You ARE free to use this software, directly or indirectly, for educational purposes of any kind, under the condition such activitity does not directly result in economic gain.
3. You ARE NOT free to use, directly or indirectly, this softwae of commercial purposess of any kind without expressed written permission from the copyright owner.
4. You may copy this software, make changes, and redistrubte this software, under the conditions that this license statement, the copyright statement, as well as all modified and all unmodifed source code is included.
5. If you believe that any part of this license is ambiguous to any specific purpose, you are REQUIRED to contact the copyright holder for clarification before proceeding with use.

Copyright (C) 2013 G. T. Stobbe <mr.stobbe@gmail.com>. All Rights Reserved.
