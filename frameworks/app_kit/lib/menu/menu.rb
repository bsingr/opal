# 
# menu.rb
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
  
  class Menu
    
    def init_with_title a_title
      @title a_title
    end
    
    def title= a_title
      @title = a_title
    end
    
    def title
      @title
    end
    
    
    
    def self.pop_up_context_menu menu, with_event:the_event, for_view:view
      
    end
    
    def self.pop_up_content_menu menu, with_event:the_event, for_view:view, with_font:font
      
    end



    def pop_up_menu_positioning_item item, at_location:location, in_view:view
      
    end
    
    
    
    def self.menu_bar_visible= visible
      @menu_bar_visible = visible
    end
    
    def self.menu_bar_visible?
      # unless we explicitly set it, the menu bar is not visible: i.e. does not exist
      @menu_bar_visible || false
    end
    
    
    
    def supermenu
      @supermenu
    end
    
    def supermenu= supermenu
      @supermenu = supermenu
    end
    
    
    def insert_item new_item, at_index:index
      
    end
    
    def add_item new_item
      
    end
    
    def insert_item_with_title a_string, action:a_selector, key_equivalent:char_code, at_index:index
      
    end
    
    def add_item_with_title a_string, action:a_selector, key_equivalent:char_code
      
    end
    
    
    
    def remove_item_at_index index
      
    end
    
    def remove_item item
      
    end
    
    
    
    def set_submenu a_menu, for_item:an_item
      
    end
    
    
    
    def remove_all_items
      
    end
    
    
    
    def item_array
      
    end
    
    
    
    def number_of_items
      
    end
    
    def item_at_index index
      
    end
    
    def index_of_item item
      
    end
    
    def index_of_item_with_title a_title
      
    end
    
    def index_of_item_with_tag a_tag
      
    end
    
    def index_of_item_with_represented_object object
      
    end
    
    def index_of_item_with_submenu submenu
      
    end
    
    def index_of_item_with_target target, and_action:action_selector
      
    end
    
    
    
    def item_with_title a_title
      
    end
    
    def item_with_tag tag
      
    end
    
    
    def autoenables_items= flag
      @autoenables_items = flag
    end
    
    def autoenables_items?
      @autoenables_items
    end
    
    def update
      
    end
    
    
    def perform_key_equivalent the_event
      
    end
    
    
    
    def item_changed item
      
    end
    
    def perform_action_for_item_at_index index
      
    end
    
    
    def delegate= an_object
      @delegate = an_object
    end
    
    def delegate
      @delegate
    end
    
    def menu_bar_height
      
    end
    
    def cancel_tracking
      
    end
    
    def cancel_tracking_without_animation
      
    end
    
    def highlighted_item
      
    end
    
    
    def minimum_with
      @minimum_width
    end
    
    def minimum_width= a_width
      @minimum_width = a_width
    end
    
    def size
      
    end
    
    def font
      @font
    end
    
    def font= font
      @font = font
    end
    
    
    def allows_context_menu_plug_ins?
      @allows_context_menu_plug_ins
    end
    
    def allows_context_menu_plug_ins= flag
      @allows_context_menu_plug_ins = flag
    end
    
    def shows_state_column= flag
      @shows_state_column = flag
    end
    
    def shows_state_column?
      @shows_state_column
    end
    
    
    
    
    def submenu_action sender
      
    end
    
    def validate_menu_item menu_item
      
    end
  end
end
