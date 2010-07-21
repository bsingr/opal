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

class Array
  
  def each &block
    `var actual_array = #{self}.__arr__;
    //console.log(" for " + actual_array + " do " + actual_array.length);
    for (var i = 0; i < actual_array.length; i++) {
      #{block}.__fun__(actual_array[i]);
    }`
    self
  end
  
  def join(separator)
    `return #{self}.__arr__.join(#{separator}.__str__);`
  end
  
  def <<(obj)
    `return #{self}.__arr__.push(#{obj});`
  end
  
  def length
    `return #{self}.N(#{self}.__arr__.length);`
  end
  
  def inspect
    description = "["
    self.each do |item|
      description << item.inspect
    end
    description << "]"
    description
  end
  
  def ==(other)
    `if (#{self} === #{other}) return #{true};
    if (!(#{other}.info & #{self}.TA)) return #{false};
    if (#{self}.__arr__.length !== #{other}.__arr__.length) return #{false};
    for (var i = 0; i < #{self}.__arr__.length; i++) {
      if (!#{self}.__arr__[i].$$e$e(#{other}.__arr__[i].r)) return #{false};
    }`
    true
  end
end
