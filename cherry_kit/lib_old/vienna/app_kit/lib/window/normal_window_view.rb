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
        
    # hide this in block scope?
    bundle = Bundle.bundle_for_class(self)
    # draw gradient at top
    TITLEBAR_IMAGE = ThreePartImage.new(
      Image.new(bundle.path_for_resource('window/normal/titlebar_left.png'), Size.new(6, 55)),
      Image.new(bundle.path_for_resource('window/normal/titlebar_middle.png'), Size.new(1, 55)),
      Image.new(bundle.path_for_resource('window/normal/titlebar_right.png'), Size.new(6, 55)))
    
    # standard close... not for document edited states
    CLOSE_IMAGE = Image.new(bundle.path_for_resource('window/normal/close_button.png'))
    CLOSE_HIGHLIGHTED_IMAGE = Image.new(bundle.path_for_resource('window/normal/close_button_highlighted.png'))
    # minimize
    MIN_IMAGE = Image.new(bundle.path_for_resource('window/normal/normal_window_titlebar_left.png'))
    MIN_HIGHLIGHTED_IMAGE = Image.new(bundle.path_for_resource('window/normal/normal_window_titlebar_left.png'))
    # maximize/zoom
    ZOOM_IMAGE = Image.new(bundle.path_for_resource('window/normal/normal_window_titlebar_left.png'))
    ZOOM_HIGHLIGHTED_IMAGE = Image.new(bundle.path_for_resource('window/normal/normal_window_titlebar_left.png'))
    # spliiter/resize
    SPLITTER_IMAGE = Image.new(bundle.path_for_resource('window/normal/splitter.png'), Size.new(1, 1))
    RESIZE_IMAGE = Image.new(bundle.path_for_resource('window/normal/resize_indicator.png'), Size.new(12, 12))
    # standard titlebar height
    TITLEBAR_HEIGHT = 24.0
    
    
    def initialize(frame, style_mask)
      super frame, style_mask
      
      # if @style_mask.include? :closable
      #   @close_button = Button.build :frame => Rect.new(6, 6, 16, 16), :bordered => false do |close|
      #     close.bordered = false
      #     close.image_position = :image_only
      #     close.image = CLOSE_IMAGE
      #     close.alternate_image = CLOSE_HIGHLIGHTED_IMAGE
      #     self << close
      #     close.needs_display = true
      #   end
      # end
      # 
      # if @style_mask.include? :miniaturizable
      #   @min_button = Button.build :frame => Rect.new(10, 10, 300, 300), :bordered => false do |min|
      #     # min.image = 
      #     # min.alternate_image = 
      #     self << min
      #   end
      # end
    end
        
    def render(context)
      context.build do
        # Titlebar
        context.append :div do |titlebar|
          titlebar.frame = Rect.new(0,0,@bounds.width,TITLEBAR_HEIGHT)
          TITLEBAR_IMAGE.render_with_frame(Rect.new(0,0,@bounds.width,TITLEBAR_HEIGHT))
        end
        # Splitter (line between titlebar and body)
        context.append :div do |splitter|
          splitter.frame = Rect.new(0, TITLEBAR_HEIGHT - 1,@bounds.width, 1)
          SPLITTER_IMAGE.render_with_frame(Rect.new(0, 0, @bounds.width, 1))
        end
        # Basic window background
        context.append :div do |body|
          body.frame = Rect.new(0, TITLEBAR_HEIGHT, @bounds.width, @bounds.height - TITLEBAR_HEIGHT)
          body.css :background_color => 'rgb(245,245,245)'
        end
        # Resize indicator
        RESIZE_IMAGE.render_with_frame(resize_indicator_frame)
      end
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
