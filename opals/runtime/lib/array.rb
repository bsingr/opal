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
  
  def map(&block)
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
  
  def join(separator)
    `return #{self}.join(#{separator});`
  end
  
  def <<(obj)
    `#{self}.push(#{obj});`
    self
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
  
  def ==(other)
    `if (#{self} === #{other}) return #{true};
    if (!(#{other}.info & #{self}.TA)) return #{false};
    if (#{self}.length !== #{other}.length) return #{false};
    for (var i = 0; i < #{self}.length; i++) {
      if (!#{self}[i]['$=='](#{other}[i]).r) return #{false};
    }`
    true
  end
  
  def [](index)
    `return #{self}[#{index}];`
  end
  
  def []=(index, value)
    `return #{self}[#{index}] = #{value};`
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
  
  def +(other)
    `for (var i = 0; i < #{other}.length; i++) {
      #{self}.push(#{other}[i]);
    }`
    self
  end
  
  def unshift(object)
    `return #{self}.unshift(#{object});`
  end
end
