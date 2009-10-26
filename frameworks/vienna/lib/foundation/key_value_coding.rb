# 
# key_value_coding.rb
# vienna
# 
# Created by Adam Beynon.
# Copyright 2009 Adam Beynon.
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

module Vienna
  
  UNDEFINED_KEY_EXCEPTION = 'VNUndefinedKeyException'
    
  # Key value operator constants
  # ============================
  # :average
  # :count
  # :distinct_union_arrays
  # :distinct_union_objects
  # :distinct_union_sets
  # :max
  # :min
  # :sum
  # :union_arrays
  # :union_objects
  # :union_sets
  
  
  class Object
    
    def self.access_instance_variables_directly?
      true
    end
    
    def value_for_key key
      accessor = key
      if respond_to? accessor
        return perform_selector accessor
      end
      
      accessor = "#{key}?"
      if respond_to? accessor
        return perform_selector accessor
      end
      
      if self.class.access_instance_variables_directly?
        `if (typeof self.$iv_tbl['@' + key] != 'undefined') {`
          return `self.$iv_tbl['@' + key]`
        `}`
      end
      
      value_for_undefined_key key
    end
    
    def set_value value, for_key:key

      accessor = "#{key}="
      if respond_to? accessor
        # we dont need these KVO..automatically done
        # perform accessor, value
        return value
      end
      
      if self.class.access_instance_variables_directly?
        `if (typeof self.$iv_tbl['@' + key] != 'undefined') {`
          will_change_value_for_key key          
          `self.$iv_tbl['@' + key] = value;`
          did_change_value_for_key key
          return value
        `}`
      end
      set_value value, for_undefined_key:key
    end
    
    def validate_value value, for_key:key, error:out_error
      
    end
    
    def array_value_for_key key
      
    end
    
    def set_value_for_key key
      
    end
    
    def value_for_key_path path
      value_for_key path
    end
    
    def set_value value, for_key_path:path
      set_value value, for_key:path
    end
    
    def validate_value value, for_key_path:path, error:out_error
      
    end
    
    def array_value_for_key_path path
      
    end
    
    def set_value_for_key_path path
      
    end
    
    def value_for_undefined_key key
      
    end
    
    def set_value value, for_undefined_key:key
      
    end
    
    def set_nil_value_for_key key
      
    end
    
    def dictionary_with_values_for_keys keys
      
    end
    
    def set_values_for_keys_with_dictionary keyed_values
      
    end
  end



  class Array
    
    def value_for_key key
      
    end
    
    def set_value value, for_key:key
      
    end
    
  end



  class Dictionary
    
    def value_for_key key
      
    end
    
    def set_value value, for_key:key
      
    end
  
  end



  class Set
  
    def value_for_key key
      
    end
    
    def set_value value, for_key:key
      
    end
  end
end
