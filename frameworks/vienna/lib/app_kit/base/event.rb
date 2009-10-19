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
  
  class Event
        
    # Event types
    # -----------
    # :left_mouse_down, :left_mouse_up, :left_mouse_dragged
    # :right_mouse_down, :right_mouse_up, :right_mouse_dragged
    # :mouse_moved, :mouse_entered, :mouse_exited, :scroll_wheel
    # :key_down, :key_up
    def type
      
    end
    
    def modifier_flags
      
    end
    
    def timestamp
      
    end
    
    def window
      
    end
    
    def window_number
      
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
