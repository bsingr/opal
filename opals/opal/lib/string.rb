# 
# string.rb
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

# A {String} object holds a sequence of bytes, typically representing 
# characters.
# 
# ## Implementation Details.
# 
# For performance, strings in Opal are built directly on top of native 
# javascript strings, so that they are in fact the same object. This has the
# side effect that all strings are immutable, that is, they cannot be changed.
# Most of the string methods that end in '!' for example are not implemented, 
# but their counterparts are: {#upcase} exists, but {#upcase!} does not, for
# example.
class String
  
  # Returns a new string object containing a copy of `str`.
  # 
  # @param [String] str string to copy
  # @return [String] result
  def self.new(str = "")
    `return new String(#{str});`
  end
  
  # Copy - Returns a new {String} constaining `num` copies of the receiver.
  # 
  # @example
  #   "Ho! " * 3
  #   # => "Ho! Ho! Ho! "
  # 
  # @param [Number] num number of copies
  # @return [String] result
  def *(num)
    `var res = [];
    for (var i = 0; i < #{num}; i++) {
      res.push(#{self});
    }
    return res.join('');`
  end
  
  # Concatenation - Returns a new {String} containing `other_str` concatenated
  # to `self`.
  # 
  # @example
  #   "Hello from " + self.to_s
  #   # => "Hello from main"
  # 
  # @param [String] other_str string to concatenate
  # @return [String] result
  def +(other_str)
    `return #{self} + #{other_str};`
  end
  
  # Comparison - returns -1 if `other_str` is greater than, 0 if `other_str` is
  # equal to, and 1 if `other_str` is less than `self`.
  # 
  # @example
  #   "abcdef" <=> "abcde"
  #   # => 1
  #   "abcdef" <=> "abcdef"
  #   # => 0
  #   "abcdef" <=> "abcdefg"
  #   # => -1
  #   "abcdef" <=> "ABCDEF"
  #   # => 1
  # 
  # @param [String] other_str string to compare
  # @return [-1, 0, 1, nil] result
  def <=>(other_str)
    `if (!(#{other_str}.info & #{self}.TS)) return #{nil};
    else if (#{self} > #{other_str}) return 1;
    else if (#{self} < #{other_str}) return -1;
    return 0;`
  end
  
  # Equality - if `other` is not a {String} return `false`. Otherwise, returns
  # `true` if `self` <=> `other` returns zero.
  # 
  # @param [String] other string to compare
  # @return [Boolean] result
  def ==(other)
    `return (#{self}.valueOf() === #{other}.valueOf()) ? #{true} : #{false};`
  end
  
  # Match - If obj is a {Regexp}, then uses it to match against self, returning
  # `nil` if there is no match, or the index of the match location otherwise. If
  # obj is not a regexp, then it calls `=~` on it, using the receiver as an
  # argument.
  # 
  # @todo passing a non regexp is not currently supported
  # 
  # @param [Regexp, Object] obj
  # @return [Number, nil]
  def =~(obj)
    obj.match self
    if $&
      return `#{self}.indexOf(#{$&})`
    end
    nil
  end
  
  # Returns a copy of `self` with the first character converted to uppercase and
  # the remainder to lowercase.
  # 
  # @example
  #   "hello".capitalize
  #   # => "Hello"
  #   "HELLO".capitalize
  #   # => "Hello"
  #   "123ABC".capitalize
  #   # => "123abc"
  # 
  # @return [String]
  def capitalize
    `return #{self}[0].toUpperCase() + #{self}.substr(1).toLowerCase();`
  end
  
  # Case-inseneitive version of {String#<=>}.
  # 
  # @example
  #   "abcdef".casecmp("abcde")
  #   # => 1
  #   "aBcDeF".casecmp("abcdef")
  #   # => 0
  #   "abcdef".casecmp("abcdefg")
  #   # => -1
  #   "abcdef".casecmp("ABCDEF")
  #   # => 0
  # 
  # @param [String] other_str string to compare
  # @return [-1, 0, 1, nil] result
  def casecmp(other_str)
    `var a = #{self}.toLowerCase(), b = #{other_str}.toLowerCase();
    if (!(b.info & a.TS)) return #{nil};
    else if (a > b) return 1;
    else if (a < b) return -1;
    return 0;`
  end
  
  # Returns a copy of `self` with all uppercase letters replaced with their 
  # lowercase counterparts.
  # 
  # @example
  #   "hEllO".downcase
  #   # => "hello"
  # 
  # @return [String] result
  def downcase
    `return #{self}.toLowerCase();`
  end
  
  # Returns `true` if `self` has a length of zero.
  # 
  # @example
  #   "hello".empty?
  #   # => false
  #   "".empty?
  #   # => true
  # 
  # @return [Boolean]
  def empty?
    `return #{self} == '' ? #{true} : #{false};`
  end
  
  # Returns `true` if `self` ends with a `suffix` given.
  # 
  # @example
  #   "hello".end_with? "lo"
  #   # => true
  # 
  # @param [String] suffix suffix to check
  # @return [Boolean]
  def end_with?(suffix = "")
    `return (#{suffix} != '' && #{self}.lastIndexOf(#{suffix}) == (#{self}.length - #{suffix}.length)) ? #{true} : #{false};`
  end
  
  # Two strings are equal if they have the same length and content.
  # 
  # @param [String] other string to comapre
  # @return [Boolean]
  def eql?(other)
    `return (#{self} == #{other}) ? #{true} : #{false};`
  end
  
  # Returns true if `self` contains the given `other_str`.
  # 
  # @example
  #   "hello".include? "lo"
  #   # => true
  #   "hello".include? "ol"
  #   # => false
  #   "hello".include? "h"
  #   # => true
  # 
  # @param [String] other_str string to check for
  # @return [Boolean]
  def include?(other_str)
    `var res = #{self}.indexOf(#{other_str});
    if (res != -1) {
      return #{true};
    }
    return #{false};`
  end
  
  # Returns the index of the first occurrence of the given `substring` or
  # pattern (regexp) in `self`. Returns `nil` if not found. If the second
  # parameter is present, it specifies the position in the string to begin the
  # search.
  # 
  # @todo Use of Regexp or offsets not yet implemented.
  # 
  # @example
  #   "hello".index "e"
  #   # => 1
  #   "hello".index "lo"
  #   # => 3
  #   "hello".index "a"
  #   # => nil
  #
  # @param [String] substring string to look for
  # @return [Number, nil] result
  def index(substring)
    `var res = #{self}.indexOf(#{substring});
    if (res != -1) {
      return res;
    }
    return #{nil};`
  end
  
  # Returns a printable version of `self`, surrounded by quote marks, with 
  # special characters escaped.
  # 
  # @todo Does not yet escape special characters
  # 
  # @example
  #   str = "hello"
  #   str.inspect
  #   # => "\"hello\""
  # 
  # @return [String]
  def inspect
    `return '"' + #{self} + '"';`
  end

  # Returns the {Symbol} corresponding to `self`, creating the symbol if it did
  # not previously exist.
  # 
  # @example
  #   "Koala".to_sym
  #   # => :Koala
  #   s = 'cat'.to_sym
  #   # => :cat
  #   s == :cat
  #   # => true
  #   s = '@cat'.to_sym
  #   # => :@cat
  #   s == :@cat
  #   # => true
  # 
  # This can also be used to create symbols that cannot be represented using the
  # :xxxx notation.
  # 
  # @example
  #   'cat and dog'.to_sym
  #   # => :"cat and dog"
  # 
  # @return [Symbol]
  def intern
    `return #{self}.Y(#{self});`
  end
  
  alias_method :to_sym, :intern
  
  # Returns the character length of `str`.
  # 
  # @return [Number] length of string
  def length
    `return #{self}.length;`
  end
  
  alias_method :size, :length
  
  # Returns a copy of `self` with leading whitespace removed. See also
  # {String#rstrip} and {String#strip}.
  # 
  # @example
  #   "   hello   ".lstrip
  #   # => "hello   "
  #   "hello".lstrip
  #   # => "hello"
  # 
  # @return [String]
  def lstrip
    `return #{self}.replace(/^\s*/, "");`
  end
  
  # Converts `pattern` to a match, if it isnt alrady one, then invokes its 
  # `match` method on the receiver. 
  # 
  # @param [Regexp] pattern
  # @return [MatchData, nil]
  def match(pattern)
    pattern.match self
  end
  
  # Returns a new string with the characters from `self` in reverse order.
  # 
  # @example
  #   "stressed".reverse
  #   # => "desserts"
  # 
  # @return [String]
  def reverse
    `return #{self}.split('').reverse().join('');`
  end
  
  def sub(pattern, replacement)
    `return #{self}.replace(#{pattern}, #{replacement});`
  end
  
  def gsub(pattern, replacement)
    `var r = pattern.toString();
    r = r.substr(1, r.lastIndexOf('/') - 1);
    r = new RegExp(r, 'g');
    return #{self}.replace(r, #{replacement});`
  end
  
  
  
  def slice(start, finish)
    `return #{self}.substr(#{start}, #{finish});`
  end
  
  alias_method :[], :slice
  
  def to_s
    self
  end
  
  def split(str)
    `return #{self}.split(#{str});`
  end
  
end
