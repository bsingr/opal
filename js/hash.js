// @class Hash
var rb_cHash;
// @object ENV
var envtbl;

var RHash = function(args) {
  var k, v;
  this.$h = opal_yield_hash();
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

var rb_cHash_store = function(self, mid, key, val) {
	var hash = key.$hash();
	
	if (!self.$assocs.hasOwnProperty(hash))
		self.$keys.push(key);
	
	return self.$assocs[hash] = val;
};

var rb_cHash_fetch = function(self, mid, key) {
	var hash = key.$hash();
	
	if (self.$assocs.hasOwnProperty(hash))
		return self.$assocs[hash];
	
	return self.$default;
};

var rb_cHash_delete = function(self, mid, key) {
	var hash = key.$hash();
  
  if (self.$assocs.hasOwnProperty(hash)) {
    var ret = self.$assocs[hash];
    delete self.$assocs[hash];
    self.$keys.splice(self.$keys.indexOf(key), 1);
    return ret;
  }
  
  return self.$default;
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

/**
	Returns a new array populated with the values from `self`.

	@example
	  h = { :a => 1, :b => 2 }
	  h.values
	  # => [1, 2]

	@return [Array]
*/
function hash_values(hash, mid) {
	ARG_COUNT(0)
	
	var result = [];
	
	for (var i = 0; i < hash.$keys.length; i++) {
		result.push(hash.$assocs[hash.$keys[i].$hash()]);
	}
	
	return result;
}

/**
	Returns the contents of this hash as a string.

	@example
	  h = { "a" => 100, "b" => 200 }
	  # => "{ \"a\" => 100, \"b\" => 200 }"

	@return [String]
*/
function hash_inspect(hash, mid) {
	ARG_COUNT(0)
	
	var description = [], key, value;
	
	for (var i = 0; i < hash.$keys.length; i++) {
		key = hash.$keys[i];
		value = hash.$assocs[key.$hash()];
		description.push(rb_call(key, "inspect") + "=>" + rb_call(value,"inspect"));
	}
	
	return "{" + description.join(", ") + "}";
}

/**
	Returns a string representation of the hash's keys and values

	@return [String]
*/
function hash_to_s(hash, mid) {
	ARG_COUNT(0)
	
	var description = [], key, value;
	
	for (var i = 0; i < hash.$keys.length; i++) {
		key = hash.$keys[i];
		value = hash.$assocs[key.$hash()];
		description.push(rb_call(key, "to_s") + rb_call(value, "to_s"));
	}
	
	return description.join("");
}

/**
	Calls `block` once for each key in `self`, passing the key-value pair as
	parameters.

	If no block is given, an enumerator is returned instead.

	@todo Enumerator functionality not yet implemented.

	@example
	  h = { "a" => 100, "b" => 200 }
	  h.each { |k, v| puts "#{k} is #{v}" }
	  # => "a is 100"
	  # => "b is 200"

	@return [Hash] returns reciever
*/
function hash_each(hash, mid) {
	ARG_COUNT(0)
	RETURN_ENUMERATOR(hash, each)
	
	var keys = hash.$keys, length = keys.length, key;
	
	for (var i = 0; i < length; i++) {
	  PRE_LOOP
		key = keys[i];
		YIELD(key, hash.$assocs[key.$hash()]);
		POST_LOOP
	}
	
	return hash;
}

/**
  Searches through the hash comparing `obj` with the key using ==. Returns the
  key-value pair (two elements array) or nil if no match is found. See
  {Array#assoc}.

  @example
    h = { "a" => [1, 2, 3], "b" => [4, 5, 6] }
    h["a"]
    # => ["a", [1, 2, 3]]
    h["c"]
    # => nil

  @param [Object] obj key to search for
  @return [Array<Object, Object>, nil] result or nil
*/
function hash_assoc(hash, mid, obj) {
  ARG_COUNT(1)
  var key;
  
  for (var i = 0; i < hash.$keys.length; i++) {
    key = hash.$keys[i];
    if (RTEST(rb_call(key, "==", obj)))
      return [key, hash.$assocs[key.$hash()]];
  }
  
  return Qnil;
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
	rb_define_method(rb_cHash, "values", hash_values);
	rb_define_method(rb_cHash, "inspect", hash_inspect);
	rb_define_method(rb_cHash, "to_s", hash_to_s);
	rb_define_method(rb_cHash, "each", hash_each);
	rb_define_method(rb_cHash, "each_pair", hash_each);
	rb_define_method(rb_cHash, "assoc", hash_assoc);
																			
	rb_define_method(rb_cHash, '__store__', rb_cHash_store);
	rb_define_method(rb_cHash, '__fetch__', rb_cHash_fetch);
	rb_define_method(rb_cHash, '__delete__', rb_cHash_delete);
	
	envtbl = rb_obj_alloc(rb_cObject);
	
	rb_const_set(rb_cObject, "ENV", envtbl);
	rb_define_singleton_method(envtbl, "[]", env_aref);
	rb_define_singleton_method(envtbl, "to_s", env_to_s);
	rb_define_singleton_method(envtbl, "inspect", env_inspect);
};

