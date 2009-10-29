# 
# clip_view.rb
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
  
  class ClipView < View
    
    def initialize(frame)
      super frame
    end
    
    def setup_display_context
      super
      # make sure our clip view actually acts like a clip view
      @element.css :overflow => 'hidden'
    end
    
    def class_name
      'vn-clip-view'
    end
    
    def background_color=(color)
      @background_color = color
    end
    
    def background_color
      @background_color
    end
    
    def draws_background=(flag)
      @draws_background = flag
    end
    
    def draws_background?
      @draws_background
    end
    
    # Set the document view
    def document_view=(a_view)
      
      default_center = NotificationCenter.default_center
      
      if @document_view
        default_center.remove_observer(self, name:VIEW_FRAME_DID_CHANGE_NOTIFICATION, object:@document_view)
        default_center.remove_observer(self, name:VIEW_BOUNDS_DID_CHANGE_NOTIFICATION, object:@document_view)
        
        @document_view.remove_from_superview
      end
      
      @document_view = a_view
      add_subview(a_view)
      
      # default_center.add_observer(self, selector:'view_frame_changed', 
      #                                   name:VIEW_FRAME_DID_CHANGE_NOTIFICATION,
      #                                   object:@document_view)
      # 
      # default_center.add_observer(self, selector:'view_bounds_changed', 
      #                                   name:VIEW_BOUNDS_DID_CHANGE_NOTIFICATION,
      #                                   object:@document_view)
    end
    
    def document_view
      @document_view
    end
    
    def document_rect
      Rect.new(0, 0, 0, 0)
    end
    
    def document_cursor=(an_obj)
      @document_cursor = an_obj
      # set css cursor?!
    end
    
    def document_cursor
      @document_cursor
    end
    
    def document_visible_rect
      convert_rect(@bounds, to_view:@document_view)
    end
    
    def view_frame_changed(notification)
      
    end
    
    def view_bounds_changed(notification)
      
    end
    
    def copies_on_scroll=(flag)
      @copies_on_scroll = flag
    end
    
    def copies_on_scroll
      @copies_on_scroll
    end
    
    def auto_scroll?(the_event)
      false
    end
    
    def constrain_scroll_point(new_origin)
      new_origin
    end
    
    def scroll_to_point(new_origin)
      if @subviews.length > 0
        @subviews[0].frame_origin = Point.new(0 - new_origin.x, 0 - new_origin.y)
      end
    end
    
    def scroll_x_y(x, y)
      scroll_to_point(Point.new(x, y))
    end
  end
  
  
  class View < Responder
    
    def reflect_scrolled_clip_view(a_clip_view)
      
    end
    
    def scroll_clip_view(a_clip_view, to_point:a_point)
      
    end    
  end
end
