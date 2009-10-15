# 
# button.rb
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
    
  class Button < Control
    
    attr_reader :title, :alternate_title, :image, :image_position
    
    def initialize frame
      # setup_drawing_context
      # puts 'initilising button'
      super frame
      # puts' _finished in button_'
    end
    
    def self.cell_class
      ButtonCell
    end
    
    def title=(str)
      
    end
    
    def alternate_title=(str)
      
    end
    
    def image=(image)
      
    end
    
    def image_position=(position)
      
    end
    
    # Type of button. Valid values:
    # :momentary_light, :push_on_push_off, :toggle, :switch, :radio, 
    # :momentary_change, :on_off, :momentary_push_in, :momentary_push
    # 
    def button_type=(type)
      
    end
    
    # New method alias for button_type
    def type=(type)
      button_type = type
    end
    
    def state
      
    end
    
    # Values can be
    # :on :off, :mixed
    def state=(val)
      
    end
    
    def on?
      @state == :on
    end
    
    def off?
      @state == :off
    end
    
    def mixed?
      @state == :mixed
    end
    
    def bordered?
      
    end
    
    def bordered=(flag)
      
    end
    
    def transparent?
      
    end
    
    def transparent=(flag)
      
    end
    
    def key_equivalent
      
    end
    
    def key_equivalent=(code)
      
    end
    
    def key_equivalent_modifier_mask
      
    end
    
    def key_equivalent_modifier_mask=(mask)
      
    end
    
    def highlight=(flag)
      
    end
    
    def perform_key_equivalent(key)
      
    end
    
    def bezel_style=(style)
      
    end
    
    # added
    def bezel=(style)
      bezel_style = style
    end
    
    def bezel_style
      
    end
    
    def allows_mixed_state=(flag)
      
    end
    
    def allows_mixed_state
      
    end
    
    def next_state
      # set_next_state
    end
    
  end
  
end


