# 
# normal_window_view
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
  
  # 'Normal' window view for standard windows
  class NormalWindowView < WindowView
        
    CLOSE_IMAGE = Image.sprite :controls, [0, 855, 16, 16]
    CLOSE_HIGHLIGHTED_IMAGE = Image.sprite :controls, [16, 855, 16, 16]
    
    MIN_IMAGE = Image.sprite :controls, [0, 872, 16, 16]
    MIN_HIGHLIGHTED_IMAGE = Image.sprite :controls, [16, 872, 16, 16]
    
    ZOOM_IMAGE = Image.sprite :controls, [0, 889, 16, 16]
    ZOOM_HIGHLIGHTED_IMAGE = Image.sprite :controls, [16, 889, 16, 16]
    
    # CLOSE_IMAGE = Image.image_named 'normal_window_close_button'
    # CLOSE_HIGHLIGHTED_IMAGE = Image.image_named 'normal_window_highlighted_close_button'
    
    
    TITLEBAR_HEIGHT = 24.0
    
    # CLOSE_IMAGE = Image.image_named :vn_normal_win_close
    # CLOSE_HIGHLIGHTED_IMAGE = Image.image_named :vn_normal_win_close_highlight
    
    def initialize frame, style_mask
      super frame, style_mask
      
      if @style_mask.include? :closable
        @close_button = Button.build :frame => Rect.new(6, 6, 16, 16), :bordered => false do |close|
          close.bordered = false
          close.image_position = :image_only
          close.image = CLOSE_IMAGE
          close.alternate_image = CLOSE_HIGHLIGHTED_IMAGE
          self << close
          close.needs_display = true
        end
      end
      
      if @style_mask.include? :miniaturizable
        @min_button = Button.build :frame => Rect.new(10, 10, 300, 300), :bordered => false do |min|
          # min.image = 
          # min.alternate_image = 
          self << min
        end
      end
    end
    
    def class_name
      'vn-normal-window-view'
    end
    
    def render context
      if context.first_time?
        context << "<div class='titlebar'><div class='left'></div><div class='middle'></div><div class='right'></div><div class='splitter'></div></div>"
        context << "<div class='body'></div>"
        context.first_time = false
      end
      context.class_name = class_name
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
  end  
end
