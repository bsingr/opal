/**
  @class Hash

  A {Hash} is a collection of key-value pairs. It is similar to an {Array}, 
  except that indexing is done via arbitrary keys of any object type, not an
  integer index. Hashes enumerate their values in the order that the 
  corresponding keys were inserted. 

  Hashes have a default value that is returned when accessing keys that do not
  exist in the hash. By default, that value is `nil`.
*/
var rb_cHash;
// @object ENV
var envtbl;

var RHash = function(args) {
  var k, v;
  this.$keys = [];
  this.$assocs = {};
  this.$default = Qnil;
  for (var i = 0; i < args.length; i++) {
    k = args[i], v = args[i+1];
    i++;
    this.$keys.push(k);
    this.$assocs[k.$hash()] = v;
  }
  return this;
};

// hash
// @global
opalhash = function() {
  return new RHash(Array.prototype.slice.call(arguments));
};

/**
	Creates a new hash populated with the given objects. Equivalent to the 
	literal `{ key => value, ... }`. 

	@example
	  Hash["a", 100, "b", 200]
	  # => {"a" =>100, "b"=>200}

	@return [Hash]
*/
function hash_s_create(obj, mid) {
	return opalhash.apply(null, Array.prototype.slice.call(arguments, 2));
}

function env_to_s(env) {
	return "ENV";
}

function env_inspect(env) {
	return "ENV";
}

function env_aref(env, key) {
	return Qnil;
}

var Init_Hash = function() {
	rb_cHash = rb_define_toll_free_class(RHash.prototype, T_OBJECT | T_HASH,
																			'Hash', rb_cObject);
																			
	RHash.prototype.$hash = function() {
	  if (this.$id) return this.$id;

	  return this.$id = opal_yield_hash();
	};
	
	rb_define_singleton_method(rb_cHash, "[]", hash_s_create);
	
	envtbl = rb_obj_alloc(rb_cObject);
	
	rb_const_set(rb_cObject, "ENV", envtbl);
	rb_define_singleton_method(envtbl, "[]", env_aref);
	rb_define_singleton_method(envtbl, "to_s", env_to_s);
	rb_define_singleton_method(envtbl, "inspect", env_inspect);
};

