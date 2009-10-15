# 
# array.rb
# vienna
# 
# Created by Adam Beynon.
# Copyright 2009 Adam Beynon.
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

`
Array.prototype.$klass = cArray
Array.prototype.$type = VN.ARRAY;

RModule.include(cArray, mEnumerable);

cArray.$define_alloc_func(function() {
  return new Array();
});

cArray.$def_s('[]', function() {
  
});

cArray.$def_s('try_convert', function() {
  
});
`

class Array
  
  def initialize 
    `for (var i = 0; i < arguments.length; i++) {
      self.push(arguments[i]);
    }`
  end
  
  def initialize_copy
    
  end
  
  def to_s
    `if (self.length == 0) return '[]';
    var str = '[';
    for (var i = 0; i < (self.length - 1); i++) {
      str += (self[i].$('inspect', []) + ', ');
    }
    str += (self[self.length - 1].$('inspect', []) + ']');
    return str ;`
  end
  
  def inspect
    to_s
  end
  
  def to_a
    self
  end
  
  def to_ary
    self
  end
  
  def ==(ary)
    `if (ary == this) return true;
    if (ary.$type != VN.ARRAY) {
      if (ary.$('respond_to?', ['to_a'])) {
        return false;
      }
    }
    if (this.length != ary.length) return false ;
    return true;`
  end
  
  def eql?(other)
  
  end
  
  def hash
  
  end
  
  # def [](*args)
  #   `if (arguments.length == 2) {
  #     var begin = arguments[0] ;
  #     var end = arguments[1] ;
  #     if (begin < 0) begin += this.length ;
  #     return VN.ary_subseq.call(this, begin, length) ;
  #   }`
  # end
  # 
  # def []=(adam, *args)
  #   
  # end
  
  def at
    
  end
  
  def fetch
    
  end
  
  def first
    `return self[0];`
  end
  
  def last
    `return self[self.length-1];`
  end
  
  def concat
    
  end
  
  def <<(obj)
    `return self.push(#{obj});`
  end
  
  def push(obj)
    `return self.push(#{obj});`
  end
  
  def pop
    `return self.pop();`
  end
  
  def shift
    
  end
  
  def unshift
    
  end
  
  def insert
    
  end
  
  # yield for each item in array, then return self
  # 
  def each (&block)
    `for (var i = 0; i < self.length; i++) {`
      yield `self[i]`
    `}`
    self
  end
  
  def each_index
    
  end
  
  def reverse_each
    
  end
  
  def length
    `return self.length;`
  end
  
  def size
    `return self.length;`
  end
  
  def empty?
    `return (self.length == 0) ? true : false;`
  end
  
  def find_index
    
  end
  
  def rindex
    
  end
  
  def index
    
  end
  
  def join
    
  end
  
  def reverse
    
  end
  
  def reverse!
    
  end
  
  def sort
    
  end
  
  def sort!
    
  end
  
  def collect
    
  end
  
  def collect!
    
  end
  
  def map
    
  end
  
  def map!
    
  end
  
  def select
    
  end
  
  def values_at
    
  end
  
  def delete
    
  end
  
  def delete_at
    
  end
  
  def delete_if
    
  end
  
  def reject
    
  end
  
  def reject!
    
  end
  
  def zip
    
  end
  
  def transpose
    
  end
  
  def replace
    
  end
  
  def clear
    
  end
  
  def fill
    
  end
  
  def include? obj
    `return (self.indexOf(obj) == -1) ? false : true;`
  end
  
  def <=>
    
  end
  
  def slice
    
  end
  
  def slice!
    
  end
  
  def assoc
    
  end
  
  def rassoc
    
  end
  
  # def +
  #   
  # end
  # 
  # def *
  #   
  # end
  # 
  # def -
  #   
  # end
  # 
  # def &
  #   
  # end
  # 
  # def |
  #   
  # end
  
  def uniq
    
  end
  
  def uniq!
    
  end
  
  def compact
    
  end
  
  def compact!
    
  end
  
  def flatten
    
  end
  
  def flatten!
    
  end
  
  def count
    
  end
  
  def shuffle
    
  end
  
  def shuffle!
    
  end
  
  def sample
    
  end
  
  def cycle
    
  end
  
  def permutation
    
  end
  
  def combination
    
  end
  
  def product
    
  end
  
  def take
    
  end
  
  def take_while
    
  end
  
  def drop
    
  end
  
  def drop_while
    
  end
  
end
