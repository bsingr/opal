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
    
    # CLOSE_IMAGE = Image.image_named :vn_normal_win_close
    # CLOSE_HIGHLIGHTED_IMAGE = Image.image_named :vn_normal_win_close_highlight
    
    def initialize frame, style_mask
      super frame, style_mask
      
      if @style_mask.include? :closable
        @close_button = Button.build :frame => Rect.new(206, 6, 16, 16), :bordered => false do |close|
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
    
  end  
end
