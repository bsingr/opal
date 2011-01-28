// @class Array
var rb_cArray;

/**
	Returns a formatted, printable version of the array. #inspect is called on
	each of the elements and appended to the string.
*/
var ary_inspect = function(ary) {
	var description = [];

	for (var i = 0; i < ary.length; i++) {
		description.push(CALL(ary[i], "inspect"));
	}
	
	return "[" + description.join(", ") + "]";
};

/**
	Returns a simple string version of the array. #to_s is applied to each of
	the child elements with no seperator.
*/
var ary_to_s = function() {
	// ARG_COUNT(0)
	var description = [];
	
	for (var i = 0; i < this.length; i++) {
		description.push(CALL(this[i], "to_s"));
	}
	
	return description.join("");
};

/**
	Append - Pushes the given object on to the end of this array. This 
	expression returns the array itself, so several appends may be chained
	together.

	@example
	  [1, 2] << "c" << "d" << [3, 4]
	  # => [1, 2, "c", "d", [3, 4]]

	@param [Object] obj object to append
	@return [Array] returns the receiver
*/
var ary_push = function(val) {
	ARG_COUNT(1)
	this.push(val);
	return this;
};


/**
	Returns the number of elements in `self`. May be zero.

	@example
		[1, 2, 3, 4, 5].length
		# => 5

	@return [Number] length
*/
var ary_length = function(ary) {
	ARG_COUNT(0)
	return ary.length;
};

/**
	Calls block once for each element in `self`, passing that element as a 
	parameter.

	If no block is given, an enumerator is returned instead.

	@note enumerator functionality not yet implemented

	@example
	  a = ["a", "b", "c"]
	  a.each { |x| puts x }
	  # => "a"
	  # => "b"
	  # => "c"

	@return [Array] returns the receiver
*/
var ary_each = function() {
	ARG_COUNT(0)
	RETURN_ENUMERATOR(this, each)
		
	for (var i = 0; i < this.length; i++) {
		PRE_LOOP
		YIELD(this[i]);
		POST_LOOP
	}
	
	return this;
}

function ary_each_with_index(ary, mid, block) {
	ARG_COUNT(0)
	RETURN_ENUMERATOR(ary, each_with_index)
	
	for (var i = 0; i < ary.length; i++) {
		PRE_LOOP
		YIELD(ary[i])
		POST_LOOP
	}
	
	return ary;
}

/**
	Same as {Array#each}, but passes the index of the element instead of the
	element itself.

	If no block given, an enumerator is returned instead.

	@note enumerator functionality not yet implemented.

	@example
	  a = ["a", "b", "c"]
	  a.each_index { |x| puts x }
	  # => 0
	  # => 1
	  # => 2

	@return [Array] returns receiver
*/
function ary_each_index(ary, mid, block) {
	ARG_COUNT(0)
	RETURN_ENUMERATOR(ary, each_index)
	
	for (var i = 0; i < ary.length; i++) {
		PRE_LOOP
		YIELD(i)
		POST_LOOP
	}
	
	return ary;
}

/**
	Append - Pushes the given object(s) on to the end of this array. This 
	expression returns the array itself, so several appends may be chained
	together

	@example
	  a = ["a", "b", "c"]
	  a.push("d", "e", "f")
	  # => ["a", "b", "c", "d", "e", "f"]

	@param [Object] obj the object(s) to push on to the array
	@return [Array] returns the receiver
*/
function ary_push_m(ary, mid, block) {
	for (var i = 2; i < arguments.length; i++) {
		ary.push(arguments[i]);
	}
	
	return ary;
}

/**
	Returns the index of the first object in `self` such that it is `==` to 
	`obj`. If a block is given instead of an argument, returns first object for
	which `block` is true. Returns `nil` if no match is found. See also
	Array#rindex.

	If neither a block nor an argument is given, an enumerator is returned 
	instead.

	@note enumerator functionality not yet implemented.

	@example
	  a = ["a", "b", "c"]
	  a.index("b")
	  # => 1
	  a.index("z")
	  # => nil
	  a.index { |x| x == "b" }
	  # => 1

	@param [Object] object to look for
	@return [Number, nil] result
*/
function ary_index(ary, mid, object) {
	// assume object, not block (for now)
	for (var i = 0; i < ary.length; i++) {
		if (rb_call(ary[i], "==", object).$r)
			return i;
	}
	
	return Qnil;
}

/**
	Returns a new array populated with the given objects.

	@example
	  Array.[](1, 2, 3)
	  # => [1, 2, 3]

	  Array["a", "b", "c"]
	  # => ["a", "b", "c"]

	@param [Object] objs all objects to add to the array
	@return [Array] returns a new array instance
*/
function ary_s_create() {
	return Array.prototype.slice.call(arguments, 2);
}

function ary_alloc() {
	return [];
}

function ary_initialize(ary) {
	for (var i = 2; i < arguments.length; i++) {
		ary.push(arguments[i]);
	}
	
	return ary;
}

/**
	Concatenation - returns a new array built by concatenating the two arrays
	together to produce a third array.

	@example
	  [1, 2, 3] + [4, 5]
	  # => [1, 2, 3, 4, 5]

	@param [Array] other_ary the array to concat with
	@return [Array] returns new concatenated array
*/
function ary_plus(ary, mid, other) {
	ARG_COUNT(1)
	return ary.concat(other);
}

/**
	Array difference. Removes a new array that is a copy of the original array,
	removing any items that also appear in other_ary.

	@example
	  [1, 1, 2, 2, 3, 3, 4, 5] - [1, 2, 4]
	  # => [3, 3, 5]

	@param [Array] other_ary array to use for difference
	@return [Array] new array
*/
function ary_diff(ary, mid, other) {
	rb_raise(rb_eException, "Array#- not implemented");
}

/**
	Equality - Two arrays are equal if they contain the same number of elements
	and if each element is equal to (according to {Object#==}) the corresponding
	element in the other array.

	@example
	  ["a", "c"] == ["a", "c", 7]
	  # => false

	  ["a", "c", 7] == ["a", "c", 7]
	  # => true

	  ["a", "c", 7] == ["a", "d", "f"]
	  # => false

	@param [Array] other array to compare
	@return [Boolean] are arrays equal
*/
function ary_equal(ary, mid, other) {
	ARG_COUNT(1)
	
	if (ary.$hash() == other.$hash()) return Qtrue;
	if (!(other.$flags & T_ARRAY)) return Qfalse;
	if (ary.length != other.length) return Qfalse;
	
	for (var i = 0; i < ary.length; i++) {
		if (!rb_call(ary[i], "==", other[i]).$r)
			return Qfalse;
	}
	
	return Qtrue;
};

/**
	Searches through an array whose elements are also arrays comparing `obj`
	with the first element of each contained array using `obj.==`. Returns the
	first contained array that matches (that is, the first associated array), or
	`nil` if no match is found. See also {Array#rassoc}

	@example
	  s1 = ["colors", "red", "blue", "green"]
	  s2 = ["letters", "a", "b", "c"]
	  s3 = "foo"
	  a = [s1, s2, s3]
	  a.assoc "letters"
	  # => ["letter", "a", "b", "c"]
	  a.assoc "foo"
	  # => nil
*/
function ary_assoc(ary, mid, obj) {
	ARG_COUNT(1)
	var arg;
	
	for (var i = 0; i < ary.length; i++) {
		arg = ary[i];
		
		if ((arg.$flags & T_ARRAY) && arg.length && rb_call(arg[0], "==", obj).$r)
			return arg;
	}
	
	return Qnil;
}

/**
	Returns the element at `index`. A negative index count from the end of the
	receiver. Returns `nil` if the index is out of range. See also `Array#[]`.

	@example
	  a = ["a", "b", "c", "d", "e"]
	  a.at 0
	  # => "a"
	  a.at -1
	  # => "e"

	@param [Number] index index to get
	@return [Object, nil] returns nil or the result
*/
function ary_at(ary, mid, idx) {
	ARG_COUNT(1)
	// make sure idx is a number. Try to use #to_int
	if (!IS_NUMBER(idx.$flags)) {
		// if it responds to to_int
		if (idx.$m.$to_int)
			rb_raise(rb_eException, "need to call to_int");
		else
			rb_arg_error_int(idx);
	}
	
	if (idx < 0)
		idx += ary.length;
	
	if (idx < 0 || idx >= ary.length)
		return Qnil;
		
	return ary[idx];
}

/**
	Removes all elements from `self`.

	@example
	  a = ["a", "b", "c", "d", "e"]
	  a.clear
	  # => []

	@return [Array] returns receiver
*/
function ary_clear(ary, mid) {
	ARG_COUNT(0)
	ary.splice(0);
	return ary;
}

/**
	Invokes the block passing in successive elements from `self`, returning an
	array containing those elements for which the block returns a true value.

	@note enumerator functionality is not yet implemented.

	@example
	  a = [1, 2, 3, 4, 5, 6]
	  a.select { |x| x > 4 }
	  # => [5, 6]

	@return [Array] returns array
*/
function ary_select(ary, mid, block) {
	ARG_COUNT(0)
	RETURN_ENUMERATOR(ary, select)
	
	var result = [], arg;
	
	for (var i = 0; i < ary.length; i++) {
		PRE_LOOP
		arg = ary[i];
			
		if (RTEST(YIELD(arg)))
			result.push(arg);
		
		POST_LOOP
	}
	
	return result;
}

/**
	Invokes `block` once for each element of `self`. Creates a new array
	containing the values returned by the block. See also {Enumerable#collect}.

	If no block is given, an anumerator is returned instead.

	@todo No enumerator is returned when no block given.

	@example
	  a = ["a", "b", "c", "d"]
	  a.collect { |x| x + "!" }
	  # => ["a!", "b!", "c!", "d!"]
	  a
	  # => ["a", "b", "c", "d"]
 
	@return [Array] new array
*/
function ary_collect(ary, mid, block) {
	ARG_COUNT(0)
	RETURN_ENUMERATOR(ary, collect)
	
	var result = [];
	
	for (var i = 0; i < ary.length; i++) {
		PRE_LOOP
		result.push(YIELD(ary[i]));
		POST_LOOP
	}
	
	return result;
}

/**
	Invokes the `block` once for each element of `self`, replacing the element 
	with the value returned by `block`. See also Enumerable#collect.

	If no block is given, an enumerator is returned instead.

	@todo no block given does not return an enumerator

	@example
	  a = ["a", "b", "c", "d"]
	  a.collect { |x| x + "!" }
	  # => ["a!", "b!", "c!", "d!"]
	  a
	  # => ["a!", "b!", "c!", "d!"]

	@return [Array] returns receiver
*/
function ary_collect_bang(ary, mid, block) {
	ARG_COUNT(0)
	RETURN_ENUMERATOR(ary, collect!)
	
	for (var i = 0; i < ary.length; i++) {
		PRE_LOOP
		ary[i] = YIELD(ary[i])
		POST_LOOP
	}
	
	return ary;
};

/**	
	Array#dup
*/
function ary_dup(ary, mid, block) {
	return ary.slice(0);
};

/**
	Returns a copy of `self` with all `nil` elements removed.

	@example
	  ["a", nil, "b", nil, "c", nil].compact
	  # => ["a", "b", "c"]

	@return [Array] new array
*/
function ary_compact(ary, mid) {
	ARG_COUNT(0)
	var result = [], length = ary.length;
	
	for (var i = 0; i < length; i++) {
	  if (ary[i] != Qnil) {
	    result.push(ary[i]);
	  }
	}
	
	return result;
}

/**
	Removes nil elements from the array. Returns nil if no changes were made,
	otherwise returns ary.

	@example
	  ["a", nil, "b", nil, "c", nil].compact!
	  # => ["a", "b", "c"]

	  ["a", "b", "c"].compact!
	  # => nil

	@return [Array, nil] returns either the receiver or nil
*/
function ary_compact_bang(ary, mid) {
	ARG_COUNT(0)
	var length = ary.length;
	
	for (var i = 0; i < ary.length; i++) {
		if (ary[i] == Qnil) {
			ary.splice(i, 1);
			i--;
		}
	}
	
	return length == ary.length ? Qnil : ary;
}

/**
	Appends the elements of `other_ary` to `self`

	@example
	  ["a", "b"].concat ["c", "d"]
	  # => ["a", "b", "c", "d"]

	@param [Array] other_ary array to concat
	@return [Array] returns receiver
*/
function ary_concat(ary, mid, other) {
	ARG_COUNT(1)
	var length = other.length;
	
	for (var i = 0; i < length; i++) {
		ary.push(other[i]);
	}
	
	return ary;
}

/**
	Returns the number of elements. If an argument is given, counts the number
	of elements which equals to `obj`. If a block is given, counts the number of
	elements yielding a true value.

	@note Block usage not yet implemented

	@example
	  ary = [1, 2, 4, 2]
	  ary.count
	  # => 4
	  ary.count(2)
	  # => 2

	@param [Object] obj object to check
	@return [Number] count or count of obj
*/
function ary_count(ary, mid, obj) {
	if (obj != undefined) {
		var total = 0;
		
		for (var i = 0; i < ary.length; i++) {
			if (rb_call(ary[i], "==", obj).$r)
				total++;
		}
		
		return total;
	} else {
		return ary.length;
	}
}

/**
	Deletes items from `self` that are equal to `obj`. If any items are found, 
	returns `obj`. If the itme is not found, returns `nil`. If the optional code
	block is given, returns the result of `block` if the item is not found. (To
	remove nil elements and get an informative return value, use {#compact!})

	@todo block is not yet used

	@example
	  a = ["a", "b", "b", "b", "c"]
	  a.delete("b")
	  # => "b"
	  a
	  # => ["a", "c"]
	  a.delete("z")
	  # => nil
	  a.delete("z") { "not found" }
	  # => "not found"

	@param [Object] obj object to delete
	@return [Object, nil] returns obj or nil
*/
function ary_delete(ary, mid, obj) {
	ARG_COUNT(1)
	var length = ary.length;
	
	for (var i = 0; i < ary.length; i++) {
		if (rb_call(ary[i], "==", obj).$r) {
			ary.splice(i, 1);
			i--;
		}
	}
	
	return length == ary.length ? Qnil : obj;
}

/**
	Deletes the element at the specified index, returning that element, or `nil`
	if the index is out of range. See also Array#slice!.

	@example
	  a = ["ant", "bat", "cat", "dog"]
	  a.delete_at(2)
	  # => "cat"
	  a
	  # => ["ant", "bat", "dog"]
	  a.delete_at(99)
	  # => 99

	@param [Number] index the index to delete
	@return [Object, nil] returns obj at index or nil
*/
function ary_delete_at_m(ary, mid, index) {
	ARG_COUNT(1)
	TO_NUMBER(index)
	
	if (index < 0) index += ary.length;
	if (index < 0 || index >= ary.length) return Qnil;
	var res = ary[index];
	ary.splice(index, 1);
	return res;
}

/**
	Deletes every element of `self` for which `block` evaluates to true. See
	also Array#reject!.

	If no block is given, an enumerator is returned instead.

	@note no enumerator is currently returned.

	@example
	  a = [1, 2, 3]
	  a.delete_if { |x| x >= 2 }
	  # => [1]

	@return [Array] returns amended receiver
*/
function ary_delete_if(ary, mid, block) {
	ARG_COUNT(0)
	
	for (var i = 0; i < ary.length; i++) {
		PRE_LOOP
		if (RTEST(YIELD(ary[i]))) {
			ary.splice(i, 1);
			i--;
		}
		POST_LOOP
	}
	
	return ary;
}

/**
	Drop first `n` elements from receiver, and returns rest elements in array.

	@example
	  a = [1, 2, 3, 4, 5, 0]
	  a.drop 3
	  # => [4, 5, 0]

	@param [Number] n number to drop
	@return [Array] returns a new array
*/
function ary_drop(ary, mid, n) {
	ARG_COUNT(1)
	TO_NUMBER(n)
	
	if (n > ary.length) return [];
	return ary.slice(n);
}

/**
	Drop elements up to, but not including, the first element for which block
	returns `nil` or `false` and returns an array containing the remaining
	elements. 

	If no block is given, an enumerator is returned instead.

	@note returning an enumerator is not yet implemented

	@example
	  a = [1, 2, 3, 4, 5, 0]
	  a.drop_while { |i| i < 3 }
	  # => [3, 4, 5, 0]

	@return [Array] returns new array
*/
function ary_drop_while(ary, mid, block) {
	ARG_COUNT(0)
	RETURN_ENUMERATOR(ary, drop_while)
	
	for (var i = 0; i < ary.length; i++) {
		if (!block(block.$self, Qnil, ary[i]).$r)
			return ary.slice(i);
	}
	
	return [];
};

/**
	Returns `true` if `self` contains no elements, `false` otherwise

	@example
	  [].empty?
	  # => true

	@return [Boolean] empty or not
*/
function ary_empty_p(ary, mid) {
	ARG_COUNT(0)
	return ary.length == 0 ? Qtrue : Qfalse;
}

/**
	Tries to return the element at position `index`. If the index lies outside
	the array, the first form throws an `IndexError` exception, the second form
	returns `default`, and the third form returns the value of invoking the 
	block, passing in the index. Negative values of `index` count from the end
	of the array.

	@example First form
	  a = [11, 22, 33, 44]
	  a.fetch(1)
	  # => 22
	  a.fetch(-1)
	  # => 44

	@example Second form
	  a.fetch(4, 'cat')
	  # => "cat"

	@example Third form
	  a.fetch(4) { |i| i * i }
	  # => 16

	@param [Number] index
	@param [Object] defaults
	@return [Object] returns result
*/
function ary_fetch(ary, mid, index, defaults) {
	var original = index;
	
	if (index < 0) index += ary.length;
	if (index < 0 || index >= ary.length) {
		if (defaults == undefined) {
			rb_raise(rb_eIndexError, "Array#fetch");
		} else if (block != Qnil) {
			return YIELD(original);
		} else {
			return defaults;
		}
	}
	
	return ary[index];
}

/**
	Returns the first element, or the first `n` elements, of the array. If the
	array is empty, the first form returns `nil`, and the second form returns an
	empty array.

	@example
	  a = ["q", "r", "s", "t"]
	  a.first
	  # => "q"
	  a.first(2)
	  # => ["q", "r"]

	@param [Number] n number of elements
	@return [Object, Array] object or array of objects
*/
function ary_first(ary, mid, count) {
	if (count == undefined) {
		if (ary.length == 0) return Qnil;
		return ary[0];
	}
	return ary.slice(0, count);
}

/**
	Returns a new array that is a one-dimensional flattening of this array
	(recursively). That is, for every element that is an array, extract its
	elements info the new array. If the optional `level` argument determines the
	level of recursion to flatten.

	@example
	  s = [1, 2, 3]
	  # => [1, 2, 3]
	  t = [4, 5, 6, [7, 8]]
	  # => [4, 5, 6, [7, 8]]
	  a = [s, t, 9, 10]
	  # => [[1, 2, 3], [4, 5, 6, [7, 8]], 9, 10]
	  a.flatten
	  # => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	  a = [1, 2, [3, [4, 5]]]
	  a.flatten(1)
	  # => [1, 2, 3, [4, 5]]

	@param [Number] level the level to flatten
	@return [Array] returns new array
*/
function ary_flatten(ary, mid, level) {
	var result = [], item;
	
	for (var i = 0; i < ary.length; i++) {
		item = ary[i];
		
		if (IS_ARRAY(item)) {
			if (level == undefined)
				result = result.concat(rb_call(item, "flatten"));
			else if (level == 0)
				result.push(item);
			else
				result = result.concat(rb_call(item, "flatten", level - 1));
		} else {
			result.push(item);
		}
	}
	
	return result;
}

/**
	Flattens `self` in place. Returns `nil` if no modifications were made (i.e.,
	`ary` contains no subarrays.) If the optional `level` argument determines 
	the level of recursion to flatten.

	@todo current implementation is probably not all that ideal.. (efficiency)

	@example
	 a = [1, 2, [3, [4, 5]]]
	 a.flatten!
	 # => [1, 2, 3, 4, 5]
	 a.flatten!
	 # => nil
	 a
	 # => [1, 2, 3, 4, 5]

	@param [Number] level to flatten to
	@return [Array] returns receiver
*/
function ary_flatten_bang(ary, mid, level) {
	var length = ary.length;
	var result = rb_call(ary, "flatten", level);
	ary.splice(0);
	for (var i = 0; i < result.length; i++) 
		ary.push(result[i]);
		
	if (ary.length == length)
		return Qnil;
	
	return ary;
}

/**
	Returns `true` if the given object is present in `self`, `false` otherwise.

	@example
	  a = ["a", "b", "c"]
	  a.include? "b"
	  # => true
	  a.include? "z"
	  # => false
*/
function ary_include_p(ary, mid, member) {
	ARG_COUNT(1)
	
	for (var i = 0; i < ary.length; i++) {
		if (rb_call(ary[i], "==", member).$r)
			return Qtrue;
	}
	
	return Qfalse;
}

/**
	Replaces the contents of `self` with the contents of `other_ary`, truncating
	or expanding if necessary.

	@example
	  a = ["a", "b", "c", "d", "e"]
	  a.replace ["x", "y", "z"]
	  # => ["x", "y", "z"]
	  a
	  # => ["x", "y", "z"]

	@param [Array] other_ary array to replace with
	@return [Array] returns receiver
*/
function ary_replace(ary, mid, other) {
	ARG_COUNT(1)
	TO_ARRAY(other)
	
	ary.splice(0);
	for (var i = 0; i < other.length; i++) {
		ary.push(other[i]);
	}
	return ary;
}

/**
	Inserts the given values before the element with the given index (which may
	be negative).

	@example
	  a = ["a", "b", "c", "d"]
	  a.insert(2, 99)
	  # => ["a", "b", 99, "c", "d"]
	  a.insert(-2, 1, 2, 3)
	  # => ["a", "b", 99, "c", 1, 2, 3, "d"]

	@param [Number] index index for insertion
	@param [Object] obj objects to insert
	@return [Array] returns the receiver
*/
function ary_insert(ary, mid, index, obj) {
	obj = Array.prototype.slice.call(2);
	if (index < 0) index += self.length;
	if (index < 0 || index >= self.length)
		rb_raise(rb_eIndexError, "out of range");
		
	ary.splice.apply(ary, [index, 0].concat(obj));
	return ary;
}

/**
	Returns a string created by converting each element of the array to a string
	separated by `sep`.

	@example
	  ["a", "b", "c"].join
	  # => "abc"
	  ["a", "b", "c"].join '-'
	  "a-b-c"

	@param [String] sep the separator
	@return [String] joined string
*/
function ary_join(ary, mid, sep) {
	if (sep == undefined) sep = "";
	var result = []
	
	for (var i = 0; i < ary.length; i++) {
		result.push(rb_call(ary[i], "to_s"));
	}
	
	return result.join(sep);
}

/**
	Deletes every element of `self` for which `block` evaluates to false. See
	also Array#select!

	If no block given, an enumerator is returned instead.

	@todo No enumerator currently returned.

	@example
	  a = [1, 2, 3, 4, 5, 6]
	  a.keep_if { |x| x < 4 }
	  # => [1, 2, 3]

	@return [Array] receiver
*/
function ary_keep_if(ary, mid, block) {
	ARG_COUNT(0)
	for (var i = 0; i < ary.length; i++) {
		if (!block(block.$self, Qnil, ary[i]).$r) {
			ary.splice(i, 1);
			i--;
		}
	}
	
	return ary;
}

/**
	Return the last element(s) of `self`. If the array is empty, the first form
	returns `nil`.

	@example
	  a = ["w", "x", "y", "z"]
	  a.last
	  # => "z"
	  a.last(2)
	  # => ["y", "z"]

	@param [Number] n number of items to get
	@return [Object, Array] result
*/
function ary_last(ary, mid, n) {
	if (n == undefined) {
		if (ary.length == 0) return Qnil;
		return ary[ary.length - 1];
	} else {
	  if (n > ary.length) n = ary.length;
		return ary.slice(ary.length - n, ary.length);
	}
}

/**
	Removes the last element from `self` and returns it, or `nil` if array is
	empty.

	If a number `n` is given, returns an array of the last n elements (or less)
	just like `array.slice!(-n, n) does.

	@example
	  a = ["a", "b", "c", "d"]
	  a.pop
	  # => "d"
	  a.pop(2)
	  # => ["b", "c"]
	  a
	  # => ["a"]

	@param [Number] n number to pop
	@return [Array] returns receiver
*/
function ary_pop(ary, mid, n) {
	if (n == undefined) {
		if (ary.length) return ary.pop();
		return Qnil;
	} else {
		return ary.splice(ary.length - n, ary.length);
	}
}

/**
	Searches through the array whose elements are also arrays. Comapres `obj`
	with the second element of each contained array using `==`. Returns the 
	first contained array that matches. See also {Array#assoc}.

	@example
	  a = [[1, "one"], [2, "two"], [3, "three"], ["ii", "two"]]
	  a.rassoc("two")
	  # => [2, "two"]
	  a.rassoc("four")
	  # => nil

	@param [Object] obj object to search for
	@return [Object, nil] result or nil
*/
function ary_rassoc(ary, mid, obj) {
	ARG_COUNT(1)
	var test;
	for (var i = 0; i < ary.length; i++) {
		test = ary[i];
		if (test.$flags & T_ARRAY && test[1] != undefined && 
			rb_call(test[1], "==", obj).$r) {
				return test;
			}
	}
	
	return Qnil;
}

/**
	Returns a new array containing the items in `self` for which the block is
	not true. See also {Array#delete_if}.

	If no block is given, an enumerator is returned instead.

	@note Enumerator functionality not yet implemented.

	@example
	  a = [1, 2, 3, 4, 5, 6]
	  a.reject { |x| x > 3 }
	  # => [1, 2, 3]
	  a
	  # => [1, 2, 3, 4, 5, 6]

	@return [Array] returns array
*/
function ary_reject(ary, mid, block) {
	ARG_COUNT(0)
	var result = [];
	
	for (var i = 0; i < ary.length; i++) {
		if (!block(block.$self, Qnil, ary[i]).$r)
			result.push(ary[i]);
	}
	
	return result;
}

/**
	Equivalent to {Array#delete_if}, deleting elements from `self` for which the
	block evaluates to true, but returns `nil` if no changes were made. See also
	{Array#delete_if}.

	If no block is given, an enumerator is returned instead.
 
	@note Enumerator functionality is not yet implemented.

	@example
	  a = [1, 2, 3, 4, 5, 6]
	  a.reject! { |x| x > 3 }
	  # => [1, 2, 3]
	  a.reject! { |x| x > 3 }
	  # => nil
	  a
	  # => [1, 2, 3]

	@return [Array] returns receiver
*/
function ary_reject_bang(ary, mid, block) {
	ARG_COUNT(0)
	var length = ary.length;
	
	for (var i = 0; i < ary.length; i++) {
		if (block(block.$self, Qnil, ary[i]).$r) {
			ary.splice(i, 1);
			i--;
		}
	}
	
	return ary.length == length ? Qnil : ary;
}

/**
	Returns a new array containing `self`'s elements in reverse order.

	@example
	  ["a", "b", "c"].reverse
	  # => ["c", "b", "a"]
	  [1].reverse
	  # => [1]

	@return [Array] reversed array
*/
function ary_reverse(ary, mid, block) {
	ARG_COUNT(0)
	var result = [];
	
	for (var i = ary.length - 1; i >= 0; i--)
		result.push(ary[i]);
	
	return result;
}

/**
	Reverses `self` in place.

	@example
	  a = ["a", "b", "c"]
	  a.reverse!
	  # => ["c", "b", "a"]
	  a
	  # => ["c", "b", "a"]

	@return [Array] returns receiver
*/
function ary_reverse_bang(ary, mid) {
	ARG_COUNT(0)
	var length = ary.length / 2;
	var tmp;
	
	for (var i = 0; i < length; i++) {
		tmp = ary[i];
		ary[i] = ary[ary.length - (i + 1)];
		ary[ary.length - (i + 1)] = tmp;
	}
	
	return ary;
}

/**
	Same as {Array#each}, but traverses `self` in reverse order.

	@example
	  a = ["a", "b", "c"]
	  a.reverse_each { |x| puts x }
	  # => "c"
	  # => "b"
	  # => "a"

	@return [Array] returns receiver
*/
function ary_reverse_each(ary, mid, block) {
	ARG_COUNT(0)
	RETURN_ENUMERATOR(ary, reverse_each)
	
	for (var i = ary.length - 1; i >= 0; i--) {
		PRE_LOOP
		YIELD(ary[i]);
		POST_LOOP
	}
	
	return ary;
}

/**
	Returns the index of the last object in `self` == to `object`. If a block is
	given instead of an argument, returns the first object for which `block` is
	true, starting from the last object. Returns `nil` if no match is found. See
	also {Array#index}.

	@example
	  a = ["a", "b", "b", "b", "c"]
	  a.rindex("b")
	  # => 3
	  a.rindex("z")
	  # => nil
	  a.rindex { |x| x == "b" }
	  # => 3

	@return [Object, nil] returns result or nil
*/
function ary_rindex(ary, mid, object) {
	if (object != undefined) {
		for (var i = ary.length - 1; i > 0; i--) {
			if (rb_call(ary[i], "==", object).$r)
				return i;
		}
	} else if (block != Qnil) {
		rb_raise(rb_eException, "need to rindex deal with block")
	} 
	
	return Qnil;
}

/**
	Invokes the block passing in successive elements from `self`, deleting the
	elements for which the block returns a false value. It returns `self` if
	changes were made, otherwise it returns `nil`. See also {Array#keep_if}.

	If no block is given, an enumerator is returned instead.

	@note Enumerator functionality not yet implemented.

	@example
	  a = [1, 2, 3, 4, 5, 6]
	  a.select! { |x| x > 4 }
	  # => [5, 6]
	  a.select! { |x| x > 4 }
	  # => nil
	  a
	  # => [5, 6]

	@return [Array] returns receiver
*/
function ary_select_bang(ary, mid, block) {
	ARG_COUNT(0)
	RETURN_ENUMERATOR(ary, select!)
	
	var length = ary.length;
	
	for (var i = 0; i < ary.length; i++) {
		if (!RTEST(YIELD(ary[i]))) {
			ary.splice(i, 1);
			i--;
		}
	}
	
	return ary.length == length ? Qnil : ary;
}

/**
	Returns the first element of `self` and removes it (shifting all other 
	elements down by one). Returns `nil` if the array is empty.

	If a number `n` is given, returns an array of the first n elements (or less)
	just like array.slice!(0, n) does.

	@example
	  a = ["a", "b", "c"]
	  a.shift
	  # => "a"
	  a
	  # => ["b", "c"]
	  a = ["a", "b", "c"]
	  a.shift(2)
	  # => ["b", "c"]
	  a
	  # => ["c"]

	@param [Number] n elements to shift
	@return [Array] result
*/
function ary_shift(ary, mid, n) {
	if (n != undefined)
		return ary.splice(0, n);
	
	if (ary.length)
		return ary.shift();
		
	return Qnil;
}

/**
	Deletes the element(s) given by an `index` (optionally with a length) or by
	a range. Returns the deleted object(s), or `nil` if the index is out of
	range.

	@example
	  a = ["a", "b", "c"]
	  a.slice!(1)
	  # => "b"
	  a
	  # => ["a", "c"]
	  a.slice!(-1)
	  # => "c"
	  a
	  # => ["a"]
	  a.slice!(100)
	  # => nil
	  a
	  # => ["a"]

	@todo Does not yet work with ranges.

	@param [Range, Number] index to begin with
	@param [Number] length last index
	@return [Array, nil] result
*/
function ary_slice_bang(ary, mid, index, length) {
	var size = ary.length;
	
	if (index.$flags & T_RANGE) {
		rb_raise(rb_eException, "need to implement range");
	} else {
		if (index < 0) index += size;
	}
	
	if (index >= size || index < 0) return Qnil;
	
	if (length != undefined) {
		if (length <= 0 || length > ary.length) return Qnil;
		return ary.splice(index, index + length);
	} else {
		return ary.splice(index, 1)[0];
	}
}

/**
	Returns first `n` elements from ary.

	@example
	  a = [1, 2, 3, 4, 5, 0]
	  a.take(3)
	  # => [1, 2, 3]

	@return [Array] array of elements
*/
function ary_take(ary, mid, n) {
	ARG_COUNT(1)
	return ary.slice(0, n);
}

/**
	Passes elements to the block until the block returns `nil` or `false`, then
	stops iterating and returns an array of all prior elements.

	If no block given, an enumerator is returned instead.

	@todo Enumerator functionality not yet implemented.

	@example
	  a = [1, 2, 3, 4, 5, 6]
	  a.take_while { |i| i < 3 }
	  # => [1, 2]

	@return [Array] array with elements
*/
function ary_take_while(ary, mid, block) {
	ARG_COUNT(0)
	
	var result = [];
	
	for (var i = 0; i < ary.length; i++) {
		if (block(block.$self, Qnil, ary[i]).$r)
			result.push(ary[i]);
		else
			break;
	}
	
	return result;
}

/**
	Returns self.

	@example
	  a = [1, 2, 3]
	  a.to_a
	  # => [1, 2, 3]

	@return [Array] returns the receiver
*/
function ary_to_a(ary, mid) {
	ARG_COUNT(0)
	return ary;
}

/**
	Returns a new array by removing duplicate values in `self`.

	@example

	  a = ["a", "a", "b", "b", "c"]
	  a.uniq
	  # => ["a", "b", "c"]
	  a
	  # => ["a", "a", "b", "b", "c"]

	@return [Array]
*/
function ary_uniq(ary, mid) {
	ARG_COUNT(0)
	var result = [], seen = [];
	
	for (var i = 0; i < ary.length; i++) {
		var test = ary[i], hash = test.$hash();
		if (seen.indexOf(hash) == -1) {
			seen.push(hash);
			result.push(test);
		}
	}
	
	return result;
}

/**
	Removes duplicate elements from `self`. Returns `nil` if no changes are
	made (that is, no duplicates are found).

	@example
	
	  a = ["a", "a", "b", "b", "c"]
	  a.uniq!
	  # => ["a", "b", "c"]
	  a.uniq!
	  # => nil

	@return [Array] returns receiver
*/
function ary_uniq_bang(ary, mid) {
	ARG_COUNT(0)
	var seen = [], length = ary.length;
	
	for (var i = 0; i < ary.length; i++) {
		var test = ary[i], hash = test.$hash();
		if (seen.indexOf(hash) == -1) {
			seen.push(hash)
		} else {
			ary.splice(i, 1);
			i--;
		}
	}
	
	return ary.length == length ? Qnil : ary;
}

/**
	Prepends objects to the front of `self`, moving other elements upwards.

	@example

	  a = ["b", "c", "d"]
	  a.unshift("a")
	  # => ["a", "b", "c", "d"]
	  a.unshift(1, 2)
	  # => [1, 2, "a", "b", "c", "d"]

	@param [Object] object objects to add
	@return [Array] returns receiver
*/
function ary_unshift(ary, mid) {
	var obj = Array.prototype.slice.call(arguments, 2);
	
	for (var i = obj.length - 1; i >= 0; i--) {
		ary.unshift(obj[i]);
	}
	
	return ary;
}

/**
	Set Intersection - Returns a new array containing elements common to the two 
	arrays, with no duplicates.

	@example

	  [1, 1, 3, 5] & [1, 2, 3]
	  # => [1, 3]

	@param [Array] other another array to intersect.
	@return [Array] intersected array
*/
function ary_and(ary, mid, other) {
	ARG_COUNT(1)
	var result = [], seen = [];
	
	for (var i = 0; i < ary.length; i++) {
		var test = ary[i], hash = test.$hash();
		
		if (seen.indexOf(hash) == -1) {
			for (var j = 0; j < other.length; j++) {
				var test_b = other[j], hash_b = test_b.$hash();
				
				if ((hash == hash_b) && seen.indexOf(hash) == -1) {
					seen.push(hash);
					result.push(test);
				}
			}
		}
	}
	
	return result;
}

/**
	Repitition - When given a string argument, acts the same as {#join}. 
	Otherwise, returns a new array built by concatenating the `num` copies of
	`self`.

	@example With Number

	  [1, 2, 3] * 3
	  # => [1, 2, 3, 1, 2, 3, 1, 2, 3]

	@example With String

	  [1, 2, 3] * ','
	  # => "1,2,3"

	@param [String, Number] num string or number used for joining/concat
	@result [String, Array] depending on argument
*/
function ary_times(ary, mid, arg) {
	ARG_COUNT(1)
	if (arg.$flags & T_STRING) {
		return ary_join(ary, Qnil, arg);
	} else {
		var result = [];
		for (var i = 0; i < parseInt(arg); i++) {
			result = result.concat(ary);
		}
		return result;
	}
}

/**
	Element Reference - Returns the element at `index`, or returns a subarray at
	`index` and continuing for `length` elements, or returns a subarray if 
	`index` is a range. Negative indices count backward from the end of the 
	array (`-1` is the last element). Returns `nil` if the index (or starting
	index) are out of range.

	@example
	  a = ["a", "b", "c", "d", "e"]
	  a[2] + a[0] + a[1]
	  # => "cab"
	  a[6]
	  # => nil
	  a[1, 2]
	  # => ["b", c""]
	  a[1..3]
	  # => ["b", "c", "d"]
	  a[4..7]
	  # => ["e"]
	  a[6..10]
	  # => nil
	  a[-3, 3]
	  # => ["c", "d", "e"]
	  a[5]
	  # => nil
	  a[5, 1]
	  # => []
	  a[5..10]
	  # => []

	@todo Does not yet work with ranges.

	@param [Range, Number] index to begin with
	@param [Number] length last index
	@return [Array, nil] result
*/
var ary_aref = function(ary, index, length) {
	var size = ary.length;
	
	if (index.$info & T_RANGE)
		rb_raise(rb_eException, "need to implement range in Array#[]");
	else
		if (index < 0) index += size;
	
	if (index >= size || index < 0) return Qnil;
	
	if (length != undefined) {
		if (length <= 0) return [];
		return ary.slice(index, index + length);
	} else {
		return ary[index];
	}
}

/**
	Todo: need to expand functionality
*/
function ary_aset(ary, mid, index, value) {
	return ary[index] = value;
}

// Arrays are ordered, indexed by integers starting at 0.
// 
// ## Implementation details
// 
// For efficiency, an array instance is simply a native javascript array. There
// is no wrapping or referencing, it is simply a toll-free class.
var Init_Array = function() {
  
  // debug support for filename
	var filename = "opal/runtime/object.js";
	// @class Array
	rb_cArray = rb_define_toll_free_class(Array.prototype, T_OBJECT | T_ARRAY,
		 																	 'Array', rb_cObject);

	// fix for array hash. create it if not already created..
	Array.prototype.$hash = function() {
	  if (this.$id) return this.$id;

	  return this.$id = opal_yield_hash();
	};
	
	rb_define_singleton_method(rb_cArray, "[]", ary_s_create);
	rb_define_singleton_method(rb_cArray, "allocate", ary_alloc, filename);
	rb_define_method(rb_cArray, "initialize", ary_initialize, filename);
	
	rb_define_method(rb_cArray, "inspect", ary_inspect, filename);
	rb_define_method(rb_cArray, "to_s", ary_to_s, filename);
	
	rb_define_method(rb_cArray, "length", ary_length, filename);
	rb_define_alias(rb_cArray, "size", "length", filename);
	rb_define_method(rb_cArray, "<<", ary_push, filename);
	
	rb_define_method(rb_cArray, "each", ary_each, filename);
	rb_define_method(rb_cArray, "each_with_index", ary_each_with_index, filename);
	rb_define_method(rb_cArray, "each_index", ary_each_index, filename);
	rb_define_method(rb_cArray, "push", ary_push_m, filename);
	rb_define_method(rb_cArray, "index", ary_index, filename);
	rb_define_method(rb_cArray, "+", ary_plus, filename);
	rb_define_method(rb_cArray, "-", ary_diff, filename);
	rb_define_method(rb_cArray, "==", ary_equal, filename);
	rb_define_method(rb_cArray, "assoc", ary_assoc, filename);
	rb_define_method(rb_cArray, "at", ary_at, filename);
	rb_define_method(rb_cArray, "clear", ary_clear, filename);
	rb_define_method(rb_cArray, "select", ary_select, filename);
	rb_define_method(rb_cArray, "collect", ary_collect, filename);
	rb_define_method(rb_cArray, "map", ary_collect, filename);
	rb_define_method(rb_cArray, "collect!", ary_collect_bang, filename);
	rb_define_method(rb_cArray, "map!", ary_collect_bang, filename);
	rb_define_method(rb_cArray, "dup", ary_dup, filename);
	rb_define_method(rb_cArray, "compact", ary_compact, filename);
	rb_define_method(rb_cArray, "compact!", ary_compact_bang, filename);
	rb_define_method(rb_cArray, "concat", ary_concat, filename);
	rb_define_method(rb_cArray, "count", ary_count, filename);
	rb_define_method(rb_cArray, "delete", ary_delete, filename);
	rb_define_method(rb_cArray, "delete_at", ary_delete_at_m, filename);
	rb_define_method(rb_cArray, "delete_if", ary_delete_if, filename);
	rb_define_method(rb_cArray, "drop", ary_drop, filename);
	rb_define_method(rb_cArray, "drop_while", ary_drop_while, filename);
	rb_define_method(rb_cArray, "empty?", ary_empty_p, filename);
	rb_define_method(rb_cArray, "fetch", ary_fetch, filename);
	rb_define_method(rb_cArray, "first", ary_first, filename);
	rb_define_method(rb_cArray, "flatten", ary_flatten, filename);
	rb_define_method(rb_cArray, "flatten!", ary_flatten_bang, filename);
	rb_define_method(rb_cArray, "include?", ary_include_p, filename);
	rb_define_method(rb_cArray, "replace", ary_replace, filename);
	rb_define_method(rb_cArray, "insert", ary_insert, filename);
	rb_define_method(rb_cArray, "join", ary_join, filename);
	rb_define_method(rb_cArray, "keep_if", ary_keep_if, filename);
	rb_define_method(rb_cArray, "last", ary_last, filename);
	rb_define_method(rb_cArray, "pop", ary_pop, filename);
	rb_define_method(rb_cArray, "rassoc", ary_rassoc, filename);
	rb_define_method(rb_cArray, "reject", ary_reject, filename);
	rb_define_method(rb_cArray, "reject!", ary_reject_bang, filename);
	rb_define_method(rb_cArray, "reverse", ary_reverse, filename);
	rb_define_method(rb_cArray, "reverse!", ary_reverse_bang, filename);
	rb_define_method(rb_cArray, "reverse_each", ary_reverse_each, filename);
	rb_define_method(rb_cArray, "rindex", ary_rindex, filename);
	rb_define_method(rb_cArray, "select!", ary_select_bang, filename);
	rb_define_method(rb_cArray, "shift", ary_shift, filename);
	rb_define_method(rb_cArray, "slice!", ary_slice_bang, filename);
	rb_define_method(rb_cArray, "take", ary_take, filename);
	rb_define_method(rb_cArray, "take_while", ary_take_while, filename);
	rb_define_method(rb_cArray, "to_a", ary_to_a, filename);
	rb_define_method(rb_cArray, "to_ary", ary_to_a, filename);
	rb_define_method(rb_cArray, "uniq", ary_uniq, filename);
	rb_define_method(rb_cArray, "uniq!", ary_uniq_bang, filename);
	rb_define_method(rb_cArray, "unshift", ary_unshift, filename);
	rb_define_method(rb_cArray, "&", ary_and, filename);
	rb_define_method(rb_cArray, "*", ary_times, filename);
	rb_define_method(rb_cArray, "[]", ary_aref, filename);
	rb_define_method(rb_cArray, "slice", ary_aref, filename);
	rb_define_method(rb_cArray, "[]=", ary_aset, filename);
};
