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
    
    def initialize(layout)
      super
      # an array of all the views which require displaying
      @views_needing_display = []
      # a window's window is always itself
      @window = self
      puts "normal initializer for window!"
    end
    
    def show
      # mark ourself as needing display
      self.needs_display = true
      
      # append_to Browser::Element.body
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
    
    # Mark the given view as needing display. This view should be in this
    # window's hierarchy. The view will be displayed at the end of the next
    # event loop. If a view is marked as needing display more than once during
    # an event loop, it will be only actually rendererd once.
    # 
    # @param {CherryKit::View} view that requires display
    # 
    def mark_view_for_display(view)
      puts "mark_view_for_display(#{view})"
      # do not re-add it if we already have it as needing display
      unless @views_needing_display.include? view
        puts "yeap, adding it"
        @views_needing_display << view
        `console.log(#{ @views_needing_display});`
      end
    end
    
    # NEVER invoke this method directly
    def display
      # make sure we have a render context
      unless render_context
        append_to Browser::Element.body
      end
      
      puts "need to go through each view"
      `console.log(#{@views_needing_display});`
      # now go through all our views that are marked for display (should be
      # all subviews if we just had to create a render context, otherwise it is
      # any view that has been updated)
      @views_needing_display.each do |view|
        puts "need to display view: #{view}"
      end
      
      @subviews.each do |view|
        view.display
      end
    end
    
    # ===============================
    # = Builder methods and support =
    # ===============================
    
    register_builder :window,
      :title  => "Window"
    
    # Initialize from builder
    def initialize_from_builder(builder_options)
      puts "initialzing in window!! builder style"
      initialize
    end
    
  end # Window
end
