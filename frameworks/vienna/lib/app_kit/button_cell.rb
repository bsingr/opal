# 
# button_cell.rb
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
  
  class ButtonCell < Cell
    
    def title
      @title
    end
    
    def title= str
      @title = str
    end
    
    def alternate_title
      @alternate_title
    end
    
    def alternate_title= str
      @alternate_title = str
    end
    
    def alternate_image
      @alternate_image
    end
    
    def alternate_image= img
      @alternate_image = img
    end
    
    def image_position
      @image_position
    end
    
    def image_position= pos
      @image_position = pos
    end
    
    def image_scaling
      @image_scaling
    end
    
    def image_scaling= scaling
      @image_scaling = scaling
    end
    
    
    
    
    def highlights_by
      @highlights_by
    end
    
    def highlights_by= type
      @highlights_by = type
    end
    
    def shows_state_by
      @shows_state_by
    end
    
    def shows_state_by= type
      @shows_state_by = type
    end
    
    def button_type= type
      # rework button here//
    end
    
    def opaque?
      
    end
    
    def font= font_obj
      
    end
    
    def transparent?
      @transparent
    end
    
    def transparent= flag
      @transparent = flag
    end
    
    def key_equivalent
      @key_equivalent
    end
    
    def key_equivalent= keys
      @key_equivalent = keys
    end
    
    def key_equivalent_modifier_mask
      @key_equivalent_modifier_mask
    end
    
    def key_equivalent_modifier_mask= mask
      @key_equivalent_modifier_mask = mask
    end
    
    def perform_click sender
      # major overhaul... must click itself to show user feedback
    end
    
    
    
    def draw_image image, with_frame:frame, in_view:control_view
      
    end
    
    def draw_title title, with_frame:frame, in_view:control_view
      
    end
    
    def draw_bezel_with_frame frame, in_view:control_view
      
    end
    
    
    
    def mouse_entered event
      
    end
    
    def mouse_exited event
      
    end
    
    def background_color
      @background_color
    end
    
    def background_color= color
      @background_color = color
    end
    
    
    
    
    def attributed_title
      @attributed_title
    end
    
    def attributed_title= obj
      @attributed_title = obj
    end
    
    def attributed_alternate_title
      @attributed_alternate_title
    end
    
    def attributed_alternate_title= obj
      @attributed_alternate_title = obj
    end
    
    
    
    def bezel_style= style
      @bezel_style = style
    end
    
    def bezel_style
      @bezel_style
    end
    
    
  end
end
