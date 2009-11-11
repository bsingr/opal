# 
# toolbar_item.rb
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
  
  class ToolbarItem
    
    def initialize(item_identifier)
      @item_identifier = item_identifier
    end
    
    def item_identifier
      @item_identifier
    end
    
    def toolbar
      @toolbar
    end
    
    def label=(label)
      @label = label
    end
    
    def label
      @label
    end
    
    def palette_label=(label)
      @palette_label = label
    end
    
    def palette_label
      @palette_label
    end
    
    def tool_tip=(tool_tip)
      @tool_tip = tool_tip
    end
    
    def tool_tip
      @tool_tip
    end
    
    def menu_form_representation=(menu_item)
      @menu_form_representation = menu_item
    end
    
    def menu_form_representation
      @menu_form_representation
    end
    
    def tag=(tag)
      @tag = tag
    end
    
    def tag
      @tag
    end
    
    def target=(target)
      @target = target
    end
    
    def target
      @target
    end
    
    def action=(action)
      @action = action
    end
    
    def action
      @action
    end
    
    def enabled=(enabled)
      @enabled = enabled
    end
    
    def enabled?
      @enabled
    end
    
    def image=(an_image)
      @image = an_image
    end
    
    def image
      @image
    end
    
    def view=(a_view)
      @view = a_view
    end
    
    def view
      @view
    end
    
    def min_size=(size)
      @min_size = size
    end
    
    def min_size
      @min_size
    end
    
    def max_size=(size)
      @max_size = size
    end
    
    def max_size
      @maz_size
    end
  end
  
  TOOLBAR_ITEMS_VISIBILITY = {
    :standard       => 0,
    :low            => -1000,
    :high           => 1000,
    :user           => 2000
  }
  
  SEPARATOR_ITEM_IDENTIFIER = "SEPARATOR_ITEM_IDENTIFIER" 
  SPACE_ITEM_IDENTIFIER = "SPACE_ITEM_IDENTIFIER" 
  FLEXIBLE_SPACE_ITEM_IDENTIFIER = "FLEXIBLE_SPACE_ITEM_IDENTIFIER"
  
  
  SHOW_COLORS_ITEM_IDENTIFIER = "SHOW_COLORS_ITEM_IDENTIFIER"
  SHOW_FONTS_ITEM_IDENTIFIER = "SHOW_FONTS_ITEM_IDENTIFIER"
  CUSTOMIZE_TOOLBAR_ITEM_IDENTIFIER = "CUSTOMIZE_TOOLBAR_ITEM_IDENTIFIER"
  PRINT_ITEM_IDENTIFIER = "PRINT_ITEM_IDENTIFIER"
end
