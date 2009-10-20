# 
# event.rb
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

# `var cEvent = RClass.define_under(cObject.$c_g_full('Vienna'), 'Event', cObject);
# 
# Event.prototype.$klass = cEvent
# Event.prototype.$type = VN.CLASS;
# 
# cEvent.$define_alloc_func(function() {
# }); `

module Vienna
  
  EVENT_TYPES = {
    :left_mouse_down => 1,
    :left_mouse_up => 2,
    :right_mouse_down => 3,
    :right_mouse_up => 4,
    :mouse_moved => 5,
    :left_mouse_dragged => 6,
    :right_mouse_dragged => 7,
    :mouse_entered => 8,
    :mouse_exited => 9,
    :key_down => 10,
    :key_up => 11,
    :flags_changed => 12,
    :app_kit_defined => 13,
    :system_defined => 14,
    :application_defined => 15,
    :periodic => 16,
    :cursor_update => 17,
    :scroll_wheel => 22,
    :other_mouse_down => 25,
    :other_mouse_up => 26,
    :other_mouse_dragged => 27
  }
  
  class Event
    
    def self.from_native_event event, with_window:win, with_type:type
      obj = self.allocate
      obj.initialize_with_native_event event, with_window:win, with_type:type
      obj
    end
    
    def initialize_with_native_event event, with_window:win, with_type:type
      @event = event
      @window = win
      @type = type
    end
    
    # Event types
    # -----------
    # :left_mouse_down, :left_mouse_up, :left_mouse_dragged
    # :right_mouse_down, :right_mouse_up, :right_mouse_dragged
    # :mouse_moved, :mouse_entered, :mouse_exited, :scroll_wheel
    # :key_down, :key_up
    
    def stop_propagation
      event = @event
      `if (event.stopPropagation) {
        event.stopPropagation()
        event.preventDefault();
      } else {
        window.event.cancelBubble = true;
        window.event.returnValue = false;
      }`
    end
    
    # If the element has been set to force allow propagation - APPKIT will ignore this event
    def allows_propagation?
      `return #{@event}._vn_allow_event_propagation? true : false;`
    end
    
    def type
      @type
    end
    
    def modifier_flags
      
    end
    
    def timestamp
      
    end
    
    def window
      @window
    end
    
    def window_number
      @window.window_number
    end
    
    def context
      
    end
    
    
    
    def click_count
      
    end
    
    def button_number
      
    end
    
    def event_number
      
    end
    
    def location_in_window
      @window.convert_screen_to_base(Point.new(`#{@event}.clientX`, `#{@event}.clientY`))
    end
    
    def characters
      
    end
    
    def characters_ignoring_modifiers
      
    end
    
    def repeat?
      
    end
    
    def key_code
      
    end
    
    def tracking_number
      
    end
    
    def user_data
      
    end
    
    def tracking_area
      
    end
    
    # global mouse location
    def self.mouse_location
      
    end
  end  
end
