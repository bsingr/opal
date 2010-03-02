# 
# vib.rb
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

require 'window_template'

module Vienna
  
  class Vib
    
    def initialize(name, bundle, load_delegate)
      @bundle = bundle
      @load_delegate = load_delegate
      @contents = bundle.resource_contents_for_file(name, of_type:"vib")
      # puts "contents are"
      # puts contents
      # @js_object = js_object
      # @context_stack = [js_object]
      # @object_table = {}
    end
    
    def instantiate_vib_with_external_name_table(name_table)
      @unarchiver = KeyedUnarchiver.new(@contents)
      
      root_objects = @unarchiver.decode_object(:root_objects)
      connections = @unarchiver.decode_object(:connections)
      classes = @unarchiver.decode_object(:classes)
      puts @unarchiver.current_context
    end
    
    def load!
      top_level = decode_object :root_objects
      @version = decode_object :version
      puts "version is #{@version}"
      
      puts "top level is:"
      puts top_level
    end
    
    def current_context
      @context_stack.last
    end
    
    def push_context(context)
      @context_stack << context
    end
    
    def pop_context
      @context_stack.pop
    end
    
    def has_key?(key)
      if `#{current_context}.hasOwnProperty(#{key.to_s})`
        return true
      end
      
      false
    end
    
    def decode_object(key)
      context = current_context
      if `#{context}.hasOwnProperty(#{key.to_s})`
        prop = `#{context}[#{key.to_s}]`
        
        # normal object...
        unless `#{prop}.$klass`
          # puts
          push_context prop
          result = decode_current_object
          pop_context
          return result
        end
        
        if prop.is_a?(String)
          return prop
        elsif prop.is_a?(Array)
          result = []
          # puts prop
          prop.each do |array_item|
            push_context array_item
            result << decode_current_object
            pop_context
          end
          return result
        else
          # we have an object (raw js object)
          puch_context prop
          result = decode_current_object
          pop_context
          return result
        end
        
        return ""
        
      end
      
      nil
    end
    
    # decode the object currently top of the stack
    def decode_current_object
      context = current_context
      id = `#{context}['id']`
      
      class_str = `#{context}['class']`
      # puts "decoding #{class_str}"
      obj_class = Object.full_const_get(class_str)
      keys = `#{context}['keys']`
      
      obj = obj_class.alloc
      
      # actually decode
      push_context keys
      obj.init_with_coder(self)
      pop_context
      
      obj = obj.awake_after_using_coder(self)
      @object_table[id] = obj
      # puts "got #{class_str}"
      # puts obj_class
      # return "top_level object...or something"
      obj
    end
    
    def decode_rect(key)
      context = current_context
      Rect.from_string(`#{context}[#{key}]`)
    end
    
    def decode_size(key)
      context = current_context
      Size.from_string(`#{context}[#{key}]`)
    end
    
    def decode_point(key)
      context = current_context
      Point.from_string(`#{context}[#{key}]`)
    end
    
  end
  
  class Object
    
    def awake_after_using_coder(coder)
      self
    end
    
    def init_with_coder(coder)
      self
    end
  end
end

# require 'vib_loading'

