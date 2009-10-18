# 
# string.rb
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

`String.prototype.$klass = cString
String.prototype.$type = VN.STRING;

cString.$define_alloc_func(function() {
  return new String();
}); `

class String
  
  def try_convert
    
  end
  
  def initialize
    
  end
  
  def initialize_copy
    
  end
  
  def <=>(obj)
    
  end
  
  def ==(obj)
    `return (self == obj) ? true : false;`
  end
  
  def eql?(obj)
    
  end
  
  def hash(obj)
    
  end
  
  def casecmp(obj)
    
  end
  
  def +(obj)
    puts 'wow'
  end
  # 
  def *(obj)
    
  end
  # 
  def %(obj)
  #   
  end
  
  def [](key)
    
  end
  
  def []=(key, val)
    
  end
  
  def insert
    
  end
  
  def length
    `return self.length;`
  end
  
  def size
    `return self.length`
  end
  
  def empty?
    
  end
  
  def =~(match)
    
  end
  
  def match(match)
    
  end
  
  def succ
    
  end
  
  def next
    
  end
  
  def upto
    
  end
  
  def index
    
  end
  
  def rindex
    
  end
  
  def replace
    
  end
  
  def clear
    
  end
  
  def chr
    
  end
  
  def to_i
    
  end
  
  def to_f
    
  end
  
  def to_s
    `return new String(self);`
  end
  
  def to_str
    to_s
  end
  
  def inspect
    `return new String('"' + self + '"');`
  end
  
  def dump
    
  end
  
  def upcase
    
  end
  
  def downcase
    
  end
  
  def capitalize
    
  end
  
  def swapcase
    
  end
  
  def camelize
    `var parts = self.split('_');
    var length = parts.length;

    if (length == 1) return parts[0];

    var camelized = self.charAt(0) == '-'
      ? parts[0].charAt(0).toUpperCase() + parts[0].substring(1)
      : parts[0];

    for (var i = 1; i < length; i++)
      camelized += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);

    return camelized;`
  end
  
  def hex
    
  end
  
  def oct
    
  end
  
  def split
    
  end
  
  def lines
    
  end
  
  def bytes
    
  end
  
  def chars
    
  end
  
  def codepoints
    
  end
  
  def reverse
    
  end
  
  def concat
    
  end
  
  def <<
    
  end
  
  def crypt
    
  end
  
  def intern
    
  end
  
  def to_sym
    `return new String(self);`
  end
  
  def ord
    
  end
  
  def include?
    
  end
  
  def start_with?
    
  end
  
  def end_with?
    
  end
  
  def scan
    
  end
  
  def ljust
    
  end
  
  def rjust
    
  end
  
  def center
    
  end
  
  def sub
    
  end
  
  def gsub
    
  end
  
  def chop
    
  end
  
  def chomp
    
  end
  
  def strip
    
  end
  
  def lstrip
    
  end
  
  def rstrip
    
  end
  
  def tr
    
  end
  
  def tr_s
    
  end
  
  def delete
    
  end
  
  def squeeze
    
  end
  
  def count
    
  end
  
  def each_line
    
  end
  
  def each_byte
    
  end
  
  def each_char
    
  end
  
  def each_codepoint
    
  end
  
  def sum
    
  end
  
  def slice!
    
  end
  
  def partition
    
  end
  
  def rpartition
    
  end
  
end
