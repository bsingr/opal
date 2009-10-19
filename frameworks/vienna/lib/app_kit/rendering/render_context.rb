# 
# render_context.rb
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
  
  # Render context is a special type of element with additions relevant to 
  # rendering views within Vienna
  class RenderContext < Element
    
    def initialize tag_name, options
      @element_stack = [`document.createElement(#{tag_name})`]
      @first_time = true
      @type = tag_name
    end
    
    def first_time?
      @first_time
    end
    
    def first_time= first_time
      @first_time = first_time
    end
    
    def element
      @element_stack.last
    end
    
    def push_element_stack element
      @element_stack << element
    end
    
    def pop_element_stack
      @element_stack.pop
    end
    
    def selector a_selector, &block
      element = find_selector a_selector
      push_element_stack element

      yield self
      pop_element_stack
    end
    
    def find_selector a_selector
      `return #{element}.getElementsByClassName(#{a_selector})[0];`
    end
    
  end
  
end