# 
# key_value_binding.rb
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

module CherryKit
  
  module KeyValueBinding
    
    def bind(binding, object, key_path, options)
      # first make sure we unbind the binding if it currently exists
      unbind binding
      
      @__kvb_bindings[binding] = KVBBindingProxy.new(binding, object, key_path, options, self)
      
      
      
      
    end
    
    def unbind(the_binding)
      # incase this is our first binding for this object
      @__kvb_bindings ||= {}
      
      binding = @__kvb_bindings[the_binding]
      puts "checking binding exists already"
      return unless binding
      # raise "should not get to here yet. need to implement"
    end
    
    # Proxy object to manage the notifications between two bound objects. 
    # Instances of this class deal with all passed options etc to maintain a
    # performant binding system
    class KVBBindingProxy
      
      def initialize(binding, observed, key_path, options, source)
        @binding = binding
        @observed = observed
        @key_path = key_path
        @options = options
        @source = source
        
        puts " need to add observer to #{observed} for #{key_path}"
        observed.add_observer self, key_path, [:new], binding
        puts "did add observer"
        update_value_for binding
      end
      
      
      def observe_value(path, object, changes, context)
        puts "calling observe_value(#{path},#{object},#{changes},#{context})"
        update_value_for context
      end
      
      # Send updates values
      def update_value_for(context)
        puts "getting new value"
        new_value = @observed.value_for_key_path @key_path
        puts "got new_value as #{new_value}, need to set it on #{@source}"
        # transform values..?
        @source.set_value_for_key new_value, context
        puts "set value for new key on #{@source}"
      end
      
    end
    
  end
end

Object.include CherryKit::KeyValueBinding
