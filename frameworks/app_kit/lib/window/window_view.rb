# 
# window_view.rb
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

# Require each type of window view here...

module Vienna
  
  # Base window view
  class WindowView < View
    
    def initialize(frame, style_mask)
      super frame
      @style_mask = style_mask
    end
    
    def self.frame_rect_for_content_rect rect, style_mask:style
      Rect.new(rect.x, rect.y, rect.width, rect.height)
    end
    
    def self.content_rect_for_frame_rect rect, style_mask:style
      Rect.new(rect.x, rect.y, rect.width, rect.height)
    end
    
    def self.min_frame_width_with_title title, style_mask:style
      
    end
    
    def frame_rect_for_content_rect rect
      Rect.new(rect.x, rect.y, rect.width, rect.height)
    end
    
    def content_rect_for_frame_rect rect
      Rect.new(rect.x, rect.y, rect.width, rect.height)
    end
    
    def class_name
      'vn-window-view'
    end
    
    # Shortcut method for adding base view to a window
    def window= (win)
      @window = win
    end
    
    def mouse_down(the_event)

      mouse_down_point = the_event.location_in_window

      App.bind_events [:left_mouse_up, :left_mouse_dragged] do |the_event|
        if the_event.type == :left_mouse_up
          App.unbind_events
        else
          window_point = the_event.location_in_window
          @window_origin = @window.frame.origin
          @delta_x = window_point.x - mouse_down_point.x
          @delta_y = window_point.y - mouse_down_point.y
          @window.frame_origin = Point.new(@window_origin.x + @delta_x, @window_origin.y + @delta_y)
        end
      end
    end
    
    
    def render context
      if context.first_time?
        context.first_time = false
      end
      
      context.class_name = ['vn-window-view'].join(' ')
    end
    
  end
  
end