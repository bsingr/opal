// @class Array
var rb_cArray;

// Returns a formatted, printable version of the array. #inspect is called on
// each of the elements and appended to the string.
function rb_ary_inspect(ary) {
	var description = [];

	for (var i = 0; i < ary.length; i++) {
		description.push(rb_call(ary[i], "inspect"));
	}
	
	return "[" + description.join(", ") + "]";
};

// Returns a simple string version of the array. #to_s is applied to each of
// the child elements with no seperator.
function rb_ary_to_s(ary) {
	var description = [];
	
	for (var i = 0; i < ary.length; i++) {
		description.push(rb_call(ary[i], "to_s"));
	}
	
	return description.join("");
}

// Append - Pushes the given object on to the end of this array. This 
// expression returns the array itself, so several appends may be chained
// together.
// 
// @example
//   [1, 2] << "c" << "d" << [3, 4]
//   # => [1, 2, "c", "d", [3, 4]]
// 
// @param [Object] obj object to append
// @return [Array] returns the receiver
function rb_ary_push(ary, block, val) {
	ary.push(val);
	return ary;
}


// Returns the number of elements in `self`. May be zero.
// 
// @example
//	[1, 2, 3, 4, 5].length
//	# => 5
// 
// @return [Number] length
// 
function rb_ary_length(ary) {
	return ary.length;
};

var Init_Array = function() {
	// @class Array
	rb_cArray = rb_define_toll_free_class(Array.prototype, T_OBJECT | T_ARRAY,
		 																	 'Array', rb_cObject);

	// fix for array hash. create it if not already created..
	Array.prototype.$hash = function() {
	  if (this.$id) return this.$id;

	  return this.$id = opal_yield_hash();
	};
	
	rb_define_method(rb_cArray, "inspect", rb_ary_inspect);
	rb_define_method(rb_cArray, "to_s", rb_ary_to_s);
	
	rb_define_method(rb_cArray, "length", rb_ary_length);
	rb_define_alias(rb_cArray, "size", "length");
	rb_define_method(rb_cArray, "<<", rb_ary_push);
	
	

	// remove?!
	rb_define_method(rb_cArray, '__aref__', rb_cArray_aref);
	rb_define_method(rb_cArray, '__aset__', rb_cArray_aset);
	rb_define_method(rb_cArray, 'dup', rb_cArray_dup);
	rb_define_method(rb_cArray, '__compact__', rb_cArray_compact);
};

// Array#__aref__(index)
var rb_cArray_aref = function(self, block, index) {
	if (index < 0)
		index += self.length;
	
	if (index < 0 || index >= self.length)
		return Qnil;
	
	return self[index];
};

// Array#__aset__(idx, val)
var rb_cArray_aset = function(self, block, idx, val) {
	if (idx < 0)
		idx += self.length;
	
	return self[idx] = val;
};

// Array#__unshift__
var rb_cArray_unshift = function(self, block, val) {
	return self.unshift(val);
};

// Array#__shift__
var rb_cArray_shift = function(self, block) {
	return self.shift();
};

// Array#dup
var rb_cArray_dup = function(self, block) {
	return self.slice(0);
};

// Array#__compact__
var rb_cArray_compact = function(self, block) {
	var length = self.length;
	for (var i = 0; i < length; i++) {
		if (self[i] === Qnil) {
			self.splice(i, 1);
			i--;
		}
	}
	return length == self.length ? Qnil : self;
};
