# 
# hud_window_view.rb
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
  
  # :hud window mask
  # if 'textured' is passed in, then use the gradient header, otherwise use the solid
  # color
  class HUDWindowView < WindowView

    CLOSE_IMAGE = Image.sprite :controls, [0, 1280, 13, 13]
    CLOSE_HIGHLIGHTED_IMAGE = Image.sprite :controls, [14,1280, 13, 13]
    
    TITLEBAR_HEIGHT = 19.0
    
    def initialize frame, style_mask
      super frame, style_mask
      
      if @style_mask.include? :closable
        @close_button = Button.build :frame => Rect.new(5, 3, 13, 13), :bordered => false do |close|
          close.bordered = false
          close.image_position = :image_only
          close.image = CLOSE_IMAGE
          close.alternate_image = CLOSE_HIGHLIGHTED_IMAGE
          self << close
          close.needs_display = true
        end
      end
    end
        
    def render(context)
      context.build do
        context.css :background_color => 'rgb(35,35,35)'
      end
    end
  end
  
end