# 
#  key_value_coding.rb
#  vienna
#  
#  Created by Adam Beynon on 2010-07-21.
#  Copyright 2010 Adam Beynon. All rights reserved.
# 


  # KeyValueCoding module for Object instances
class Object
    
  def value_for_key(key)
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
  
  def set_value_for_key(value, key)
    # First try and use predefined setter key=
    if respond_to? "#{key}="
      __send__ "#{key}=", value
    
    # check if we have the instance variable already, and just set it. We must
    # also make KVO aware of the change
    elsif instance_variable_defined?("@#{key}")
      will_change_value_for_key key
      instance_variable_set "@#{key}", value
      did_change_value_for_key key
      
    # worst case: set as undefined key
    else
      set_value_for_undefined_key value, key
    end
    
    value
  end
  
  def value_for_key_path(key_path)
    # simply return value_for_key if not a path
    return value_for_key key_path unless key_path.index('.')
    
    parts = key_path.split '.'
    object = self
    
    # go through each part and update object as chained path
    parts.each do |part|
      object = object.value_for_key part
    end
    
    object
  end
  
  def set_value_for_key_path(value, key_path)
    # simply return set_value_for_key if not a path
    return set_value_for_key(value, key_path) unless key_path.index('.')
    
    parts = key_path.split('.')
    last_part = parts.pop
    object = self
    
    parts.each do |part|
      object = object.value_for_key part
    end
    
    object.set_value_for_key value, last_part
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
    
    def value_for_key(key)
      self[key.to_s]
    end
    
    def set_value_for_key(value, key)
      self[key.to_s] = value
    end
  end
end
  
# Object.include CherryKit::KeyValueCoding
Hash.include CherryKit::HashKeyValueCoding

class NilClass
  
  def value_for_key(key)
    nil
  end
end
