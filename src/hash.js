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



/**
  Equality - Two hashes are equal if they each contain the same number of keys
  and if each key-value pair is equal to (according to {Object#==}) the
  corresponding elements in the other hash.

  @example
    h1 = {"a" => 1, "c" => 2}
    h2 = {7 => 35, "c" => 2, "a" => 1}
    h3 = {"a" => 1, "c" => 2, 7 => 35}
    h4 = {"a" => 1, "d" => 2, "f" => 35}
    h1 == h2
    # => false
    h2 == h3
    # => true
    h3 == h4
    # => false

  @param [Hash] other another hash to comapre
  @return [Boolean]
*/
function hash_equal(hash1, mid, hash2) {
  ARG_COUNT(1)
  
  if (hash1 === hash2) return Qtrue;
  if (!IS_HASH(hash2)) return Qfalse;
  
  if (hash1.$keys.length != hash2.$keys.length) return Qfalse;
  
  for (var i = 0; i < hash1.$keys.length; i++) {
    var key1 = hash1.$keys[i];
    var assoc1 = key1.$hash();
    
    if (!hash2.$assocs.hasOwnProperty(assoc1))
      return Qfalse;
    
    var assoc2 = hash2.$assocs[assoc1];
    
    if (!RTEST(CALL(hash1.$assocs[assoc1], "==", assoc2)))
      return Qfalse;
  }
  
  return Qtrue;
}
 
/**
  Element Reference - retrieves the `value` object corresponding to the `key`
  object. If not found, returns the default value.

  @example
    h = {"a" => 100, "b" => 200}
    h["a"]
    # => 100
    h["c"]
    # => nil

  @param [Object] key key to look for
  @return [Object] result or default value
*/
function hash_aref(hash, key) {
  ARG_COUNT(1)
  
  var assoc = key.$hash();
	
	if (hash.$assocs.hasOwnProperty(assoc))
		return hash.$assocs[assoc];
	
	return hash.$default;
}

/**
  Element Assignment - Associates the value give by `value` with the key given
  by `key`. `key` should not have its value changed while it is in use as a
  key.

  @example
    h = {"a" => 100, "b" => 200}
    h["a"] = 9
    # => 9
    h["c"] = 4
    # => 4
    h
    # => {"a" => 9, "b" => 200, "c" => 4}

  @param [Object] key key for hash
  @param [Object] value value for key
  @return [Object] returns the value
*/
function hash_aset(hash, key, value) {
  ARG_COUNT(2)
  
  var assoc = key.$hash();
  
  if (!hash.$assocs.hasOwnProperty(assoc))
    hash.$keys.push(key);
  
  return hash.$assocs[assoc] = value;
}

/**
  Removes all key-value pairs from `self`.

  @example
    h = { "a" => [1, 2, 3], "b" => [4, 5, 6] }
    h.clear
    # => {}

  @return [Hash] returns receiver
*/
function hash_clear(hash, mid) {
  ARG_COUNT(0)
  
  hash.$keys = [];
  hash.$assocs = {};
  
  return hash;
}

/**
  Returns the default value, the value that would be returned by hsh[key] if
  key did not exist in hsh.

  @example
    h = Hash.new          # => {}
    h.default             # => nil
    h.default(2)          # => nil

    h = Hash.new 'cat'    # => {}
    h.default             # => 'cat'
    h.default(2)          # => 'cat'

  @todo Using block as default does not currently work

  @param [Object] key to check with
  @return [Object] returns default
*/
function hash_default(hash, mid, key) {
  return hash.$default;
}

/**
  # Sets the default value, the value returned for a key that does not exist in
  # the hash. It is not possible to set the default to a {Proc} that will be
  # executed on each key lookup.
  # 
  # @example
  #   h = { "a" => 100, "b" => 200 }
  #   h.default = "Go fish"
  #   h['a']
  #   # => 100
  #   h['z']
  #   # => "Go fish"
  # 
  # @param [Object] obj the new default
  # @return [Object] returns the default value
*/
function hash_set_default(hash, mid, obj) {
  ARG_COUNT(1)
  
  return hash.$default = obj;
}

/**
  Deletes and returns a key-value pair from `self` whose key is equal to
  `key`. If the key is not found, returns the default value. If the optional
  code block is given and the key is not found, pass in the key and return
  the result of `block`.

  @todo Use with block functionality not yet implemented.

  @example
    h = { "a" => 100,  "b" => 200}
    h.delete("a")
    # => 100
    h.delete("z")
    # => nil

  @param [Object] key to delete
  @return [Object] returns value or default value
*/
function hash_delete(hash, mid, key) {
  ARG_COUNT(1)
  
  var assoc = key.$hash();
  
  if (hash.$assocs.hasOwnProperty(assoc)) {
    var ret = hash.$assocs[assoc];
    delete hash.$assocs[assoc];
    hash.$keys.splice(hash.$keys.indexOf(key), 1);
    return ret;
  }
  
  return hash.$default;
}

/**
  Deletes every key-pair value from `self` for which block evaluates to   
  `true`.

  If no block is given, an enumerator is returned instead.

  @todo Enumerator functionality not yet implemented.

  @example
    h = { "a" => 100, "b" => 200, "c" => 300 }
    h.delete_if { |key, value| key >= "b" }
    # => { "a" => 100 }

  @return [Hash] returns receiver
*/
function hash_delete_if(hash, mid) {
  ARG_COUNT(0)
  RETURN_ENUMERATOR(hash, delete_if)
  
  var key, value;
  
  for (var i = 0; i < hash.$keys.length; i++) {
    PRE_LOOP
    key = hash.$keys[i];
    value = hash.$assocs[key.$hash()];
    
    if (RTEST(YIELD(key, value))) {
      hash_delete(hash, "delete", key);
      i--;
    }
    POST_LOOP
  }
  
  return hash;
}

/**
  Calls block once for each key in `self`, passing key as a parameter.

  @example
    h = { "a" => 100, "b" => 200 }
    h.each_key { |key| puts key }
    # => "a"
    # => "b"

  @return [Hash] returns receiver
*/
function hash_each_key(hash, mid) {
  ARG_COUNT(0)
  RETURN_ENUMERATOR(hash, each_key)
  
  var key;
  
  for (var i = 0; i < hash.$keys.length; i++) {
    PRE_LOOP
    key = hash.$keys[i];
    YIELD(key);
    POST_LOOP
  }
  
  return hash;
}

/**
  Calls `block` once for each key in `hsh`, passing the value as a parameter.

  @example
    h = { "a" => 100, "b" => 200 }
    h.each_value { |value| puts value }
    # => 100
    # => 200

  @return [Hash] returns receiver
*/
function hash_each_value(hash, mid) {
  ARG_COUNT(0)
  RETURN_ENUMERATOR(hash, each_value)
  
  var key, value;
  
  for (var i = 0; i < hash.$keys.length; i++) {
    key = hash.$keys[i];
    value = hash.$assocs[key.$hash()];
    YIELD(value);
  }
  
  return hash;
}

/**
  Returns true if `self` contains no key-value pairs.

  @example
    {}.empty?
    # => true

  @return [Boolean]
*/
function hash_empty_p(hash, mid) {
  ARG_COUNT(0)
  
  return hash.$keys.length == 0 ? Qtrue : Qfalse;
}
  
/**
  Returns a value from the hash for the given key. If the key can't be found,
  there are several options: With no other arguments, it will raise an
  KeyError exception; if `default` is given, then that will be returned; if 
  the optional code block is specified, then that will be run and its result
  returned.

  @example
    h = { "a" => 100, "b" => 200 }
    h.fetch("a")
    # => 100
    h.fetch("z", "Go fish")
    # => "Go fish"
    h.fetch("z") { |el| "Go fish, #{el}" }
    # => "Go fish, z"
    h.fetch("z")
    # => (opal):2: in `fetch`: key not found (KeyError)

  @param [Object] key the key to lookup
  @param [Object] defaults the default value to return
  @return [Object] value from hash
*/
function hash_fetch(hash, mid, key, defaults) {
  ARG_MIN(1)
  
  var value = hash.$assocs[key.$hash()];
  
  if (value != undefined)
    return value
  else if (defaults == undefined)
    rb_raise(rb_eKeyError, "key not found: " + CALL(key, "inspect"));
  else
    return defaults;
}
 
/**
  Returns a new array that is a one-dimensional flattening of this hash. That
  is, for every key or value that is an array, extract its elements into the
  new array. Unlike {Array#flatten}, this method does not flatten recursively
  by default. The optional `level` argument determines the level of 
  recursion to flatten.

  @example
    a = { 1 => "one", 2 => [2, "two"], 3 => "three" }
    a.flatten
    # => [1, "one", 2, [2, "two"], 3, "three"]
    a.flatten(2)
    # => [1, "one", 2, 2, "two", 3, "three"]

  @param [Number] level the level to flatten until
  @return [Array] flattened hash
*/
function hash_flatten(hash, mid, level) {
  var result = [], key, value;
  if (level == undefined) level = 1;
  
  for (var i = 0; i < hash.$keys.length; i++) {
    key = hash.$keys[i];
    value = hash.$assocs[key.$hash()];
    result.push(key);
    
    if (IS_ARRAY(value)) {
      if (level == 1) {
        result.push(value);
      } else {
        var temp = CALL(value, "flatten", level - 1);
        result = result.concat(temp);
      }
    } else {
      result.push(value);
    }
  }
  
  return result;
}

/**
  Returns `true` if the given `key` is present in `self`.

  @example
    h = { "a" => 100, "b" => 200 }
    h.has_key? "a"
    # => true
    h.has_key? "b"
    # => false

  @param [Object] key the key to check for
  @return [Boolean]
*/
function hash_has_key(hash, mid, key) {
  ARG_COUNT(1)
  
  if (hash.$assocs.hasOwnProperty(key.$hash()))
    return Qtrue;
  
  return Qfalse;
}

/**
  Returns `true` if the given `value` is present for some key in `self`.

  @example
    h = { "a" => 100,  "b" => 200 }
    h.has_value?(100)
    # => true
    h.has_value?(200)
    # => false

  @param [Object] value the value to check for
  @return [Boolean]
*/
function hash_has_value(hash, mid, value) {
  ARG_COUNT(1)
  
  var key, val;
  
  for (var i = 0; i < hash.$keys.length; i++) {
    key = hash.$keys[i];
    val = hash.$assocs[key.$hash()];
    
    if (RTEST(CALL(value, "==", val)))
      return Qtrue;
  }
  
  return Qfalse;
}

/**
  Replaces the contents of `self` with the contents of `other_hash`.

  @example
    h = { "a" => 100, "b" => 200 }
    h.replace({ "c" => 200, "d" => 300 })
    # => { "c" => 200, "d" => 300 }

  @param [Hash] other_hash hash for contents
  @return [Hash] returns receiver
*/
function hash_replace(hash, mid, hash2) {
  ARG_COUNT(1)
  
  hash.$keys = [];
  hash.$assocs = {};
  
  for (var i = 0; i < hash2.$keys.length; i++) {
    var key = hash2.$keys[i];
    var val = hash2.$assocs[key.$hash()];
    hash.$keys.push(key);
    hash.$assocs[key.$hash()] = val;
  }
  
  return hash;
}

/**
  Returns a new hash created by using `self`'s values as keys, and the keys as
  values.

  @example
    h  = { "n" => 100, "m" => 100, "y" => 300, "d" => 200, "a" => 0 }
    h.invert
    # => { 0 => "a", 100 => "m", 200 => "d", 300 => "y" }

  @return [Hash] inverted hash
*/
function hash_invert(hash, mid) {
  ARG_COUNT(0)
  
  var res = new RHash([]);
  
  for (var i = 0; i < hash.$keys.length; i++) {
    var key = hash.$keys[i];
    var val = hash.$assocs[key.$hash()];
    
    res.$keys.push(val);
    res.$assocs[val.$hash()] = key;
  }
  
  return res;
}
 
/**
  Returns the key for a given value. If not found, returns `nil`.

  @example
    h = { "a" => 100, "b" => 200 }
    h.key(200)
    # => "b"
    h.key(300)
    # => nil

  @param [Object] value to check for
  @return [Object] key or nil
*/
function hash_key(hash, mid, value) {
  ARG_COUNT(1)
  
  var key, val;
  
  for (var i = 0; i < hash.$keys.length; i++) {
    key = hash.$keys[i];
    val = hash.$assocs[key.$hash()];
    
    if (RTEST(CALL(value, "==", val)))
      return key;
  }
  
  return Qnil
}

/**
  Returns a new array populated with the keys from this hash. See also
  {Hash#values}.

  @example
    h = { "a" => 100, "b" => 200, "c" => 300 }
    h.keys
    # => ["a", "b", "c"]

  @return [Array] keys
*/
function hash_keys(hash, mid) {
  ARG_COUNT(0)
  
  return hash.$keys.slice(0);
}

/**
  Returns the number of key-value pairs in the hash.

  @example
    h = { "a" => 100, "b" => 200 }
    h.length
    # => 2
    h.delete "a"
    h.length
    # => 1

  @return [Number] length
*/
function hash_size(hash, mid) {
  ARG_COUNT(0)
  
  return hash.$keys.length;
}

/**
  Returns a new hash containing the contents of `other_hash` and the contents
  of `self`. If no block is specified, the value for entries with duplicate
  keys will be that of `other_hash`. Otherwise the value for each duplicate
  key is determined by calling the block with the key, its value in `self` and
  its valye in `other_hash`.

  @todo Block functionality not yet implemented.

  @example
    h = { "a" => 100, "b" => 200 }
    h2 = { "b" => 300, "c" => 400 }
    h.merge(h2)
    # => { "a" => 100, "b" => 300, "c" => 400 }
    h
    # => { "a" => 100, "b" => 200 }

  @param [Hash] other_hash hash to merge
  @return [Hash] returns new hash with merged contents
*/
function hash_merge(hash1, mid, hash2) {
  ARG_COUNT(1)
  
  var result = new RHash([]), key, val;
  
  for (var i = 0; i < hash1.$keys.length; i++) {
    key = hash1.$keys[i], val = hash1.$assocs[key.$hash()];
    
    result.$keys.push(key);
    result.$assocs[key.$hash()] = val;
  }
  
  for (var i = 0; i < hash2.$keys.length; i++) {
    key = hash2.$keys[i], val = hash2.$assocs[key.$hash()];
    
    result.$keys.push(key);
    result.$assocs[key.$hash()] = val;
  }
  
  return result;
}

/**
  Adds the contents of `other_hash` to `self`. If no block is specified,
  entries with duplicate keys are overwritten with the values from
  `other_hash`, otherwise the value of each duplicate key is determined by
  calling the block with the key, its value in `self` and its value in
  `other_hash`.

  @todo Block functionality not yet implemented.

  @example
    h = { "a" => 100, "b" => 200 }
    h2 = { "b" => 300, "c" => 400 }
    h.merge!(h2)
    # => { "a" => 100, "b" => 300, "c" => 400 }
    h
    # => { "a" => 100, "b" => 300, "c" => 400 }

  @param [Hash] other_hash hash to merge
  @return [Hash] returns receiver
*/
function hash_update(hash1, mid, hash2) {
  ARG_COUNT(1)
  
  var key, val;
  
  for (var i = 0; i < hash2.$keys.length; i++) {
    key = hash2.$keys[i], val = hash2.$assocs[key.$hash()];
    
    hash1.$keys.push(key);
    hash1.$assocs[key.$hash()] = val;
  }
  
  return hash1;
}

/**
  Searches through the hash comapring obj with the value using ==. Returns the
  first key-value pair (two-element array) that matches. See also 
  {Array#rassoc}.

  @example
    a = { 1 => "one", 2 => "two", 3 => "three" }
    a.rassoc "two"
    # => [2, "two"]
    a.rassoc "four"
    # => nil

  @param [Object] obj object to check
  @return [Array]
*/
function hash_rassoc(hash, mid, obj) {
  ARG_COUNT(1)
  
  var key, val;
  
  for (var i = 0; i < hash.$keys.length; i++) {
    key = hash.$keys[i];
    val = hash.$assocs[key.$hash()];
    
    if (RTEST(CALL(val, "==", obj)))
      return [key, val];
  }
  
  return Qnil;
}

/**
  Removes a key-value pair from `self` and returns it as the two-item array, 
  [key, value], or returns the hash's default value if the hash is empty.

  @example
    h = { :a => 1, :b => 2}
    h.shift
    # => [:a, 1]
    h
    # => {:b => 1}
    {}.shift
    # => nil

  @return [Array, Object] array or default value
*/
function hash_shift(hash, mid) {
  ARG_COUNT(0)
  
  var key, value;
  
  if (hash.$keys.length > 0) {
    key = hash.$keys[0];
    value = hash.$assocs[key.$hash()];
    
    hash.$keys.shift();
    delete hash.$assocs[key.$hash()];
    return [key, value];
    
  } else {
    return hash.$default;
  }
}

/**
  Convert `self` to a nested array of `[key, value]` arrays.

  @example
    h = { :a => 1, :b => 2, :c => 3 }
    h.to_a
    # => [[:a, 1], [:b, 2], [:c, 3]]

  @return [Array]
*/
function hash_to_a(hash, mid) {
  ARG_COUNT(0)
  
  var result = [], key, value;
  
  for (var i = 0; i < hash.$keys.length; i++) {
    key = hash.$keys[i];
    value = hash.$assocs[key.$hash()];
    result.push([key, value]);
  }
  
  return result;
}

/**
  Returns self.

  @return [Hash] self
*/
function hash_to_hash(hash, mid) {
  ARG_COUNT(0)
  return hash;
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
	rb_define_method(rb_cHash, "==", hash_equal);
	rb_define_method(rb_cHash, "eql?", hash_equal);
	rb_define_method(rb_cHash, "[]", hash_aref);
	rb_define_method(rb_cHash, "[]=", hash_aset);
	rb_define_method(rb_cHash, "store", hash_aset);
	rb_define_method(rb_cHash, "clear", hash_clear);
	rb_define_method(rb_cHash, "default", hash_default);
	rb_define_method(rb_cHash, "default=", hash_set_default);
	rb_define_method(rb_cHash, "delete", hash_delete);
	rb_define_method(rb_cHash, "delete_if", hash_delete_if);
	rb_define_method(rb_cHash, "each_key", hash_each_key);
	rb_define_method(rb_cHash, "each_value", hash_each_value);
	rb_define_method(rb_cHash, "empty?", hash_empty_p);
	rb_define_method(rb_cHash, "fetch", hash_fetch);
	rb_define_method(rb_cHash, "flatten", hash_flatten);
	rb_define_method(rb_cHash, "include?", hash_has_key);
	rb_define_method(rb_cHash, "member?", hash_has_key);
	rb_define_method(rb_cHash, "has_key?", hash_has_key);
	rb_define_method(rb_cHash, "key?", hash_has_key);
	rb_define_method(rb_cHash, "has_value?", hash_has_value);
	rb_define_method(rb_cHash, "value?", hash_has_value);
	rb_define_method(rb_cHash, "invert", hash_invert);
	rb_define_method(rb_cHash, "key", hash_key);
	rb_define_method(rb_cHash, "keys", hash_keys);
	rb_define_method(rb_cHash, "length", hash_size);
	rb_define_method(rb_cHash, "size", hash_size);
	rb_define_method(rb_cHash, "merge", hash_merge);
	rb_define_method(rb_cHash, "merge!", hash_update);
	rb_define_method(rb_cHash, "update", hash_update);
	rb_define_method(rb_cHash, "rassoc", hash_rassoc);
	rb_define_method(rb_cHash, "shift", hash_shift);
	rb_define_method(rb_cHash, "to_a", hash_to_a);
	rb_define_method(rb_cHash, "to_hash", hash_to_hash);
	
	envtbl = rb_obj_alloc(rb_cObject);
	
	rb_const_set(rb_cObject, "ENV", envtbl);
	rb_define_singleton_method(envtbl, "[]", env_aref);
	rb_define_singleton_method(envtbl, "to_s", env_to_s);
	rb_define_singleton_method(envtbl, "inspect", env_inspect);
};

