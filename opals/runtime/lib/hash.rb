# 
# hash.rb
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

class Hash
  
  def []=(key, value)
    # `console.log("need to store " + #{value} + " for key " + #{key});`
    `return #{self}.hash_store(#{key}, #{value});`
  end
  
  def delete(key)
    `return #{self}.hash_delete(#{key});`
  end
  
  def keys
    `return #{self}.__keys__;`
  end
  
  def values
    `var result = [];
    for (var i = 0; i < #{self}.__keys__.length; i++) {
      result.push(#{self}.__assocs__[#{self}.__keys__[i].hash()]);
    }
    return result;`
  end
  
  def merge(other)
    result = {}
    
    self.each do |key, value|
      result[key] = value
    end
    
    other.each do |key, value|
      result[key] = value
    end
    
    result
  end
  
  def [](key)
    `return #{self}.hash_fetch(#{key});`
  end
  
  def each(&block)
    `var key, value;
    for (var i = 0; i < #{self}.__keys__.length; i++) {
      key = #{self}.__keys__[i];
      value = #{self}.__assocs__[key.hash()];
      #{block}.apply(#{block}.__self__, [key, value]);
    }`
    self
  end
  
  def size
    `return #{self}.__keys__.length;`
  end
  
  def ==(other)
    `if (#{self} === #{other}) return #{true};
    if (!(#{other}.info & #{self}.TH)) return #{false}
    if (#{self}.__keys__.length !== #{other}.__keys__.length) return #{false};
    for (var i = 0; i < #{self}.__keys__.length; i++) {
      var key = #{self}.__keys__[i].hash();
      if (!(#{self}.__assocs__[key]['$=='](#{other}.__assocs__[key]).r)) return #{false};
    }`
    true
  end  
end