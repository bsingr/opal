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
  
  # alias_method :slice, :[]
  
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
  
  def join(separator)
    `return #{self}.join(#{separator});`
  end
  
  
  
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
  
  def length
    `return #{self}.length;`
  end
  
  def size
    `return #{self}.length;`
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
  
  
  
  
  
  
  
  def index(object)
    `return #{self}.indexOf(#{object});`
  end
  
  def include?(member)
    `return #{self}.indexOf(#{member}) == -1 ? #{false} : #{true};`
  end
  
  def delete(object)
    `var index = #{self}.indexOf(object);
    if (index !== -1) {
      #{self}.splice(index, 1);
    }`
    self
  end
  
  def pop
    `if (#{self}.length) {
      return #{self}.pop();
    }
    return #{nil};`
  end
  
  def unshift(object)
    `return #{self}.unshift(#{object});`
  end
end
