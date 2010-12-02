var rb_cArray;

var Init_Array = function() {
	// @class Array
	rb_cArray = rb_define_toll_free_class(Array.prototype, T_OBJECT | T_ARRAY,
		 																	 'Array', rb_cObject);

	// fix for array hash. create it if not already created..
	Array.prototype.$hash = function() {
	  if (this.$h) return this.$h;

	  return this.$h = opal_yield_hash();
	};
	
	rb_define_method(rb_cArray, '__length__', rb_cArray_length);
	rb_define_method(rb_cArray, '__aref__', rb_cArray_aref);
	rb_define_method(rb_cArray, '__aset__', rb_cArray_aset);
	rb_define_method(rb_cArray, 'dup', rb_cArray_dup);
	rb_define_method(rb_cArray, '__compact__', rb_cArray_compact);
};

// Array#__length__
var rb_cArray_length = function(self, block) {
	return self.length;
};

// Array#__aref__(index)
var rb_cArray_aref = function(self, block, index) {
	if (index < 0)
		index += self.length;
	
	if (index < 0 || index >= self.length)
		return rb_nil;
	
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
		if (self[i] === rb_nil) {
			self.splice(i, 1);
			i--;
		}
	}
	return length == self.length ? rb_nil : self;
};
