# 
# control.rb
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
  
  # Image positions
  IMAGE_POSITIONS = {
    :text_only          => 0,
    :image_only         => 1,
    :left               => 2,
    :right              => 3,
    :below              => 4,
    :above              => 5,
    :overlaps           => 6
  }

  class Control < View
      
    # display_properties :enabled, :selected, :state
    
    def initialize frame
      super frame
      @enabled = true
    end
    
    def render context
      # render nothing
    end
    
    def draw_rect rect
      puts 'drawing rect from control'
    end
    
    def image_rect_for_bounds the_rect
      the_rect
    end
    
    def title_rect_for_bounds the_rect
      the_rect
    end
        
    def size_to_fit
        
    end
    
    def calc_size
      
    end
    
    def target
      @target
    end
    
    def target=(obj)
      @target = obj
    end
    
    def action
      @action
    end
    
    def action=(selector)
      @action = selector
    end
    
    def tag
      
    end
    
    def tag=(tag)
      
    end
    
    def selected_tag
      
    end
    
    def ignores_multi_click=(flag)
      
    end
    
    def ignores_multi_click?
      
    end
    
    def send_action_on mask
      
    end
    
    def continuous?
      
    end
    
    def continuous=(flag)
      
    end
    
    def enabled?
      @enabled
    end
    
    def enabled=(flag)
      @enabled = flag
    end
    
    def alignment
      
    end
    
    # Valid alignments
    # :left, :right, :center, :justified, :natural
    # 
    def alignment=(mode)
      
    end
    
    def font
      
    end
    
    def font=(font)
      
    end
    
    def formatter=(new_formatter)
      
    end
    
    def formatter
      
    end
    
    def object_value=(obj)
      
    end
    
    def string_value=(obj)
      
    end
    
    # Alias for string value
    def text=(text)
      string_value = text
    end
    
    
    def int_value=(val)
      
    end
    
    def float_value=(val)
      
    end
    
    def double_value=(val)
      
    end
    
    def object_value
      
    end
    
    def string_value
      
    end
    
    def to_s
      string_value
    end
    
    def int_value
      
    end
    
    def to_i
      int_value
    end
    
    def float_value
      
    end
    
    def to_f
      float_value
    end
    
    def double_value
      
    end
    
    def needs_display
      
    end
    
  
    
    def send_action action, to:target
      
    end
    
    def take_int_value_from sender
      
    end
    
    def take_float_value_from sender
      
    end
    
    def take_double_value_from sender
      
    end
    
    def take_object_value_from sender
      
    end
    
    def take_string_value_from sender
      
    end
    
    def current_editor
      
    end
    
    def abort_editing
      
    end
    
    def validate_editing
      
    end
    
    def mouse_down the_event
      
      return unless enabled?
      
      track_mouse the_event, until_mouse_up:true
    end
    
    def start_tracking_at start_point
      # self.highlight true
      true
    end
    
    def continue_tracking last_point, at:current_point
      
    end
    
    def stop_tracking last_point, at:stop_point, mouse_is_up:flag
      # self.highlight false
    end
    
    def track_mouse the_event, until_mouse_up:flag
      location = convert_point(the_event.location_in_window, from_view: nil)
      
      unless start_tracking_at the_event.location_in_window
        return false
      end
      # highlight_with_frame
      App.send_action @action, to:@target, from:self if continuous?
      
      # capture further events
      puts 'requesting binding'
      App.bind_events [:left_mouse_up, :left_mouse_dragged] do |the_event|
        # location = convert_point the_event.location_in_window, from_view:nil
        puts the_event.type
        
        if the_event.type == :left_mouse_up
          App.unbind_events
        end
        # if flag
        #           if the_event.type == :left_mouse_up
        #             stop_tracking the_event.location_in_window, at:the_event.location_in_window, mouse_is_up:true
        #             App.unbind_events
        #             # set next state
        #             
        #             if location.in_rect? bounds
        #               App.send_action @action, to:@target, from:self
        #             end
        #             
        #             # highlight false
        #             return
        #           else
        #             unless continue_tracking the_event.location_in_window, the_event.location_in_window
        #               App.unbind_events
        #             end
        #             
        #             # highlight false?
        #           end
        #         elsif location.in_rect? bounds
        #           puts 'Control#track_mouse Got here.'
        #         else
        #           
        #         end
      end
    end    
  end
end
