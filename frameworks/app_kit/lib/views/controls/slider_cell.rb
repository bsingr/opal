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
    
    TRACK_PADDING = 2.0
    
    KNOB_PADDING_REGULAR = 9.5
    KNOB_PADDING_SMALL = 8
    KNOB_PADDING_MINI = 6.5
        
    def self.prefers_tracking_until_mouse_up
      true
    end
    
    def initialize
      super
      @min_value = 0
      @max_value = 100
      @value = 0
      @continuous = true
    end
    
    def init_with_coder(coder)
      super
      
      @min_value = coder.decode_double :min_value
      @max_value = coder.decode_double :max_value
      _minValue=[keyed decodeDoubleForKey:@"NSMinValue"];
      _maxValue=[keyed decodeDoubleForKey:@"NSMaxValue"];
      _numberOfTickMarks=[keyed decodeIntForKey:@"NSNumberOfTickMarks"];
      _tickMarkPosition=[keyed decodeIntForKey:@"NSTickMarkPosition"];
      _allowsTickMarkValuesOnly=[keyed decodeBoolForKey:@"NSAllowsTickMarkValuesOnly"];
    end
    
    def class_name
      'vn-slider'
    end
    
    def render_with_frame(cell_frame, in_view:control_view)
      ctx = RenderContext.current_context
      # these two are useful for later
      @cell_frame = cell_frame
      @control_view = control_view
      
      if ctx.first_time?
        ctx.append :div do |track|
          track.class_name = "track"
        end
        
        ctx.append :div do |knob|
          knob.class_name = "knob"
        end
      end
      
      ctx.selector :knob do |knob|        
        knob_position = _knob_rect_for_value(@value)
        knob.css :left => "#{knob_position}px"
      end
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
    
    def _knob_rect_for_value(a_value)
      x = (@cell_frame.width - (2 * KNOB_PADDING_REGULAR)) * ((@value / (@max_value - @min_value)) + @min_value)
      # x + (@cell_frame.x + KNOB_PADDING_REGULAR)
      x
    end
    
    def _value_for_mouse_point(a_point)
      value = (a_point.x - (@cell_frame.x + KNOB_PADDING_REGULAR)) / (@cell_frame.width - (2 * KNOB_PADDING_REGULAR))
      # value = Math.min(Math.max(value, @min_value), @max_value)
      value = value * ((@max_value - @min_value) + @min_value)
      Math.min(Math.max(value, @min_value), @max_value)
    end
    
    def start_tracking_at(start_point, in_view:control_view)
      self.double_value = _value_for_mouse_point(start_point)
      highlight(true, with_frame:@cell_frame, in_view:control_view)
      true
    end
    
    def continue_tracking last_point, at:current_point, in_view:control_view
      self.double_value = _value_for_mouse_point(current_point)
      render_with_frame(@cell_frame, in_view:control_view)
      true
    end
    
    def stop_tracking last_point, at:stop_point, in_view:control_view, mouse_is_up:flag
      highlight false, with_frame:@cell_frame, in_view:control_view
    end
  end
  
end