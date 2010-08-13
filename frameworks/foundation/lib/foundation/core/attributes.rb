# 
# attributes.rb
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


  # KeyValueCoding module for Object instances
class Object
    
  def get_attribute(key)
    # if we have a method with the given key
    if respond_to? key
      __send__ key
    # check for a boolean key (key with '?' suffix)
    elsif respond_to? "#{key}?"
      __send__ "#{key}?"
    # just an instance variable of the right name
    elsif instance_variable_defined?("@#{key}")
      instance_variable_get "@#{key}"
    # worst case: just handle as undefined key
    else
      value_for_undefined_key key
    end
  end
  
  
  def set_attribute(key, value)
    # First try and use predefined setter key=
    if respond_to? "#{key}="
      __send__ "#{key}=", value
    
    # check if we have the instance variable already, and just set it. We must
    # also make KVO aware of the change
    elsif instance_variable_defined?("@#{key}")
      will_change_attribute key
      instance_variable_set "@#{key}", value
      did_change_attribute key
      
    # worst case: set as undefined key
    else
      set_value_for_undefined_key value, key
    end
    
    value
  end
  
  def get_path(key_path)
    # simply return value_for_key if not a path
    return get_attribute(key_path) unless key_path.index('.')
    
    parts = key_path.split '.'
    object = self
    
    # go through each part and update object as chained path
    parts.each do |part|
      object = object.get_attribute part
    end
    
    object
  end
  
  def set_path(key_path, value)
    # simply return set_value_for_key if not a path
    return set_attribute(key_path, value) unless key_path.index('.')
    
    parts = key_path.split('.')
    last_part = parts.pop
    object = self
    
    parts.each do |part|
      object = object.get_attribute part
    end
    
    object.set_attribute last_part, value
  end
  
  def value_for_undefined_key(key)
    raise "#{self.inspect} is not Key Value Coding compliant for key #{key}"
  end
  
  def set_value_for_undefined_key(value, key)
    raise "#{self.inspect} is not Key Value Coding compliant for key #{key}"
  end
end

module CherryKit
  
  module HashKeyValueCoding
    
    def get_attribute(key)
      self[key.to_s]
    end
    
    def set_attribute(key, value)
      self[key.to_s] = value
    end
  end
end
  
# Object.include CherryKit::KeyValueCoding
Hash.include CherryKit::HashKeyValueCoding

class NilClass
  
  def get_attribute(key)
    nil
  end
end

# Attribute coding works on each array item, rather than on the array itself.
class Array
  
  def get_attribute(key)
    self.map do |object|
      object.get_attribute key
    end
  end
  
  # Calls set on each item belonging to the array
  def set_attribute(key, value)
    self.each do |object|
      object.set_attribute key, value
    end
  end
end
