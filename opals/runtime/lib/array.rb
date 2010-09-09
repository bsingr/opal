# 
# array.rb
# vienna
# 
# Created by Adam Beynon.
# Copyright 2010 Adam Beynon.
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#

# Arrays are ordered, indexed by integers starting at 0.
# 
# ## Implementation details
# 
# For efficiency, an array instance is simply a native javascript array. There
# is no wrapping or referencing, it is simply a toll-free class. All the core
# runtime methods are applied to `Array.prototype` in opal, so it is fully
# functional as a ruby object. All methods, as standard, are prefixed with a 
# `$`. This means the following ruby:
# 
#     [1, 2, 3].length
# 
# is converted to the following javascript:
# 
#     [1, 2, 3].$length();
# 
class Array
  
  # Returns a new array populated with the given objects.
  # 
  # @example
  #   Array.[](1, 2, 3)
  #   # => [1, 2, 3]
  # 
  #   Array["a", "b", "c"]
  #   # => ["a", "b", "c"]
  # 
  # @param [Object] objs all objects to add to the array
  # @return [Array] returns a new array instance
  def self.[](*objs)
    `return #{objs};`
  end
  
  # Set Intersection - Returns a new array containing elements common to the two 
  # arrays, with no duplicates.
  # 
  # @example
  #   [1, 1, 3, 5] & [1, 2, 3]
  #   # => [1, 3]
  # 
  # @param [Array] other another array to intersect.
  # @return [Array] intersected array
  def &(other)
    result = []
    `var seen = [];
    for (var i = 0; i < #{self}.length; i++) {
      var test = #{self}[i], hash = test.hash();
      if (seen.indexOf(hash) == -1) {
        for (var j = 0; j < #{other}.length; j++) {
          var test_b = #{other}[j], hash_b = test_b.hash();
          if ((hash == hash_b) && seen.indexOf(hash) == -1) {
            seen.push(hash);
            #{result}.push(test);
          }
        }
      }
    }`
    result
  end
  
  # Repitition - When given a string argument, acts the same as {#join}. 
  # Otherwise, returns a new array built by concatenating the `num` copies of
  # `self`.
  # 
  # @example With Number
  #   [1, 2, 3] * 3
  #   # => [1, 2, 3, 1, 2, 3, 1, 2, 3]
  # 
  # @example With String
  #   [1, 2, 3] * ','
  #   # => "1,2,3"
  # 
  # @param [String, Number] num string or number used for joining/concat
  # @result [String, Array] depending on argument
  def *(arg)
    if arg.is_a? String
      join arg
    else # number
      `var result = [];
      for (var i = 0; i < parseInt(#{arg}); i++) {
        result = result.concat(#{self});
      }
      return result;`
    end
  end
  
  # Concatenation - returns a new array built by concatenating the two arrays
  # together to produce a third array.
  # 
  # @example
  #   [1, 2, 3] + [4, 5]
  #   # => [1, 2, 3, 4, 5]
  # 
  # @param [Array] other_ary the array to concat with
  # @return [Array] returns new concatenated array
  def +(other_ary)
    `return #{self}.concat(#{other_ary});`
  end
  
  # Array difference. Removes a new array that is a copy of the original array,
  # removing any items that also appear in other_ary.
  # 
  # @example
  #   [1, 1, 2, 2, 3, 3, 4, 5] - [1, 2, 4]
  #   # => [3, 3, 5]
  # 
  # @param [Array] other_ary array to use for difference
  # @return [Array] new array
  def -(other_ary)
    raise "Array#- not implemented"
  end
  
  # Append - Pushes the given object on to the end of this array. This 
  # expression returns the array itself, so several appends may be chained
  # together.
  # 
  # @example
  #   [1, 2] << "c" << "d" << [3, 4]
  #   # => [1, 2, "c", "d", [3, 4]]
  # 
  # @param [Object] obj object to append
  # @return [Array] returns the receiver
  def <<(obj)
    `#{self}.push(#{obj});`
    self
  end
  
  # Append - Pushes the given object(s) on to the end of this array. This 
  # expression returns the array itself, so several appends may be chained
  # together
  # 
  # @example
  #   a = ["a", "b", "c"]
  #   a.push("d", "e", "f")
  #   # => ["a", "b", "c", "d", "e", "f"]
  # 
  # @param [Object] obj the object(s) to push on to the array
  # @return [Array] returns the receiver
  def push(*objs)
    `for (var i = 0; i < #{objs}.length; i++) {
      #{self}.push(#{objs}[i]);
    }`
    self
  end
  
  # Equality - Two arrays are equal if they contain the same number of elements
  # and if each element is equal to (according to {Object#==}) the corresponding
  # element in the other array.
  # 
  # @example
  #   ["a", "c"] == ["a", "c", 7]
  #   # => false
  # 
  #   ["a", "c", 7] == ["a", "c", 7]
  #   # => true
  # 
  #   ["a", "c", 7] == ["a", "d", "f"]
  #   # => false
  # 
  # @param [Array] other array to compare
  # @return [Boolean] are arrays equal
  def ==(other)
    `if (#{self} === #{other}) return #{true};
    if (!(#{other}.info & #{self}.TA)) return #{false};
    if (#{self}.length !== #{other}.length) return #{false};
    for (var i = 0; i < #{self}.length; i++) {
      if (!#{self}[i]['$=='](#{other}[i]).r) return #{false};
    }`
    true
  end
  
  # Element Reference - Returns the element at `index`, or returns a subarray at
  # `index` and continuing for `length` elements, or returns a subarray if 
  # `index` is a range. Negative indices count backward from the end of the 
  # array (`-1` is the last element). Returns `nil` if the index (or starting
  # index) are out of range.
  # 
  # @example
  #   a = ["a", "b", "c", "d", "e"]
  #   a[2] + a[0] + a[1]
  #   # => "cab"
  #   a[6]
  #   # => nil
  #   a[1, 2]
  #   # => ["b", c""]
  #   a[1..3]
  #   # => ["b", "c", "d"]
  #   a[4..7]
  #   # => ["e"]
  #   a[6..10]
  #   # => nil
  #   a[-3, 3]
  #   # => ["c", "d", "e"]
  #   a[5]
  #   # => nil
  #   a[5, 1]
  #   # => []
  #   a[5..10]
  #   # => []
  # 
  # @todo Does not yet work with ranges.
  # 
  # @param [Range, Number] index to begin with
  # @param [Number] length last index
  # @return [Array, nil] result
  def [](index, length = nil)
    size = `#{self}.length;`
    
    if index.is_a? Range
      raise "need to implement range"
    else
      `if (#{index} < 0) #{index} += #{size};`
    end
    `if (#{index} >= #{size} || #{index} < 0) return #{nil};`
    
    if length
      `if (#{length} <= 0) return [];`
      `return #{self}.slice(#{index}, #{index} + #{length});`
    else
      `return #{self}[#{index}];`
    end
  end
  
  alias_method :slice, :[]
  
  # @todo Need to expand functionality
  def []=(index, value)
    `return #{self}[#{index}] = #{value};`
  end
  
  # Searches through an array whose elements are also arrays comparing `obj`
  # with the first element of each contained array using `obj.==`. Returns the
  # first contained array that matches (that is, the first associated array), or
  # `nil` if no match is found. See also {Array#rassoc}
  # 
  # @example
  #   s1 = ["colors", "red", "blue", "green"]
  #   s2 = ["letters", "a", "b", "c"]
  #   s3 = "foo"
  #   a = [s1, s2, s3]
  #   a.assoc "letters"
  #   # => ["letter", "a", "b", "c"]
  #   a.assoc "foo"
  #   # => nil
  def assoc(obj)
    `for (var i = 0; i < #{self}.length; i++) {
      var test = #{self}[i];
      if (test.info & #{self}.TA && test[0] !== undefined && test[0]===#{obj}) {
        return test;
      }
    }`
    nil
  end
  
  # Returns the element at `index`. A negative index count from the end of the
  # receiver. Returns `nil` if the index is out of range. See also `Array#[]`.
  # 
  # @example
  #   a = ["a", "b", "c", "d", "e"]
  #   a.at 0
  #   # => "a"
  #   a.at -1
  #   # => "e"
  # 
  # @param [Number] index index to get
  # @return [Object, nil] returns nil or the result
  def at(index)
    `if (#{index} < 0) {
      #{index} += #{self}.length;
    }
    if (#{index} < 0 || #{index} >= #{self}.length) {
      return #{nil};
    }
    return #{self}[#{index}];`
  end
  
  # Removes all elements from `self`.
  # 
  # @example
  #   a = ["a", "b", "c", "d", "e"]
  #   a.clear
  #   # => []
  # 
  # @return [Array] returns receiver
  def clear
    `return #{self}.splice(0, #{self}.length);`
  end
  
  # Invokes `block` once for each element of `self`. Creates a new array
  # containing the values returned by the block. See also {Enumerable#collect}.
  # 
  # If no block is given, an anumerator is returned instead.
  # 
  # @todo No enumerator is returned when no block given.
  # 
  # @example
  #   a = ["a", "b", "c", "d"]
  #   a.collect { |x| x + "!" }
  #   # => ["a!", "b!", "c!", "d!"]
  #   a
  #   # => ["a", "b", "c", "d"]
  #  
  # @return [Array] new array
  def collect(&block)
    result = []
    `for (var i = 0; i < #{self}.length; i++) {
      try {
        #{result}.push(#{block}.apply(#{block}.__self__, [#{self}[i]]));
      } catch (e) {
        if (e.__keyword__ == 'break') {
          return e.opal_value;
        }
        
        throw e;
      }
    }`
    result
  end
  
  alias_method :map, :collect
  
  # Invokes the `block` once for each element of `self`, replacing the element 
  # with the value returned by `block`. See also Enumerable#collect.
  # 
  # If no block is given, an enumerator is returned instead.
  # 
  # @todo no block given does not return an enumerator
  # 
  # @example
  #   a = ["a", "b", "c", "d"]
  #   a.collect { |x| x + "!" }
  #   # => ["a!", "b!", "c!", "d!"]
  #   a
  #   # => ["a!", "b!", "c!", "d!"]
  # 
  # @return [Array] returns receiver
  def collect!(&block)
    `for (var i = 0; i < #{self}.length; i++) {
      try {
        #{self}[i] = #{block}.apply(#{block}.__self__, [#{self}[i]]);
      } catch (e) {
        if (e.__keyword__ == 'break') {
          return e.opal_value;
        }
        
        throw e;
      }
    }`
    self
  end
  
  alias_method :map!, :collect!
  
  # Returns a copy of `self` with all `nil` elements removed.
  # 
  # @example
  #   ["a", nil, "b", nil, "c", nil].compact
  #   # => ["a", "b", "c"]
  # 
  # @return [Array] new array
  def compact
    result = []
    `for (var i = 0; i < #{self}.length; i++) {
      if (#{self}[i] !== #{nil})
        #{result}.push(#{self}[i]);
    }`
    result
  end
  
  # Removes nil elements from the array. Returns nil if no changes were made,
  # otherwise returns ary.
  # 
  # @example
  #   ["a", nil, "b", nil, "c", nil].compact!
  #   # => ["a", "b", "c"]
  # 
  #   ["a", "b", "c"].compact!
  #   # => nil
  # 
  # @return [Array, nil] returns either the receiver or nil
  def compact!
    `var size = #{self}.length;
    for (var i = 0; i < #{self}.length; i++) {
      if (#{self}[i] == #{nil}) {
        #{self}.splice(i, 1);
        i--;
      }
    }`
    `return size == #{self}.length ? #{nil} : #{self};`
  end
  
  # Appends the elements of `other_ary` to `self`
  # 
  # @example
  #   ["a", "b"].concat ["c", "d"]
  #   # => ["a", "b", "c", "d"]
  # 
  # @param [Array] other_ary array to concat
  # @return [Array] returns receiver
  def concat(other_ary)
    `for (var i = 0; i < #{other_ary}.length; i++) {
      #{self}.push(#{other_ary}[i]);
    }`
    self
  end
  
  # Returns the number of elements. If an argument is given, counts the number
  # of elements which equals to `obj`. If a block is given, counts the number of
  # elements yielding a true value.
  # 
  # @note Block usage not yet implemented
  # 
  # @example
  #   ary = [1, 2, 4, 2]
  #   ary.count
  #   # => 4
  #   ary.count(2)
  #   # => 2
  # 
  # @param [Object] obj object to check
  # @return [Number] count or count of obj
  def count(obj)
    `if (obj !== undefined) {
      var total = 0;
      for (var i = 0; i < #{self}.length; i++) {
        if (#{self}[i] === #{obj}) 
          total += 1;
      }
      return total;
    } else {
      return #{self}.length;
    }`
  end
  
  # Deletes items from `self` that are equal to `obj`. If any items are found, 
  # returns `obj`. If the itme is not found, returns `nil`. If the optional code
  # block is given, returns the result of `block` if the item is not found. (To
  # remove nil elements and get an informative return value, use {#compact!})
  # 
  # @todo block is not yet used
  # 
  # @example
  #   a = ["a", "b", "b", "b", "c"]
  #   a.delete("b")
  #   # => "b"
  #   a
  #   # => ["a", "c"]
  #   a.delete("z")
  #   # => nil
  #   a.delete("z") { "not found" }
  #   # => "not found"
  # 
  # @param [Object] obj object to delete
  # @return [Object, nil] returns obj or nil
  def delete(obj)
    `var size = #{self}.length;
    for (var i = 0; i < #{self}.length; i++) {
      if (#{self}[i]['$=='](#{obj}).r) {
        #{self}.splice(i, 1);
        i--;
      }
    }`
    `return size == #{self}.length ? #{nil} : #{obj};`
  end

  # Deletes the element at the specified index, returning that element, or `nil`
  # if the index is out of range. See also Array#slice!.
  # 
  # @example
  #   a = ["ant", "bat", "cat", "dog"]
  #   a.delete_at(2)
  #   # => "cat"
  #   a
  #   # => ["ant", "bat", "dog"]
  #   a.delete_at(99)
  #   # => 99
  # 
  # @param [Number] index the index to delete
  # @return [Object, nil] returns obj at index or nil
  def delete_at(index)
    `if (#{index} < 0 || #{index} >= #{self}.length) return #{nil};
    var res = #{self}[#{index}];
    #{self}.splice(#{index}, 1);
    return res;`
  end
  
  # Deletes every element of `self` for which `block` evaluates to true. See
  # also Array#reject!.
  # 
  # If no block is given, an enumerator is returned instead.
  # 
  # @note no enumerator is currently returned.
  # 
  # @example
  #   a = [1, 2, 3]
  #   a.delete_if { |x| x >= 2 }
  #   # => [1]
  # 
  # @return [Array] returns amended receiver
  def delete_if(&block)
    `for (var i = 0; i < #{self}.length; i++) {
      try {
        var res = #{block}.apply(#{block}.__self__, [#{self}[i]]);
        if (res.r) {
          #{self}.splice(i, 1);
          i--;
        }
      }
      catch (e) {
        throw "Array#delete_if catch not implemented yet"
      }
    }`
    self
  end
  
  # Drop first `n` elements from receiver, and returns rest elements in array.
  # 
  # @example
  #   a = [1, 2, 3, 4, 5, 0]
  #   a.drop 3
  #   # => [4, 5, 0]
  # 
  # @param [Number] n number to drop
  # @return [Array] returns a new array
  def drop(n)
    `if (#{n} > #{self}.length) return [];`
    `var result = [];`
    `for (var i = #{n}; i < (#{self}.length); i++) {
      result.push(#{self}[i]);
    }`
    `return result;`
  end
  
  # Drop elements up to, but not including, the first element for which block
  # returns `nil` or `false` and returns an array containing the remaining
  # elements. 
  # 
  # If no block is given, an enumerator is returned instead.
  # 
  # @note returning an enumerator is not yet implemented
  # 
  # @example
  #   a = [1, 2, 3, 4, 5, 0]
  #   a.drop_while { |i| i < 3 }
  #   # => [3, 4, 5, 0]
  # 
  # @return [Array] returns new array
  def drop_while(&block)
    `var result = []
    for (var i = 0; i < #{self}.length; i++) {
      try {
        var res = #{block}.apply(#{block}.__self__, [#{self}[i]]);
        if (!res.r) {
          result = #{self}.slice(i);
          break;
        }
      }
      catch (e) {
        throw "Array#delete_if catch not implemented yet"
      }
    }
    return result;`
  end
  
  # Calls block once for each element in `self`, passing that element as a 
  # parameter.
  # 
  # If no block is given, an enumerator is returned instead.
  # 
  # @note enumerator functionality not yet implemented
  # 
  # @example
  #   a = ["a", "b", "c"]
  #   a.each { |x| puts x }
  #   # => "a"
  #   # => "b"
  #   # => "c"
  # 
  # @return [Array] returns the receiver
  def each(&block)
    `for (var i = 0; i < #{self}.length; i++) {
      try {
        #{block}.apply(#{block}.__self__, [#{self}[i]]);
      } catch (e) {
        if (e.__keyword__ == 'redo') {
          i--;
        }
        else if (e.__keyword__ == 'break') {
          return e.opal_value;
        }
        else {
          throw e;
        }
      }
    }`
    self
  end
  
  # Same as {Array#each}, but passes the index of the element instead of the
  # element itself.
  # 
  # If no block given, an enumerator is returned instead.
  # 
  # @note enumerator functionality not yet implemented.
  # 
  # @example
  #   a = ["a", "b", "c"]
  #   a.each_index { |x| puts x }
  #   # => 0
  #   # => 1
  #   # => 2
  # 
  # @return [Array] returns receiver
  def each_index(&block)
    `for (var i = 0; i < #{self}.length; i++) {
      try {
        #{block}.apply(#{block}.__self__, [i]);
      } catch (e) {
        if (e.__keyword__ == 'redo') {
          i--;
        }
        else if (e.__keyword__ == 'break') {
          return e.opal_value;
        }
        else {
          throw e;
        }
      }
    }`
    self
  end
  
  # Returns `true` if `self` contains no elements, `false` otherwise
  # 
  # @example
  #   [].empty?
  #   # => true
  # 
  # @return [Boolean] empty or not
  def empty?
    `return #{self}.length == 0 ? #{true} : #{false};`
  end
  
  alias_method :eql?, :==
  
  # Tries to return the element at position `index`. If the index lies outside
  # the array, the first form throws an `IndexError` exception, the second form
  # returns `default`, and the third form returns the value of invoking the 
  # block, passing in the index. Negative values of `index` count from the end
  # of the array.
  # 
  # @example First form
  #   a = [11, 22, 33, 44]
  #   a.fetch(1)
  #   # => 22
  #   a.fetch(-1)
  #   # => 44
  # 
  # @example Second form
  #   a.fetch(4, 'cat')
  #   # => "cat"
  # 
  # @example Third form
  #   a.fetch(4) { |i| i * i }
  #   # => 16
  # 
  # @param [Number] index
  # @param [Object] defaults
  # @return [Object] returns result
  def fetch(index, defaults, &block)
    `var idx = #{index};
    if (#{index} < 0) #{index} += #{self}.length;
    if (#{index} < 0 || #{index} >= #{self}.length) {
      if (#{defaults} === undefined) {
        throw "IndexError.."
      }
      else if (#{defaults}.info & #{self}.TP) {
        return #{defaults}.apply(#{defaults}.__self__, [idx]);
      }
      else {
        return #{defaults};
      }
    }
    return #{self}[#{index}];`
  end
  
  # Returns the index of the first object in `self` such that it is `==` to 
  # `obj`. If a block is given instead of an argument, returns first object for
  # which `block` is true. Returns `nil` if no match is found. See also
  # Array#rindex.
  # 
  # If neither a block nor an argument is given, an enumerator is returned 
  # instead.
  # 
  # @note enumerator functionality not yet implemented.
  # 
  # @example
  #   a = ["a", "b", "c"]
  #   a.index("b")
  #   # => 1
  #   a.index("z")
  #   # => nil
  #   a.index { |x| x == "b" }
  #   # => 1
  # 
  # @param [Object] object to look for
  # @return [Number, nil] result
  def index(object)
    `if (#{object} === undefined) {
      throw "need to return enumerator"
    } else if (#{object}.info & #{self}.TP) {
      for (var i = 0; i < #{self}.length; i++) {
        if (#{object}.apply(#{object}.__self__, [#{self}[i]]).r) {
          return i;
        }
      }
    } else {
      for (var i = 0; i < #{self}.length; i++) {
        if (#{self}[i]['$=='](#{object}).r) {
          return i;
        }
      }
    }
    return #{nil};`
  end
  
  # Returns the first element, or the first `n` elements, of the array. If the
  # array is empty, the first form returns `nil`, and the second form returns an
  # empty array.
  # 
  # @example
  #   a = ["q", "r", "s", "t"]
  #   a.first
  #   # => "q"
  #   a.first(2)
  #   # => ["q", "r"]
  # 
  # @param [Number] n number of elements
  # @return [Object, Array] object or array of objects
  def first(count=nil)
    if count
      `return #{self}.slice(0, #{count});`
    else
      `if (#{self}.length == 0) {
        return #{nil};
      }
      return #{self}[0];`
    end
  end
  
  # Returns a new array that is a one-dimensional flattening of this array
  # (recursively). That is, for every element that is an array, extract its
  # elements info the new array. If the optional `level` argument determines the
  # level of recursion to flatten.
  # 
  # @example
  #   s = [1, 2, 3]
  #   # => [1, 2, 3]
  #   t = [4, 5, 6, [7, 8]]
  #   # => [4, 5, 6, [7, 8]]
  #   a = [s, t, 9, 10]
  #   # => [[1, 2, 3], [4, 5, 6, [7, 8]], 9, 10]
  #   a.flatten
  #   # => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  #   a = [1, 2, [3, [4, 5]]]
  #   a.flatten(1)
  #   # => [1, 2, 3, [4, 5]]
  # 
  # @param [Number] level the level to flatten
  # @return [Array] returns new array
  def flatten(level = nil)
    `var result = [];
    for (var i = 0; i < #{self}.length; i++) {
      var item = #{self}[i];
      if (item.info & #{self}.TA) {
        if (#{level} == #{nil}) {
          result = result.concat(item.$flatten());
        }
        else if (#{level} == 0) {
          result.push(item);
        }
        else {
          result = result.concat(item.$flatten(#{level} - 1));
        }
      }
      else {
        result.push(item);
      }
    }
    return result;`
  end
  
  # Flattens `self` in place. Returns `nil` if no modifications were made (i.e.,
  # `ary` contains no subarrays.) If the optional `level` argument determines 
  # the level of recursion to flatten.
  # 
  # @todo current implementation is probably not all that ideal.. (efficiency)
  # 
  # @example
  #  a = [1, 2, [3, [4, 5]]]
  #  a.flatten!
  #  # => [1, 2, 3, 4, 5]
  #  a.flatten!
  #  # => nil
  #  a
  #  # => [1, 2, 3, 4, 5]
  # 
  # @param [Number] level to flatten to
  # @return [Array] returns receiver
  def flatten!(level)
    length = `#{self}.length`
    result = flatten level
    clear
    concat result
    `if (#{self}.length == #{length}) {
      return #{nil};
    }`
    self
  end
  
  # Returns `true` if the given object is present in `self`, `false` otherwise.
  # 
  # @example
  #   a = ["a", "b", "c"]
  #   a.include? "b"
  #   # => true
  #   a.include? "z"
  #   # => false
  def include?(member)
    `for (var i = 0; i < #{self}.length; i++) {
      if (#{member}['$=='](#{self}[i]).r) {
        return #{true};
      }
    }`
    false
  end
  
  # Replaces the contents of `self` with the contents of `other_ary`, truncating
  # or expanding if necessary.
  # 
  # @example
  #   a = ["a", "b", "c", "d", "e"]
  #   a.replace ["x", "y", "z"]
  #   # => ["x", "y", "z"]
  #   a
  #   # => ["x", "y", "z"]
  # 
  # @param [Array] other_ary array to replace with
  # @return [Array] returns receiver
  def replace(other_ary)
    `#{self}.splice(0, #{self}.length);
    for (var i = 0; i < #{other_ary}.length; i++) {
      #{self}.push(#{other_ary}[i]);
    }`
    self
  end
  
  # Inserts the given values before the element with the given index (which may
  # be negative).
  # 
  # @example
  #   a = ["a", "b", "c", "d"]
  #   a.insert(2, 99)
  #   # => ["a", "b", 99, "c", "d"]
  #   a.insert(-2, 1, 2, 3)
  #   # => ["a", "b", 99, "c", 1, 2, 3, "d"]
  # 
  # @param [Number] index index for insertion
  # @param [Object] obj objects to insert
  # @return [Array] returns the receiver
  def insert(index, *obj)
    # should we add 1??? dont know?
    `if (#{index} < 0) #{index} += (#{self}.length + 1);
    if (#{index} < 0 || #{index} >= #{self}.length) {
      throw "IndexError... out of range"
    }
    #{self}.splice.apply(#{self}, [#{index}, 0].concat(#{obj}));`
    self
  end
  
  # Returns a string created by converting each element of the array to a string
  # separated by `sep`.
  # 
  # @example
  #   ["a", "b", "c"].join
  #   # => "abc"
  #   ["a", "b", "c"].join '-'
  #   "a-b-c"
  # 
  # @param [String] sep the separator
  # @return [String] joined string
  def join(sep = "")
    `var result = [];
    for (var i = 0; i < #{self}.length; i++) {
      result.push(#{self}[i].$to_s());
    }
    return result.join(#{sep});`
  end
  
  # Deletes every element of `self` for which `block` evaluates to false. See
  # also Array#select!
  # 
  # If no block given, an enumerator is returned instead.
  # 
  # @todo No enumerator currently returned.
  # 
  # @example
  #   a = [1, 2, 3, 4, 5, 6]
  #   a.keep_if { |x| x < 4 }
  #   # => [1, 2, 3]
  # 
  # @return [Array] receiver
  def keep_if(&block)
    `for (var i = 0; i < #{self}.length; i++) {
      try {
        var res = #{block}.apply(#{block}.__self__, [#{self}[i]]);
        if (!res.r) {
          #{self}.splice(i, 1);
          i--;
        }
      }
      catch (e) {
        throw "Array#keep_if catch not implemented yet"
      }
    }`
    self
  end
  
  # Return the last element(s) of `self`. If the array is empty, the first form
  # returns `nil`.
  # 
  # @example
  #   a = ["w", "x", "y", "z"]
  #   a.last
  #   # => "z"
  #   a.last(2)
  #   # => ["y", "z"]
  # 
  # @param [Number] n number of items to get
  # @return [Object, Array] result
  def last(n = nil)
    if n
      `return #{self}.slice(#{self}.length - #{n}, #{self}.length);`
    else
      `if (#{self}.length == 0) {
        return #{nil};
      }
      return #{self}[#{self}.length - 1];`
    end
  end
  
  # Returns the number of elements in `self`. May be zero.
  # 
  # @example
  #   [1, 2, 3, 4, 5].length
  #   # => 5
  # 
  # @return [Number] length
  def length
    `return #{self}.length;`
  end
  
  alias_method :size, :length
  
  # Removes the last element from `self` and returns it, or `nil` if array is
  # empty.
  # 
  # If a number `n` is given, returns an array of the last n elements (or less)
  # just like `array.slice!(-n, n) does.
  # 
  # @example
  #   a = ["a", "b", "c", "d"]
  #   a.pop
  #   # => "d"
  #   a.pop(2)
  #   # => ["b", "c"]
  #   a
  #   # => ["a"]
  # 
  # @param [Number] n number to pop
  # @return [Array] returns receiver
  def pop(n = nil)
    if n
      `return #{self}.splice(#{self}.length - #{n}, #{self}.length);`
    else
      `if (#{self}.length) {
        return #{self}.pop();
      }
      return #{nil};`
    end
  end
  
  # Append - Pushes the given object(s) on to the end of this array. This 
  # expression returns the array itself, so several appends may be chained
  # together.
  # 
  # @example
  #   a = ["a", "b", "c"]
  #   a.push("d", "e", "f")
  #   # => ["a", "b", "c", "d", "e", "f"]
  # 
  # @param [Object] obj object(s) to push
  # @retrun [Array] returns receiver
  def push(*obj)
    `for (var i = 0; i < #{obj}.length; i++) {
      #{self}.push(#{obj}[i]);
    }`
    self
  end
  
  # Searches tthrough the array whose elements are also arrays. Comapres `obj`
  # with the second element of each contained array using `==`. Returns the 
  # first contained array that matches. See also {Array#assoc}.
  # 
  # @example
  #   a = [[1, "one"], [2, "two"], [3, "three"], ["ii", "two"]]
  #   a.rassoc("two")
  #   # => [2, "two"]
  #   a.rassoc("four")
  #   # => nil
  # 
  # @param [Object] obj object to search for
  # @return [Object, nil] result or nil
  def rassoc(obj)
    `for (var i = 0; i < #{self}.length; i++) {
      var test = #{self}[i];
      if (test.info & #{self}.TA && test[1] !== undefined && test[1]===#{obj}) {
        return test;
      }
    }`
    nil
  end
  
  # Returns a new array containing the items in `self` for which the block is
  # not true. See also {Array#delete_if}.
  # 
  # If no block is given, an enumerator is returned instead.
  # 
  # @note Enumerator functionality not yet implemented.
  # 
  # @example
  #   a = [1, 2, 3, 4, 5, 6]
  #   a.reject { |x| x > 3 }
  #   # => [1, 2, 3]
  #   a
  #   # => [1, 2, 3, 4, 5, 6]
  # 
  # @return [Array] returns array
  def reject(&block)
    `var result = [];
    for (var i = 0; i < #{self}.length; i++) {
      try {
        var res = #{block}.apply(#{block}.__self__, [#{self}[i]]);
        if (!res.r) {
          result.push(#{self}[i]);
        }
      }
      catch (e) {
        throw "Array#reject catch not implemented yet"
      }
    }
    return result;`
  end
  
  # Equivalent to {Array#delete_if}, deleting elements from `self` for which the
  # block evaluates to true, but returns `nil` if no changes were made. See also
  # {Array#delete_if}.
  # 
  # If no block is given, an enumerator is returned instead.
  #  
  # @note Enumerator functionality is not yet implemented.
  # 
  # @example
  #   a = [1, 2, 3, 4, 5, 6]
  #   a.reject! { |x| x > 3 }
  #   # => [1, 2, 3]
  #   a.reject! { |x| x > 3 }
  #   # => nil
  #   a
  #   # => [1, 2, 3]
  # 
  # @return [Array] returns receiver
  def reject!(&block)
    `var length = #{self}.length;
    for (var i = 0; i < #{self}.length; i++) {
      try {
        var res = #{block}.apply(#{block}.__self__, [#{self}[i]]);
        if (res.r) {
          #{self}.splice(i, 1);
          i--;
        }
      }
      catch (e) {
        throw "Array#reject catch not implemented yet"
      }
    }
    return #{self}.length == length ? #{nil} : #{self};`
  end
  
  # Returns a new array containing `self`'s elements in reverse order.
  # 
  # @example
  #   ["a", "b", "c"].reverse
  #   # => ["c", "b", "a"]
  #   [1].reverse
  #   # => [1]
  # 
  # @return [Array] reversed array
  def reverse
    `var result = [];
    for (var i = #{self}.length - 1; i >= 0; i--) {
      result.push(#{self}[i]);
    }
    return result;`
  end
  
  # Reverses `self` in place.
  # 
  # @example
  #   a = ["a", "b", "c"]
  #   a.reverse!
  #   # => ["c", "b", "a"]
  #   a
  #   # => ["c", "b", "a"]
  # 
  # @return [Array] returns receiver
  def reverse!
    `return #{self}.reverse();`
  end
  
  # Same as {Array#each}, but traverses `self` in reverse order.
  # 
  # @example
  #   a = ["a", "b", "c"]
  #   a.reverse_each { |x| puts x }
  #   # => "c"
  #   # => "b"
  #   # => "a"
  # 
  # @return [Array] returns receiver
  def reverse_each(&block)
    `for (var i = #{self}.length - 1; i >= 0; i--) {
      try {
        #{block}.apply(#{block}.__self__, [#{self}[i]]);
      } catch (e) {
        if (e.__keyword__ == 'redo') {
          i++;
        }
        else if (e.__keyword__ == 'break') {
          return e.opal_value;
        }
        else {
          throw e;
        }
      }
    }`
    self
  end
  
  # Returns the index of the last object in `self` == to `object`. If a block is
  # given instead of an argument, returns the first object for which `block` is
  # true, starting from the last object. Returns `nil` if no match is found. See
  # also {Array#index}.
  # 
  # @example
  #   a = ["a", "b", "b", "b", "c"]
  #   a.rindex("b")
  #   # => 3
  #   a.rindex("z")
  #   # => nil
  #   a.rindex { |x| x == "b" }
  #   # => 3
  # 
  # @return [Object, nil] returns result or nil
  def rindex(object)
    `if (#{object} === undefined) {
      throw "need to return enumerator"
    } else if (#{object}.info & #{self}.TP) {
      for (var i = #{self}.length - 1; i > 0; i--) {
        if (#{object}.apply(#{object}.__self__, [#{self}[i]]).r) {
          return i;
        }
      }
    } else {
      for (var i = #{self}.length - 1; i > 0; i--) {
        if (#{self}[i]['$=='](#{object}).r) {
          return i;
        }
      }
    }
    return #{nil};`
  end
  
  # Invokes the block passing in successive elements from `self`, returning an
  # array containing those elements for which the block returns a true value.
  # 
  # @note enumerator functionality is not yet implemented.
  # 
  # @example
  #   a = [1, 2, 3, 4, 5, 6]
  #   a.select { |x| x > 4 }
  #   # => [5, 6]
  # 
  # @return [Array] returns array
  def select(&block)
    `var result = [];
    for (var i = 0; i < #{self}.length; i++) {
      try {
        var res = #{block}.apply(#{block}.__self__, [#{self}[i]]);
        if (res.r) {
          result.push(#{self}[i]);
        }
      }
      catch (e) {
        throw "Array#select catch not implemented yet"
      }
    }
    return result;`
  end
  
  # Invokes the block passing in successive elements from `self`, deleting the
  # elements for which the block returns a false value. It returns `self` if
  # changes were made, otherwise it returns `nil`. See also {Array#keep_if}.
  # 
  # If no block is given, an enumerator is returned instead.
  # 
  # @note Enumerator functionality not yet implemented.
  # 
  # @example
  #   a = [1, 2, 3, 4, 5, 6]
  #   a.select! { |x| x > 4 }
  #   # => [5, 6]
  #   a.select! { |x| x > 4 }
  #   # => nil
  #   a
  #   # => [5, 6]
  # 
  # @return [Array] returns receiver
  def select!(&block)
    `var length = #{self}.length;
    for (var i = 0; i < #{self}.length; i++) {
      try {
        var res = #{block}.apply(#{block}.__self__, [#{self}[i]]);
        if (!res.r) {
          #{self}.splice(i, 1);
          i--;
        }
      }
      catch (e) {
        throw "Array#select! catch not implemented yet"
      }
    }
    return #{self}.length == length ? #{nil} : #{self};`
  end
  
  # Returns the first element of `self` and removes it (shifting all other 
  # elements down by one). Returns `nil` if the array is empty.
  # 
  # If a number `n` is given, returns an array of the first n elements (or less)
  # just like array.slice!(0, n) does.
  # 
  # @example
  #   a = ["a", "b", "c"]
  #   a.shift
  #   # => "a"
  #   a
  #   # => ["b", "c"]
  #   a = ["a", "b", "c"]
  #   a.shift(2)
  #   # => ["b", "c"]
  #   a
  #   # => ["c"]
  # 
  # @param [Number] n elements to shift
  # @return [Array] result
  def shift(n = nil)
    if n
      `return #{self}.splice(0, #{n});`
    else
      `if (#{self}.length) {
        return #{self}.shift();
      }
      return #{nil};`
    end
  end
  
  # Deletes the element(s) given by an `index` (optionally with a length) or by
  # a range. Returns the deleted object(s), or `nil` if the index is out of
  # range.
  # 
  # @example
  #   a = ["a", "b", "c"]
  #   a.slice!(1)
  #   # => "b"
  #   a
  #   # => ["a", "c"]
  #   a.slice!(-1)
  #   # => "c"
  #   a
  #   # => ["a"]
  #   a.slice!(100)
  #   # => nil
  #   a
  #   # => ["a"]
  # 
  # @todo Does not yet work with ranges.
  # 
  # @param [Range, Number] index to begin with
  # @param [Number] length last index
  # @return [Array, nil] result
  def slice!(index, length = nil)
    size = `#{self}.length;`
    
    if index.is_a? Range
      raise "need to implement range"
    else
      `if (#{index} < 0) #{index} += #{size};`
    end
    `if (#{index} >= #{size} || #{index} < 0) return #{nil};`
    
    if length
      `if (#{length} <= 0 || #{length} > #{self}.length) return #{nil};`
      `return #{self}.splice(#{index}, #{index} + #{length});`
    else
      `return #{self}.splice(#{index}, 1)[0];`
    end
  end
  
  # Returns first `n` elements from ary.
  # 
  # @example
  #   a = [1, 2, 3, 4, 5, 0]
  #   a.take(3)
  #   # => [1, 2, 3]
  # 
  # @return [Array] array of elements
  def take(n)
    `return #{self}.slice(0, #{n});`
  end
  
  # Passes elements to the block until the block returns `nil` or `false`, then
  # stops iterating and returns an array of all prior elements.
  # 
  # If no block given, an enumerator is returned instead.
  # 
  # @todo Enumerator functionality not yet implemented.
  # 
  # @example
  #   a = [1, 2, 3, 4, 5, 6]
  #   a.take_while { |i| i < 3 }
  #   # => [1, 2]
  # 
  # @return [Array] array with elements
  def take_while(&block)
    `var result = [];
    for (var i = 0; i < #{self}.length; i++) {
      try {
        var res = #{block}.apply(#{block}.__self__, [#{self}[i]]);
        if (res.r) {
          result.push(#{self}[i]);
        } else {
          break;
        }
      }
      catch (e) {
        throw "Array#take_while catch not implemented yet"
      }
    }
    return result;`
  end
  
  # Returns self.
  # 
  # @example
  #   a = [1, 2, 3]
  #   a.to_a
  #   # => [1, 2, 3]
  # 
  # @return [Array] returns the receiver
  def to_a
    self
  end
  
  # Returns self.
  # 
  # @example
  #   a = [1, 2, 3]
  #   a.to_ary
  #   # => [1, 2, 3]
  # 
  # @return [Array] returns the receiver
  def to_ary
    self
  end
  
  # Returns a new array by removing duplicate values in `self`.
  # 
  # @example
  #   a = ["a", "a", "b", "b", "c"]
  #   a.uniq
  #   # => ["a", "b", "c"]
  #   a
  #   # => ["a", "a", "b", "b", "c"]
  # 
  # @return [Array]
  def uniq
    `var result = [], seen = [];
    for (var i = 0; i < #{self}.length; i++) {
      var test = #{self}[i], hash = test.hash().toString();
      if (seen.indexOf(hash) == -1) {
        seen.push(hash);
        result.push(test);
      }
    }
    return result;`
  end
  
  # Removes duplicate elements from `self`. Returns `nil` if no changes are
  # made (that is, no duplicates are found).
  # 
  # @example
  #   a = ["a", "a", "b", "b", "c"]
  #   a.uniq!
  #   # => ["a", "b", "c"]
  #   a.uniq!
  #   # => nil
  # 
  # @return [Array] returns receiver
  def uniq!
    `var seen = [], length = #{self}.length;
    for (var i = 0; i < #{self}.length; i++) {
      var test = #{self}[i], hash = test.hash().toString();
      if (seen.indexOf(hash) == -1) {
        seen.push(hash);
      } else {
        #{self}.splice(i, 1);
        i--;
      }
    }
    return #{self}.length == length ? #{nil} : #{self};`
  end
  
  # Prepends objects to the front of `self`, moving other elements upwards.
  # 
  # @example
  #   a = ["b", "c", "d"]
  #   a.unshift("a")
  #   # => ["a", "b", "c", "d"]
  #   a.unshift(1, 2)
  #   # => [1, 2, "a", "b", "c", "d"]
  # 
  # @param [Object] object objects to add
  # @return [Array] returns receiver
  def unshift(*object)
    `for (var i = #{object}.length - 1; i >= 0 ; i--) {
      #{self}.unshift(#{object}[i]);
    }`
    self
  end
  
  def each_with_index(&block)
     `for (var i = 0; i < #{self}.length; i++) {
        try {
          #{block}.apply(#{block}.__self__, [#{self}[i], i]);
        } catch (e) {
          if (e.__keyword__ == 'redo') {
            i--;
          }
          else if (e.__keyword__ == 'break') {
            return e.opal_value;
          }
          else {
            throw e;
          }
        }
      }`
    self
  end
  
  def inspect
    description = ["["]
    self.each_with_index do |item, index|
      description << ", " if index > 0
      description << item.inspect
    end
    description << "]"
    description.join ""
  end
end
