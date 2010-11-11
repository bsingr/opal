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
  
  def name
    `return #{self}.class_name;`
  end
  
  def ===(object)
    object.is_a? self
  end
  
  def undef_method symbol
    puts "need to undefine method: #{symbol}"
  end
  
  def define_method(method, &implementation)
    # we are defining a method, so always use opal_self to reclaim self
    # `#{implementation}.__fun__.opal_self = true;
    `var mid = #{method.to_s};
    #{self}.dm(mid, #{implementation}, false);
    return #{self};`
  end
  
  def alias_method(new_name, old_name)
    # `console.log("in here " + this);`
    # `console.log(this);`
    new_name = new_name.to_s
    old_name = old_name.to_s
    # puts "alias #{new_name} from #{old_name}"
    # `console.log(#{self}.allocator.prototype);`
    # `var body = function() {
      # return #{self}['$' + #{old_name}].apply(this, arguments);
    # };`
  `#{self}.dm(#{new_name}, #{self}.allocator.prototype['$' + #{old_name}], false)`
    self
  end
  
  def attr_accessor(*attributes)
    # puts "in attr_accessor"
    `#{self}.$attr_reader.apply(#{self}, [#{self}, #{nil}].concat(#{attributes}))`
     `#{self}.$attr_writer.apply(#{self}, [#{self}, #{nil}].concat(#{attributes}))`
    self
  end
  
  def to_s
    `return #{self}.class_name;`
  end
  
  
  
  def attr_reader(*attributes)
    # `console.log("outer self is: " + self);
    # console.log(self);
    # console.log(arguments);
    # `
    attributes.each do |attribute|
      mid = attribute.to_s
      `#{self}.dm(mid, function() {
        return #{self}.ig('@' + mid);
      }, false)`
    end
    
    self
  end
  
  def attr_writer(*attributes)
    attributes.each do |attribute|
      mid = attribute.to_s
      mid2 = `#{mid} + "="`
      `#{self}.dm(#{mid2}, function(val) {
        return #{self}.is('@' + #{mid}, val);
      }, false)`
    end
    
    self
  end
  
  def const_set(id, value)
    `return #{self}.cs(#{id}, #{value});`
  end
  
  def module_eval(&block)
    # puts "about to module eval"
    # `console.log(#{self});`
    if block_given?
      # puts "block was given.."
      # `console.log(#{self});`
      # `#{block}.__fun__.opal_self = true;`
      # `#{block}.apply(#{self})`
      `#{block}(#{self}, #{nil})`
      # `#{}`
    end
  end
  
  # alias_method :class_eval, :module_eval
end
