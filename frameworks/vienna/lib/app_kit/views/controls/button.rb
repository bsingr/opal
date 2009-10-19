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
  
  # Image.resource 'controls.png' do |img|
  #   
  #   img.sprite :rounded_bezel_enabled_regular_left, [0, 0, 36, 24]
  #   img.sprite :rounded_bezel_enabled_regular_middle, [0, 24, 36, 24]
  #   img.sprite :rounded_bezel_enabled_regular_right, [0, 48, 36, 24]
  #   
  #   img.sprite :rounded_bezel_disabled_regular_left, [0, 0, 36, 24]
  #   img.sprite :rounded_bezel_disabled_regular_middle, [0, 24, 36, 24]
  #   img.sprite :rounded_bezel_disabled_regular_right, [0, 48, 36, 24]
  #   
  #   img.sprite :rounded_bezel_pushed_regular_left, [0, 0, 36, 24]
  #   img.sprite :rounded_bezel_pushed_regular_middle, [0, 24, 36, 24]
  #   img.sprite :rounded_bezel_pushed_regular_right, [0, 48, 36, 24]
  #   
  #   
  #   
  #   img.sprite :rounded_bezel_enabled_small_left, [0, 0, 36, 24]
  #   img.sprite :rounded_bezel_enabled_small_middle, [0, 24, 36, 24]
  #   img.sprite :rounded_bezel_enabled_small_right, [0, 48, 36, 24]
  #   
  #   img.sprite :rounded_bezel_disabled_small_left, [0, 0, 36, 24]
  #   img.sprite :rounded_bezel_disabled_small_middle, [0, 24, 36, 24]
  #   img.sprite :rounded_bezel_disabled_small_right, [0, 48, 36, 24]
  #   
  #   img.sprite :rounded_bezel_pushed_small_left, [0, 0, 36, 24]
  #   img.sprite :rounded_bezel_pushed_small_middle, [0, 24, 36, 24]
  #   img.sprite :rounded_bezel_pushed_small_right, [0, 48, 36, 24]
  #   
  #   
  #   
  #   img.sprite :rounded_bezel_enabled_mini_left, [0, 0, 36, 24]
  #   img.sprite :rounded_bezel_enabled_mini_middle, [0, 24, 36, 24]
  #   img.sprite :rounded_bezel_enabled_mini_right, [0, 48, 36, 24]
  #   
  #   img.sprite :rounded_bezel_disabled_mini_left, [0, 0, 36, 24]
  #   img.sprite :rounded_bezel_disabled_mini_middle, [0, 24, 36, 24]
  #   img.sprite :rounded_bezel_disabled_mini_right, [0, 48, 36, 24]
  #   
  #   img.sprite :rounded_bezel_pushed_mini_left, [0, 0, 36, 24]
  #   img.sprite :rounded_bezel_pushed_mini_middle, [0, 24, 36, 24]
  #   img.sprite :rounded_bezel_pushed_mini_right, [0, 48, 36, 24]
  #   
  # end
    
  class Button < Control
    
    attr_reader :title, :alternate_title, :image, :image_position
    
    def initialize frame
      super frame
      @state = :off
      @allows_mixed_state = false
      @bordered = true
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
    def type=(type)
      @type = type
    end
    
    def type
      @type
    end
    
    # Values can be - :on :off, :mixed
    def state=(val)
      @state = val
    end
    
    def state
      @state
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
      @bordered
    end
    
    def bordered=(flag)
      @bordered = flag
    end
    
    def transparent?
      @transparent
    end
    
    def transparent=(flag)
      @transparent = flag
    end
    
    def key_equivalent
      @key_equivalent
    end
    
    def key_equivalent=(code)
      @key_equivalent = code
    end
    
    def key_equivalent_modifier_mask
      @key_equivalent_modifier_mask
    end
    
    def key_equivalent_modifier_mask=(mask)
      @key_equivalent_modifier_mask = mask
    end
    
    def highlight=(flag)
      
    end
    
    def perform_key_equivalent(key)
      
    end
    
    # added
    def bezel=(style)
      @bezel = style
    end
    
    def bezel
      @bezel
    end
    
    def allows_mixed_state=(flag)
      @allows_mixed_state = flag
    end
    
    def allows_mixed_state?
      @allows_mixed_state
    end
    
    def next_state
      # set_next_state
    end
    
    def class_name
      @class_name || 'vn-button'
    end
    
    # Renders the button
    # Override an instances' class_name to avoid having to subclass
    def render context
      if context.first_time?
        context << "<div class='left'></div>"
        context << "<div class='middle'></div>"
        context << "<div class='right'></div>"
        context << "<div class='title'>Wow!</div>"
        context << "<div class='image'></div>"
        context.first_time = false
      end
      
      class_name_array = [class_name] 
      class_name_array << :disabled unless enabled?
      
      # if bordered?    
      class_name_array << :bordered if bordered?
      # end
      
      if on? || mixed?
        class_name_array << state
      end
      
      context.class_name = class_name_array.join(' ')
      
      # context.selector 'title' do |title|
      #   title.inner_html = 'My Button!'
      #   # title.frame = title_rect_for_bounds @bounds
      # end
    end
  end  
end
