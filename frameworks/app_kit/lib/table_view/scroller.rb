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
  
  SCROLLER_PARTS = {
    :none             => 0,
    :increment_line   => 1,
    :decrement_line   => 2,
    :increment_page   => 3,
    :decrement_page   => 4,
    :knob             => 5,
    :knob_slot        => 6
  }
  
  SCROLLER_ARROWS = {
    :increment_arrow  => 0,
    :decrement_arrow  => 1
  }
  
  SCROLL_ARROW_POSITIONS = {
    :none             => 1,
    :min_end          => 2,
    :max_end          => 3
  }
  
  USABLE_SCROLLER_PARTS = {
    :none             => 0,
    :all              => 1,
    :only_arrows      => 2
  }
  
  class Scroller < Control
    
    # V_KNOB_IMAGE = ThreePartImage.new([Image.image_named('scroller_vertical_knob_top'),
    #                                    Image.image_named('scroller_vertical_knob_middle'),
    #                                    Image.image_named('scroller_vertical_knob_bottom')], true)
    # 
    # H_KNOB_IMAGE = ThreePartImage.new([Image.image_named('scroller_horizontal_knob_left'),
    #                                    Image.image_named('scroller_horizontal_knob_middle',
    #                                    Image.image_named('scroller_horizontal_knob_right'))])
    
    def self.scroller_width
      17
    end
    
    def self.scroller_width_for_control_size(control_size)
      17
    end
    
    def initialize(frame)
      super frame
      @value = 0.0
      @knob_proportion = 1
    end
    
    def class_name
      @frame.width < @frame.height ? 'vn-vertical-scroller' : 'vn-horizontal-scroller'
    end
    
    def render(context)
      if context.first_time?
        context << "<div class='dec-line'></div>"
        context << "<div class='inc-line'></div>"
        context << "<div class='knob'><div class='start'</div><div class='middle'></div><div class='end'></div></div>"
        context.first_time = false
      end
      context.class_name = class_name
      
      context.selector :knob do |knob|
        knob.frame = rect_for_part(:knob)
      end
      
    end
    
    def draw_parts
      
    end
    
    # for vertical, height of decrement/inc line
    # for horizontal, it will be the offset width
    DECREMENT_LINE_SIZE = 22
    
    def rect_for_part(part)
      result = Rect.new(0, 0, 0, 0)
      increment_line = Rect.new(0, 0, @bounds.width, @bounds.height)
      decrement_line = Rect.new(0, 0, @bounds.width, @bounds.height)
      knob = Rect.new(0, 0, @bounds.width, @bounds.height)
      knob_slot = Rect.new(0, 0, @bounds.width, @bounds.height)
      
      if vertical?
        decrement_line.height = DECREMENT_LINE_SIZE
        increment_line.height = DECREMENT_LINE_SIZE
        increment_line.y = @bounds.height - DECREMENT_LINE_SIZE
        
        knob_slot.height = @bounds.height - (2 * DECREMENT_LINE_SIZE)
        knob_slot.y = DECREMENT_LINE_SIZE
        
        
        
        knob.height = knob_slot.height * @knob_proportion
        knob.y = ((knob_slot.height - knob.height) * @value) + knob_slot.y
      else # horizontal...
        decrement_line.width = DECREMENT_LINE_SIZE
        increment_line.width = DECREMENT_LINE_SIZE
        increment_line.y = @bounds.width - DECREMENT_LINE_SIZE
        
        knob_slot.width = @bounds.width - (2 * DECREMENT_LINE_SIZE)
        knob_slot.x = DECREMENT_LINE_SIZE
        
        knob.width = knob_slot.width * @knob_proportion
        knob.x = ((knob_slot.width - knob.width) * @value) + knob_slot.x
      end
      
      
      
      return case part
      when :none
        result
      when :increment_line
        if vertical?
          
        else
        
        end
      when :decrement_line
      
      when :increment_page
      
      when :decrement_page
      
      when :knob
        knob
      when :knob_slot
        knob_slot
      end      
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
    
    def mouse_down(the_event)
      return unless enabled?
      
      location = convert_point(the_event.location_in_window, from_view:nil)
      
      # case test_part(location)
      # when condition
      #   
      # end
      
      # puts "#{location.x}, #{location.y}"
      track_knob(the_event)
    end
    
    def track_knob(the_event)
      original_value = @value
      mouse_down_point = convert_point(the_event.location_in_window, from_view:nil)
      slot_rect = rect_for_part(:knob_slot)
      knob_rect = rect_for_part(:knob)
      
      size = vertical? ? slot_rect.height - knob_rect.height : slot_rect.width - knob_rect.width
      
      App.bind_events [:left_mouse_up, :left_mouse_dragged] do |the_event|
        
        if the_event.type == :left_mouse_up
          App.unbind_events
        else # left_mouse_dragged
          location = convert_point(the_event.location_in_window, from_view:nil)
          delta = vertical? ? location.y - mouse_down_point.y : location.x - mouse_down_point.x

          self.float_value = Math.min(Math.max(0, original_value + (delta / size)), 1)
          self.needs_display = true   
          send_action(@action, to:@target)     
        end
      end
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
      self.needs_display = true
    end
    
    def float_value=(a_float)
      @value = a_float
    end
    
    def float_value
      @value
    end
    
    def double_value
      @value
    end
    
    def double_value=(a_double)
      @value = a_double
    end
    
    def action=(an_action)
      @action = an_action
    end
    
    def target=(a_target)
      @target = a_target
    end
    
    def vertical?
      @frame.width < @frame.height ? true : false
    end
    
  end
end
