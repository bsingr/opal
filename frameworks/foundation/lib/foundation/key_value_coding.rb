# 
#  key_value_coding.rb
#  vienna
#  
#  Created by Adam Beynon on 2010-07-21.
#  Copyright 2010 Adam Beynon. All rights reserved.
# 

module CherryKit
  
  # KeyValueCoding module for Object instances
  module KeyValueCoding
    
    # Does the receiver allow its instance variables to be accessible by
    # key value coding
    # 
    # @returns true|false
    # 
    def self.access_instance_varaibles_directly?
      true
    end
    
    def value_for_key(key)
      
    end
    
    def value_for_key_path(key_path)
      
    end
    
    def value_for_undefined_key(key)
      
    end
    
    def set_value_for_key_path(value, key_path)
      
    end
    
    def set_value_for_key(value, key)
      
    end
    
    def set_value_for_undefined_key(value, key)
      
    end
  end
  
  # KeyValueCoding for Hash instances
  module HashKeyValueCoding
    
    def value_for_key(key)
      
    end
    
    def set_value_for_key(value, key)
      self[key] = value
    end
  end
end

Object.include CherryKit::KeyValueCoding
Hash.include CherryKit::HashKeyValueCoding

def nil.value_for_key(key)
  self
end
