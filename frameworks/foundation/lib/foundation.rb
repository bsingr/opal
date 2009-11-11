# 
# foundation.rb
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
  
  # Object = ::Object
  # Array = ::Array
  # Dictionary = ::Hash
  Object = ::Object
  Array = ::Array
  Dictionary = ::Hash
  
  class Object
    
    def initialize
      # @kvo_observers = []
      #      @kvo_old_values = {}
    end
    
    def perform_selector selector, with_object:obj1, with_object:obj2
      `return VN$(self, selector, obj1, obj2);`
    end
    
    def perform_selector selector, with_object:obj
      `return VN$(self, selector, obj);`
    end
    
    def perform_selector selector
      `return VN$(self, selector);`
    end
    
  end
  
end

require 'key_value_coding'
require 'key_value_observing'
require 'notification'
require 'attributed_string'
