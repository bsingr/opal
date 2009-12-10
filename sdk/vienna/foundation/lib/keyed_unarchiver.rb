# 
# keyed_unarchiver.rb
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
  
  class KeyedUnarchiver
    
    def self.unarchive_object_with_data(data)
      self.new(data)
      # load from root...
    end
    
    def self.unarchive_object_with_file(path)
      
    end
    
    def initialize(data)
      @plist = PropertyListSerialization.property_list_from_data(data, format:nil, error_description:nil)
      @context_stack = [@plist]
      @uid_table = {}
    end
    
    def delegate=(a_delegate)
      @delegate = a_delegate
    end
    
    def delegate
      @delegate
    end
    
    def push_context(context)
      @context_stack << context
    end
    
    def pop_context
      @context_stack.pop
    end
    
    def current_context
      @context_stack.last
    end
    
    def finish_decoding
      
    end
    
    def set_class(klass, for_class_name:coded_name)
      
    end
    
    def class_for_class_name(coded_name)
      
    end
    
    def has_key?(key)
      true
    end
    
    # decode whatever object is at the top of the current context
    def decode_current_object
      ctx = current_context
      id = ctx['_id']
      class_str = ctx['_class']
      obj_class = Object.full_const_get(class_str)
      # keys = ctx['keys']
      # our resulting object
      obj = obj_class.alloc
      
      # decode all keys for object
      # push_context keys
      obj.init_with_coder(self)
      # pop_context
      
      obj = obj.awake_after_using_coder(self)
      # id table
      @uid_table[id] = obj
      
      obj
    end
    
    def decode_object(key)
      # puts "in here for key: #{key.to_s}"
      ctx = current_context
      key = key.to_s # incase user sent symbol
      result = nil
      if ctx.has_key?(key)
        prop = ctx[key]
        
        if prop.is_a?(String)
          return prop
          
        elsif prop.is_a?(Array)
          # puts "#{key.to_s} is an array"
          result = []
          prop.each do |array_item|
            # puts "decoding array item..."
            push_context array_item
            result << decode_current_object
            pop_context
          end
          # puts result
          return result
          
        elsif prop.is_a?(Number)
          # number... we look up object in obj uid table (its a reference)
          return @uid_table[prop]
        else
          push_context prop
          result = decode_current_object
          pop_context
          return result
        end
      else
        # puts "do not have key #{key}"
        return nil
      end
      puts "keyed_unarchiver: got here.......? #{key.to_s}"
    end
    
    def decode_bool(key)
      current_context[key.to_s]
    end
    
    def decode_int(key)
      current_context[key.to_s].to_i
    end
    
    def decode_float(key)
      current_context[key.to_s].to_f
    end
    
    def decode_double(key)
      current_context[key.to_s].to_f
    end
    
    def decode_rect(key)
      context = current_context
      Rect.from_string(context[key.to_s])
    end
    
    def decode_point(key)
      context = current_context
      Point.from_string(context[key.to_s])
    end
    
    def decode_size(key)
      context = current_context
      Size.from_string(context[key.to_s])
    end
  end
end