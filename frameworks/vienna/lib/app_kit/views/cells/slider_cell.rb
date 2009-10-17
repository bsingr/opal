# 
# slider_cell.rb
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
  
  class SliderCell < Cell
    
    def self.prefers_tracking_until_mouse_up
      true
    end
    
    def min_value
      @min_value
    end
    
    def min_value= a_double
      @min_value = a_double
    end
    
    def max_value
      @max_value
    end
    
    def max_value= a_double
      @max_value = a_double
    end
    
    def alt_increment_value= inc_value
      @alt_increment_value = inc_value
    end
    
    def alt_increment_value
      @alt_increment_value
    end
    
    def title_cell= cell
      @title_cell = cell
    end
    
    def title_cell
      @title_cell
    end
    
    def title_color= color
      @title_color = color
    end
    
    def title_color
      @title_color
    end
    
    def title_font= font
      @title_font = font
    end
    
    def title_font
      @title_font
    end
    
    def title
      @title
    end
    
    def title= str
      @title = str
    end
    
    def knob_thickness= a_float
      @knob_thickness = a_float
    end
    
    def knob_thickness
      @knob_thickness
    end
    
    def vertical?
      @vertical
    end
    
    
    
    def draw_knob knob_rect
      
    end
    
    def draw_bar_inside rect
      
    end
    
    def track_rect
      
    end
    
    
    
    def slider_type= type
      @slider_type = type
    end
    
    def slider_type
      @slider_type
    end
    
    
    # 
    # Tick mark support
    # 
    def number_of_tick_marks= count
      @number_of_tick_marks = count
    end
    
    def number_of_tick_marks
      @number_of_tick_marks
    end
    
    def tick_mark_position= pos
      @tick_mark_position = pos
    end
    
    def tick_mark_position
      @tick_mark_position
    end
    
    def allows_tick_mark_values_only= flag
      @allows_tick_mark_values_only = flag
    end
    
    def allows_tick_mark_values_only?
      @allows_tick_mark_values_only
    end
    
    def tick_mark_value_at_index index
      
    end
    
    def rect_of_tick_mark_at_index index
      
    end
    
    def index_of_tick_mark_at_point point
      
    end
    
    def closest_tick_mark_value_to_value value
      
    end
  end
end
