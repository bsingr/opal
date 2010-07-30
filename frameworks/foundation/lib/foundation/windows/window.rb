# 
# window.rb
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

require 'foundation/views/view'

module CherryKit
  
  # A window is used for the root window, menu or panel on screen. Unlike Cocoa
  # it inherits from the View class. Essentially windows are just views, but
  # they include extra methods for attaching themselves onto the DOM and for
  # orchestrating event delegation and routing
  # 
  class Window < View
    
    register_builder :window,
      :title  => "Window"
    
    # Initialize from builder
    def initialize_from_builder(builder_options)
      puts "initialzing in window!! builder style"
      initialize
    end
    
    
    def initialize(layout)
      puts "normal initializer for window!"
    end
    
    # show the window.
    def show
      append_to Browser::Element.body
    end
    
    # class name for window
    def class_names
      ['ck-window']
    end
    
    
    # Insert the window into the given element
    # 
    # @param {Browser::Element} element the element to append into
    # @returns {CherryKit::Window} self
    # 
    def append_to(base_element)
      # make sure our render context is already created
      render_context = create_render_context
      
      puts "finished create_render_context:"
      base_element << render_context.element
      
      puts "now need to make all subviews"
    end
  end
end
