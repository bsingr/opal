# 
# kernel.rb
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

module Kernel
  
  def is_a?(klass)
    `var search = #{self}.isa;
    
    while (search) {
      if (search == #{klass})
        return #{self}.t;
      
      search = search.super_class;
    }
    
    return #{self}.f;`
  end
  
  # alias_method :kind_of?, :is_a?
  
  def nil?
    false
  end
  
  def respond_to?(method)
    `var method_id = #{method.to_s}.toString();
    method_id = #{self}.mid2jsid(method_id);
    if (#{self}[method_id]) {
      return #{true};
    }`
    false
  end
  
  def instance_variable_defined?(variable_name)
    `return (#{self}[#{variable_name.to_s}.toString()]) ? #{true} : #{false};`
  end
  
  def instance_variable_get(variable_name)
    `return #{self}.ig(#{variable_name.to_s}.toString());`
  end
  
  def instance_variable_set(variable_name, value)
    `#{self}.is(#{variable_name.to_s}.toString(), #{value});`
    value
  end
  
  def __send__(method, *args)
    `var res= #{self}[#{self}.mid2jsid(#{method.to_s})].apply(#{self}, #{args});
    //console.log("res is: for " + #{method.to_s});
    //console.log(#{args});
    //console.log(res);
    return res;
    `
  end
  
  def class
    `return #{self}.isa;`
  end
  
  def require require_path
    `opal.require(#{require_path});`
    require_path
  end
  
  def proc &block
    if block_given?
      block
    else
      raise "ArgumentError: tried to create Proc object without a block"
    end
  end
  
  def puts str
    `console.log(#{str}.toString());`
  end
  
  def to_s
    `return "#<" + #{self}.class_name + ":" + #{self}.id + ">";`
  end
  
  def inspect
    to_s
  end
  
  def object_id
    `return vnN(#{self}.id);`
  end
  
  def raise(exception, string)
    # puts "need to raise"
    msg = nil
    if exception.is_a? String
      msg = exception
      exc = RuntimeError.new msg
    elsif exception.is_a? Exception
      exc = exception
    else
      `if (#{string}) { #{msg = string} }`
      exc = exception.new msg
    end
    # puts "really about to raise"
    `#{exc}.raise();`
  end
  
  def instance_eval(&block)
    if block_given?
      `#{block}.__fun__.opal_self = true;`
      `#{block}.__fun__.apply(#{self});`
    end
  end
  
end
