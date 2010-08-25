# 
# module.rb
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

class Module
  
  def ===(object)
    object.is_a? self
  end
  
  def undef_method symbol
    puts "need to undefine method: #{symbol}"
  end
  
  def define_method(method, &implementation)
    # we are defining a method, so always use opal_self to reclaim self
    `#{implementation}.__fun__.opal_self = true;
    var mid = #{method.to_s};
    var jsid = #{self}.mid2jsid(mid);
    #{self}.dm(mid, jsid, #{implementation}.__fun__, false);`
    self
  end
  
  def attr_accessor(*attributes)
    # puts "in attr_accessor"
    `#{self}.$attr_reader.apply(#{self}, #{attributes});`
    `#{self}.$attr_writer.apply(#{self}, #{attributes});`
    self
  end
  
  def to_s
    `return #{self}.class_name;`
  end
  
  
  
  def attr_reader(*attributes)
    attributes.each do |attribute|
      `var mid = #{attribute.to_s};
      var jsid = #{self}.mid2jsid(mid);
      #{self}.dm(mid, jsid, function() {
        var #{self} = this;
        return #{self}.ig('@' + mid);
      }, false);`
    end
    
    self
  end
  
  def attr_writer(*attributes)
    attributes.each do |attribute|
      `var mid = #{attribute.to_s};
      var mid2 = mid + "=";
      var jsid = #{self}.mid2jsid(mid2);
      #{self}.dm(mid2, jsid, function(val) {
        var #{self} = this;
        return #{self}.is('@' + mid, val);
      }, false);`
    end
    
    self
  end
  
  def const_set(id, value)
    `return #{self}.const_set(#{id}, #{value});`
  end
  
  def module_eval(&block)
    # puts "about to module eval"
    # `console.log(#{self});`
    if block_given?
      # puts "block was given.."
      # `console.log(#{self});`
      `#{block}.__fun__.opal_self = true;`
      `#{block}.__fun__.apply(#{self});`
    end
  end
  
  # alias_method :class_eval, :module_eval
end
