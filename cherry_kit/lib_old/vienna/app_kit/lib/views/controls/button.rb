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
        
    def initialize frame
      super frame
    end
    
    # def display_mode
      # :draw
    # end
    
    def self.cell_class
      ButtonCell
    end
        
    def title=(str)
      @cell.title = str
    end
    
    def alternate_title=(str)
      @cell.alternate_title = str
    end
    
    def alternate_image
      @cell.alternate_image
    end
    
    def alternate_image= img
      @cell.alternate_image = img
    end
    
    def image=(image)
      @cell.image = image
    end
    
    def image_position=(position)
      @cell.image_position = position
    end
    
    def type=(type)
      @cell.type = type
    end
    
    def type
      @cell.type
    end
    


    def state=(val)
      @cell.state = val
    end
    
    def state
      @cell.state
    end
    
    def on?
      @cell.on?
    end
    
    def off?
      @cell.off?
    end
    
    def mixed?
      @cell.mixed?
    end
    
    
    
    
    def bordered?
      @cell.bordered?
    end
    
    def bordered=(flag)
      @cell.bordered = flag
    end
    
    def transparent?
      @cell.transparent?
    end
    
    def transparent=(flag)
      @cell.transparent = flag
    end
    
    def key_equivalent
      @cell.key_equivalent
    end
    
    def key_equivalent=(code)
      @cell.key_equivalent = code
    end
    
    def key_equivalent_modifier_mask
      @cell.key_equivalent_modifier_mask
    end
    
    def key_equivalent_modifier_mask=(mask)
      @cell.key_equivalent_modifier_mask = mask
    end
    
    def highlight=(flag)
      
    end
    
    def perform_key_equivalent(key)
      
    end
    
    # added
    def bezel=(style)
      @cell.bezel = style
    end
    
    def bezel
      @cell.bezel
    end
    
    def allows_mixed_state=(flag)
      @cell.allows_mixed_state = flag
    end
    
    def allows_mixed_state?
      @cell.allows_mixed_state?
    end
    
    def next_state
      # set_next_state
    end
  end  
end
