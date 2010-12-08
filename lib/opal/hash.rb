# A {Hash} is a collection of key-value pairs. It is similar to an {Array}, 
# except that indexing is done via arbitrary keys of any object type, not an
# integer index. Hashes enumerate their values in the order that the 
# corresponding keys were inserted. 
# 
# Hashes have a default value that is returned when accessing keys that do not
# exist in the hash. By default, that value is `nil`.
class Hash
  
  
  # Equality - Two hashes are equal if they each contain the same number of keys
  # and if each key-value pair is equal to (according to {Object#==}) the
  # corresponding elements in the other hash.
  # 
  # @example
  #   h1 = {"a" => 1, "c" => 2}
  #   h2 = {7 => 35, "c" => 2, "a" => 1}
  #   h3 = {"a" => 1, "c" => 2, 7 => 35}
  #   h4 = {"a" => 1, "d" => 2, "f" => 35}
  #   h1 == h2
  #   # => false
  #   h2 == h3
  #   # => true
  #   h3 == h4
  #   # => false
  # 
  # @param [Hash] other another hash to comapre
  # @return [Boolean]
  def ==(other)
    `if (#{self} === #{other}) return #{true};
    if (!(#{other}.info & #{self}.TH)) return #{false}
    if (#{self}.__keys__.length !== #{other}.__keys__.length) return #{false};
    for (var i = 0; i < #{self}.__keys__.length; i++) {
      var key = #{self}.__keys__[i].hash();
      if (!(#{self}.__assocs__[key]['$=='](#{other}.__assocs__[key]).r)) return #{false};
    }
    return #{true};`
  end
  
  alias_method :eql?, :==
  
  # Element Reference - retrieves the `value` object corresponding to the `key`
  # object. If not found, returns the default value.
  # 
  # @example
  #   h = {"a" => 100, "b" => 200}
  #   h["a"]
  #   # => 100
  #   h["c"]
  #   # => nil
  # 
  # @param [Object] key key to look for
  # @return [Object] result or default value
  def [](key)
    __fetch__ key
  end
  
  # Element Assignment - Associates the value give by `value` with the key given
  # by `key`. `key` should not have its value changed while it is in use as a
  # key.
  # 
  # @example
  #   h = {"a" => 100, "b" => 200}
  #   h["a"] = 9
  #   # => 9
  #   h["c"] = 4
  #   # => 4
  #   h
  #   # => {"a" => 9, "b" => 200, "c" => 4}
  # 
  # @param [Object] key key for hash
  # @param [Object] value value for key
  # @return [Object] returns the value
  def []=(key, value)
    # `#{self}.hash_store(#{key}, #{value})`
    __store__ key, value
  end
  
  alias_method :store, :[]=
  

  
  # Removes all key-value pairs from `self`.
  # 
  # @example
  #   h = { "a" => [1, 2, 3], "b" => [4, 5, 6] }
  #   h.clear
  #   # => {}
  # 
  # @return [Hash] returns receiver
  def clear
    `#{self}.__keys__ = [];
    #{self}.__assocs__ = {};
    return #{self};`
  end
  
  # Returns the default value, the value that would be returned by hsh[key] if
  # key did not exist in hsh.
  # 
  # @example
  #   h = Hash.new          # => {}
  #   h.default             # => nil
  #   h.default(2)          # => nil
  # 
  #   h = Hash.new 'cat'    # => {}
  #   h.default             # => 'cat'
  #   h.default(2)          # => 'cat'
  # 
  # @todo Using block as default does not currently work
  # 
  # @param [Object] key to check with
  # @return [Object] returns default
  def default(key = nil)
    `return #{self}.__default__;`
  end
  
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
  def default=(obj)
    `return #{self}.__default__ = #{obj};`
  end
  
  # Deletes and returns a key-value pair from `self` whose key is equal to
  # `key`. If the key is not found, returns the default value. If the optional
  # code block is given and the key is not found, pass in the key and return
  # the result of `block`.
  # 
  # @todo Use with block functionality not yet implemented.
  # 
  # @example
  #   h = { "a" => 100,  "b" => 200}
  #   h.delete("a")
  #   # => 100
  #   h.delete("z")
  #   # => nil
  # 
  # @param [Object] key to delete
  # @return [Object] returns value or default value
  def delete(key)
    # `return #{self}.hash_delete(#{key});`
    __delete__ key
  end
  
  # Deletes every key-pair value from `self` for which block evaluates to   
  # `true`.
  # 
  # If no block is given, an enumerator is returned instead.
  # 
  # @todo Enumerator functionality not yet implemented.
  # 
  # @example
  #   h = { "a" => 100, "b" => 200, "c" => 300 }
  #   h.delete_if { |key, value| key >= "b" }
  #   # => { "a" => 100 }
  # 
  # @return [Hash] returns receiver
  def delete_if(&block)
    `var key, value;
    for (var i = 0; i < #{self}.__keys__.length; i++) {
      key = #{self}.__keys__[i];
      value = #{self}.__assocs__[key.$hash()];
      if (#{block}.apply(#{block}.$self, [key, value]).r) {
        #{self}.hash_delete(key);
        i--;
      };
    }
    return #{self};`
  end
  

  
  # Calls block once for each key in `self`, passing key as a parameter.
  # 
  # @example
  #   h = { "a" => 100, "b" => 200 }
  #   h.each_key { |key| puts key }
  #   # => "a"
  #   # => "b"
  # 
  # @return [Hash] returns receiver
  def each_key(&block)
    `var key;
    for (var i = 0; i < #{self}.__keys__.length; i++) {
      key = #{self}.__keys__[i];
      #{block}.apply(#{block}.$self, [key]);
    }
    return #{self};`
  end
  
  # Calls `block` once for each key in `hsh`, passing the value as a parameter.
  # 
  # @example
  #   h = { "a" => 100, "b" => 200 }
  #   h.each_value { |value| puts value }
  #   # => 100
  #   # => 200
  # 
  # @return [Hash] returns receiver
  def each_value(&block)
    `var key, value;
    for (var i = 0; i < #{self}.__keys__.length; i++) {
      key = #{self}.__keys__[i];
      value = #{self}.__assocs__[key.$hash()];
      #{block}.apply(#{block}.$self, [value]);
    }
    return #{self};`
  end
  
  # Returns true if `self` contains no key-value pairs.
  # 
  # @example
  #   {}.empty?
  #   # => true
  # 
  # @return [Boolean]
  def empty?
    @keys.length == 0
  end
  
  # Returns a value from the hash for the given key. If the key can't be found,
  # there are several options: With no other arguments, it will raise an
  # KeyError exception; if `default` is given, then that will be returned; if 
  # the optional code block is specified, then that will be run and its result
  # returned.
  # 
  # @example
  #   h = { "a" => 100, "b" => 200 }
  #   h.fetch("a")
  #   # => 100
  #   h.fetch("z", "Go fish")
  #   # => "Go fish"
  #   h.fetch("z") { |el| "Go fish, #{el}" }
  #   # => "Go fish, z"
  #   h.fetch("z")
  #   # => (opal):2: in `fetch`: key not found (KeyError)
  # 
  # @param [Object] key the key to lookup
  # @param [Object] defaults the default value to return
  # @return [Object] value from hash
  def fetch(key, defaults)
    `var value = #{self}.__assocs__[#{key}.hash()];
    if (value !== undefined) {
      return value;
    } else if (#{defaults} === undefined) {
      throw "KeyError: key not found";
    } else if (#{defaults}.info & #{self}.TP) {
      return #{defaults}.apply(#{defaults}.$self, [#{key}]);
    } else {
      return #{defaults};
    }`
  end
  
  # Returns a new array that is a one-dimensional flattening of this hash. That
  # is, for every key or value that is an array, extract its elements into the
  # new array. Unlike {Array#flatten}, this method does not flatten recursively
  # by default. The optional `level` argument determines the level of 
  # recursion to flatten.
  # 
  # @example
  #   a = { 1 => "one", 2 => [2, "two"], 3 => "three" }
  #   a.flatten
  #   # => [1, "one", 2, [2, "two"], 3, "three"]
  #   a.flatten(2)
  #   # => [1, "one", 2, 2, "two", 3, "three"]
  # 
  # @param [Number] level the level to flatten until
  # @return [Array] flattened hash
  def flatten(level = 1)
    `var result = [], key, value;
    for (var i = 0; i < #{self}.__keys__.length; i++) {
      key = #{self}.__keys__[i];
      value = #{self}.__assocs__[key.$hash()];
      result.push(key);
      if (value.info & #{self}.TA) {
        if (#{level} == 1) {
          result.push(value);
        } else {
          var temp = value.$flatten(#{level} - 1);
          result = result.concat(temp);
        }
      } else {
        result.push(value);
      }
    }
    return result;`
  end
  
  # Returns `true` if the given `key` is present in `self`.
  # 
  # @example
  #   h = { "a" => 100, "b" => 200 }
  #   h.has_key? "a"
  #   # => true
  #   h.has_key? "b"
  #   # => false
  # 
  # @param [Object] key the key to check for
  # @return [Boolean]
  def has_key?(key)
    `return #{self}.__assocs__.hasOwnProperty(#{key}.hash()) ? #{true} : #{false};`
  end
  
  alias_method :include?, :has_key?
  alias_method :key?, :has_key?
  alias_method :member?, :has_key?
  
  # Returns `true` if the given `value` is present for some key in `self`.
  # 
  # @example
  #   h = { "a" => 100,  "b" => 200 }
  #   h.has_value?(100)
  #   # => true
  #   h.has_value?(200)
  #   # => false
  # 
  # @param [Object] value the value to check for
  # @return [Boolean]
  def has_value?(value)
    `var key, val;
    for (var i = 0; i < #{self}.__keys__.length; i++) {
      key = #{self}.__keys__[i];
      val = #{self}.__assocs__[key.$hash()];
      if (value['$=='](val).r) {
        return #{true};
      };
    }
    return #{false};`
  end
  
  alias_method :value?, :has_value?
  
  # Replaces the contents of `self` with the contents of `other_hash`.
  # 
  # @example
  #   h = { "a" => 100, "b" => 200 }
  #   h.replace({ "c" => 200, "d" => 300 })
  #   # => { "c" => 200, "d" => 300 }
  # 
  # @param [Hash] other_hash hash for contents
  # @return [Hash] returns receiver
  def replace(other_hash)
    `#{self}.__keys__ = [];
    #{self}.__assocs__ = {};
    for (var i = 0; i < #{other_hash}.__keys__.length; i++) {
      key = #{other_hash}.__keys__[i];
      val = #{other_hash}.__assocs__[key.$hash()];
      #{self}.hash_store(key, val)
    }
    return #{self};`
  end
  

  
  # Returns a new hash created by using `self`'s values as keys, and the keys as
  # values.
  # 
  # @example
  #   h  = { "n" => 100, "m" => 100, "y" => 300, "d" => 200, "a" => 0 }
  #   h.invert
  #   # => { 0 => "a", 100 => "m", 200 => "d", 300 => "y" }
  # 
  # @return [Hash] inverted hash
  def invert
    `var res = vnH();
    for (var i = 0; i < #{self}.__keys__.length; i++) {
      key = #{self}.__keys__[i];
      value = #{self}.__assocs__[key.$hash()];
      res.hash_store(value, key);
    }
    return res;`
  end
  
  # Deletes every key-value pair from `self` for which block evaluates to 
  # `false`.
  # 
  # If no block is given, an enumerator is returned instead.
  # 
  # @todo Enumerator functionality is not yet implemented.
  # 
  # @example
  #   h = { "a" => 100, "b" => 200, "c" => 300 }
  #   h.keep_if { |key, value| key == "b" }
  #   # => { "b" => 200 }
  # 
  # @return [Hash] returns receiver
  def keep_if(&block)
    `var key, value;
    for (var i = 0; i < #{self}.__keys__.length; i++) {
      key = #{self}.__keys__[i];
      value = #{self}.__assocs__[key.$hash()];
      if (!#{block}.apply(#{block}.$self, [key, value]).r) {
        #{self}.hash_delete(key);
        i--;
      };
    }
    return #{self};`
  end
  
  # Returns the key for a given value. If not found, returns `nil`.
  # 
  # @example
  #   h = { "a" => 100, "b" => 200 }
  #   h.key(200)
  #   # => "b"
  #   h.key(300)
  #   # => nil
  # 
  # @param [Object] value to check for
  # @return [Object] key or nil
  def key(value)
    `var key, val;
    for (var i = 0; i < #{self}.__keys__.length; i++) {
      key = #{self}.__keys__[i];
      val = #{self}.__assocs__[key.$hash()];
      if (value['$=='](val).r) {
        return key;
      };
    }
    return #{nil};`
  end
  
  # Returns a new array populated with the keys from this hash. See also
  # {Hash#values}.
  # 
  # @example
  #   h = { "a" => 100, "b" => 200, "c" => 300 }
  #   h.keys
  #   # => ["a", "b", "c"]
  # 
  # @return [Array] keys
  def keys
    # FIXME: return copy..
    @keys
  end
  
  # Returns the number of key-value pairs in the hash.
  # 
  # @example
  #   h = { "a" => 100, "b" => 200 }
  #   h.length
  #   # => 2
  #   h.delete "a"
  #   h.length
  #   # => 1
  # 
  # @return [Number] length
  def length
    @keys.length
  end
  
  alias_method :size, :length
  
  # Returns a new hash containing the contents of `other_hash` and the contents
  # of `self`. If no block is specified, the value for entries with duplicate
  # keys will be that of `other_hash`. Otherwise the value for each duplicate
  # key is determined by calling the block with the key, its value in `self` and
  # its valye in `other_hash`.
  # 
  # @todo Block functionality not yet implemented.
  # 
  # @example
  #   h = { "a" => 100, "b" => 200 }
  #   h2 = { "b" => 300, "c" => 400 }
  #   h.merge(h2)
  #   # => { "a" => 100, "b" => 300, "c" => 400 }
  #   h
  #   # => { "a" => 100, "b" => 200 }
  # 
  # @param [Hash] other_hash hash to merge
  # @return [Hash] returns new hash with merged contents
  def merge(other_hash)
    `var result = vnH(), key, val;
    for (var i = 0; i < #{self}.__keys__.length; i++) {
      key = #{self}.__keys__[i];
      val = #{self}.__assocs__[key.$hash()];
      result.hash_store(key, val)
    }
    for (var i = 0; i < #{other_hash}.__keys__.length; i++) {
      key = #{other_hash}.__keys__[i];
      val = #{other_hash}.__assocs__[key.$hash()];
      result.hash_store(key, val)
    }
    return result;`
  end
  
  # Adds the contents of `other_hash` to `self`. If no block is specified,
  # entries with duplicate keys are overwritten with the values from
  # `other_hash`, otherwise the value of each duplicate key is determined by
  # calling the block with the key, its value in `self` and its value in
  # `other_hash`.
  # 
  # @todo Block functionality not yet implemented.
  # 
  # @example
  #   h = { "a" => 100, "b" => 200 }
  #   h2 = { "b" => 300, "c" => 400 }
  #   h.merge!(h2)
  #   # => { "a" => 100, "b" => 300, "c" => 400 }
  #   h
  #   # => { "a" => 100, "b" => 300, "c" => 400 }
  # 
  # @param [Hash] other_hash hash to merge
  # @return [Hash] returns receiver
  def merge!(other_hash)
    `var key, val;
    for (var i = 0; i < #{other_hash}.__keys__.length; i++) {
      key = #{other_hash}.__keys__[i];
      val = #{other_hash}.__assocs__[key.$hash()];
      #{self}.hash_store(key, val)
    }
    return #{self};`
  end
  
  alias_method :update, :merge!
  
  # Searches through the hash comapring obj with the value using ==. Returns the
  # first key-value pair (two-element array) that matches. See also 
  # {Array#rassoc}.
  # 
  # @example
  #   a = { 1 => "one", 2 => "two", 3 => "three" }
  #   a.rassoc "two"
  #   # => [2, "two"]
  #   a.rassoc "four"
  #   # => nil
  # 
  # @param [Object] obj object to check
  # @return [Array]
  def rassoc(obj)
    `var key, val;
    for (var i = 0; i < #{self}.__keys__.length; i++) {
      key = #{self}.__keys__[i];
      val = #{self}.__assocs__[key.$hash()];
      if (val['$=='](#{obj}).r) {
        return [key, val];
      }
    }
    return #{nil};`
  end
  
  # Same as {Hash#delete_if}, but it works on (and returns) a copy of the hash.
  # 
  # @return [Hash]
  def reject(&block)
    `var result = vnH(), key, value;
    for (var i = 0; i < #{self}.__keys__.length; i++) {
      key = #{self}.__keys__[i];
      value = #{self}.__assocs__[key.$hash()];
      if (!#{block}.apply(#{block}.$self, [key, value]).r) {
        result.hash_store(key, value);
      };
    }
    return result;`
  end
  
  # Equivalent to {Hash#delete_if}, but returns `nil` if no changes were made.
  # 
  # @return [Hash]
  def reject!(&block)
    `var key, value, size = #{self}.__keys__.length;
    for (var i = 0; i < #{self}.__keys__.length; i++) {
      key = #{self}.__keys__[i];
      value = #{self}.__assocs__[key.$hash()];
      if (#{block}.apply(#{block}.$self, [key, value]).r) {
        #{self}.hash_delete(key);
        i--;
      };
    }
    return #{self}.__keys__.length == size ? #{nil} : #{self}`
  end
  
  # Returns a new hash consisting of entries for which the block returns `true`.
  # 
  # @todo Need to implement Enumerator functionality (when no block given).
  # 
  # @example
  #   h = { :a => 100, :b => 200, :c => 300 }
  #   h.select { |k, v| k > "a" }
  #   # => { :b => 200, :c => 300 }
  #   h.select { |k, v| v < 200 }
  #   # => { :a => 100 }
  # 
  # @return [Hash]
  def select(&block)
    `var result = vnH(), key, value;
    for (var i = 0; i < #{self}.__keys__.length; i++) {
      key = #{self}.__keys__[i];
      value = #{self}.__assocs__[key.$hash()];
      if (#{block}.apply(#{block}.$self, [key, value]).r) {
        result.hash_store(key, value);
      };
    }
    return result;`
  end
  
  # Equivalent to {Hash#keep_if}, but returns `nil` if no changes were made.
  # 
  # @return [Hash, nil]
  def select!(&block)
    `var key, value, size = #{self}.__keys__.length;
    for (var i = 0; i < #{self}.__keys__.length; i++) {
      key = #{self}.__keys__[i];
      value = #{self}.__assocs__[key.$hash()];
      if (!#{block}.apply(#{block}.$self, [key, value]).r) {
        #{self}.hash_delete(key);
        i--;
      };
    }
    return #{self}.__keys__.length == size ? #{nil} : #{self}`
  end
  
  # Removes a key-value pair from `self` and returns it as the two-item array, 
  # [key, value], or returns the hash's default value if the hash is empty.
  # 
  # @example
  #   h = { :a => 1, :b => 2}
  #   h.shift
  #   # => [:a, 1]
  #   h
  #   # => {:b => 1}
  #   {}.shift
  #   # => nil
  # 
  # @return [Array, Object] array or default value
  def shift
    `var key, value;
    if (#{self}.__keys__.length > 0) {
      key = #{self}.__keys__[0];
      value = #{self}.__assocs__[key.$hash()];
      #{self}.hash_delete(key);
      return [key, value];
    } else {
      return #{self}.__default__;
    }`
  end
  
  # Convert `self` to a nested array of `[key, value]` arrays.
  # 
  # @example
  #   h = { :a => 1, :b => 2, :c => 3 }
  #   h.to_a
  #   # => [[:a, 1], [:b, 2], [:c, 3]]
  # 
  # @return [Array]
  def to_a
    `var result = [], key, value;
    for (var i = 0; i < #{self}.__keys__.length; i++) {
      key = #{self}.__keys__[i];
      value = #{self}.__assocs__[key.$hash()];
      result.push([key, value]);
    }
    return result;`
  end
  
  # Returns self.
  # 
  # @return [Hash] self
  def to_hash
    self
  end

end
