// @class Array
var rb_cArray;

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
	
};
