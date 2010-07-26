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
    `for (var i = 0; i < #{self}.length; i++) {
      #{block}.__fun__(#{self}[i]);
    }`
    self
  end
  
  def join(separator)
    `return #{self}.join(#{separator});`
  end
  
  def <<(obj)
    `return #{self}.push(#{obj});`
  end
  
  def length
    `return #{self}.length;`
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
    if (#{self}.length !== #{other}.length) return #{false};
    for (var i = 0; i < #{self}.length; i++) {
      if (!#{self}[i].$$e$e(#{other}[i].r)) return #{false};
    }`
    true
  end
  
  def [](index)
    `return #{self}[#{index}] || #{nil};`
  end
  
  def include?(member)
    false
  end
  
  def pop
    `if (#{self}.length) {
      return #{self}.pop();
    }
    return #{nil};`
  end
end
