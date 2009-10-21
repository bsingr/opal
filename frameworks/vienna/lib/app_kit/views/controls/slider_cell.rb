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
    
    def initialize
      super
    end
    
    def class_name
      'vn-slider'
    end
    
    def render_with_frame cell_frame, in_view:control_view
      if render_context.first_time?
        render_context << "<div class='track-left'></div>"
        render_context << "<div class='track-middle'></div>"
        render_context << "<div class='track-right'></div>"
        render_context << "<div class='knob'></div>"
      end
      
      render_context.class_name = class_name
      
      # context.selector :knob do |knob|
      #   # TODO: Calculate the knob position
      #   knob_position = 37
      #   knob.css :left => knob_position
      # end
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
    
    def vertical?
      false
    end
    
    def title_color= color
      @title_color = color
    end

    def title_font= font
      @title_font = font
    end
    
    def title= str
      @title = str
    end
    
    def knob_thickness= a_float
      @knob_thickness = a_float
    end
    
    def image= img
      @image = img
    end
    
    
    def number_of_tick_marks= count
      @number_of_tick_marks = count
    end
    
    def tick_mark_position= pos
      @tick_mark_position = pos
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