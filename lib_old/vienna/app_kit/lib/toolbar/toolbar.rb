# 
# toolbar.rb
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
  
  TOOLBAR_DISPLAY_MODES = {
    :default        => 0,
    :icon_and_label => 1,
    :icon           => 2,
    :label          => 3
  }
  
  TOOLBAR_SIZE_MODES = {
    :default        => 0,
    :regular        => 1,
    :small          => 2
  }
  
  class Toolbar
    
    def initialize(identifier)
      @identifier = identifier
      @visible = true
    end
    
    def insert_item_with_identifier(item_identifier, at_index:index)
      
    end
    
    def remove_item_at_index(index)
      
    end
    
    def delegate=(a_delegate)
      @delegate = a_delegate
    end
    
    def delegate
      @delegate
    end
    
    def visible=(flag)
      @visible = flag
    end
    
    def visible?
      @visible
    end
    
    def run_customization_palette(sender)
      
    end
    
    def customization_palette_is_running?
      
    end
    
    def display_mode=(a_mode)
      @display_mode = a_mode
    end
    
    def display_mode
      @display_mode
    end
    
    def selected_item_identifier=(item_identifier)
      @selected_item_identifier = item_identifier
    end
    
    def selected_item_identifier
      @selected_item_identifier
    end
    
    def size_mode=(size_mode)
      @size_mode = size_mode
    end
    
    def size_mode
      @size_mode
    end
    
    def shows_baseline_separator=(flag)
      @shows_baseline_separator = flag
    end
    
    def shows_baseline_separator?
      @shows_baseline_separator
    end
    
    def allows_user_customization=(flag)
      @allows_user_customization = flag
    end
    
    def allows_user_customization?
      @allows_user_customization
    end
    
    
    def identifier
      @identifier
    end
    
    def items
      @items
    end
    
    def window=(a_window)
      @window = a_window
    end
    
    def window
      @window
    end
        
    def visible_items
      
    end
    
    def validate_visible_items
      
    end
  end
  
  # ToolbarDelegate
  # ===============
  # 
  # required:
  # 
  #   toolbar(toolbar, item_for_identifier:item_identifier, will_be_inserted_into_toolbar:flag)
  # 
  #   toolbar_default_item_identifiers(toolbar)
  # 
  #   toolbar_allowed_item_identifiers(toolbar)
  # 
  # optional:
  # 
  #   toolbar_selectable_item_identifiers(toolbar)
  # 
  # notifications:
  # 
  #   toolbar_will_add_item(notification)
  # 
  #   toolbar_did_remove_item(notification)
  
  TOOLBAR_WILL_ADD_ITEM_NOTIFICATION = "VNToolbarWillAddItemNotification"
  
  TOOLBAR_DID_REMOVE_ITEM_NOTIFICATION = "VNToolbarDidRemoveItemNotification"
end
