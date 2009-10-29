# 
# scroller.rb
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
  
  class Scroller < Control
    
    def self.scroller_width
      15
    end
    
    def self.scroller_width_for_control_size(control_size)
      15
    end
    
    def class_name
      @frame.width < @frame.height ? 'vn-vertical-scroller' : 'vn-horizontal-scroller'
    end
    
    def render(context)
      context.css :background_color => 'rgb(220,220,220)'
    end
    
    def draw_parts
      
    end
    
    def rect_for_part(part)
      
    end
    
    def check_space_for_parts
      
    end
    
    def usable_parts
      
    end
    
    def arrows_position=(position)
      @arrows_position = position
    end
    
    def arrows_position
      @arrows_position
    end
    
    def control_tint=(control_tint)
      @control_tint = control_tint
    end
    
    def control_tint
      @control_tint
    end
    
    def control_size=(control_size)
      @control_size = control_size
    end
    
    def control_size
      @control_size
    end
    
    def draw_arrow(which_arrow, highlight:flag)
      
    end
    
    def draw_knob
      
    end
    
    def draw_knob_slot_in_rect(slot_rect, highlight:flag)
      
    end
    
    def highlight(flag)
      
    end
    
    def test_part(the_point)
      
    end
    
    def track_knob(the_event)
      
    end
    
    def track_scroll_buttons(the_event)
      
    end
    
    def hit_part
      
    end
    
    def knob_proportion
      @knob_proportion
    end
    
    def knob_proportion=(proportion)
      @knob_proportion = proportion
    end
    
  end
end
