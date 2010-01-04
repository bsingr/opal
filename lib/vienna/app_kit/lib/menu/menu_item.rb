# 
# menu_item.rb
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
  
  class MenuItem
    
    def MenuItem.separator_item
      # return new separator item
    end
    
    def initialize(title, action, key_equivalent)
      @title = title
      @action = action
      @key_equivalent = key_equivalent
    end
    
    def menu=(menu)
      @menu = menu
    end
    
    def menu
      @menu
    end
    
    def has_submenu?
      @submenu ? true : false
    end
    
    def submenu=(submenu)
      @submenu = submenu
    end
    
    def submenu
      @submenu
    end
    
    def parent_item
      # parent menuitem (not menu)
    end
    
    def title=(title)
      @title = title
    end
    
    def title
      @title
    end
    
    def attributed_title=(string)
      @attributed_title = string
    end
    
    def attributed_title
      @attributed_title
    end
    
    def separator_item?
      false
    end
    
    def key_equivalent=(key_equivalent)
      @key_equivalent = key_equivalent
    end
    
    def key_equivalent
      @key_equivalent
    end
    
    def key_equivalent_modifier_mask=(mask)
      @key_equivalent_modifier_mask = mask
    end
    
    def key_equivalent_modifier_mask
      @key_equivalent_modifier_mask
    end
    
    def image=(an_image)
      @image = an_image
    end
    
    def image
      @image
    end
    
    def state=(a_state)
      @state = a_state
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
    
    def on_state_image=(image)
      @on_state_image = image
    end
    
    def on_state_image
      @on_state_image
    end

    def off_state_image=(image)
      @off_state_image = image
    end
    
    def off_state_image
      @off_state_image
    end

    def mixed_state_image=(image)
      @mixed_state_image = image
    end
    
    def mixed_state_image
      @mixed_state_image
    end
    
    def enabled=(flag)
      @enabled = flag
    end
    
    def enabled?
      @enabled
    end
    
    def alternate=(alternate)
      @alternate = alternate
    end
    
    def alternate?
      @alternate
    end
    
    def indentation_level=(indentation_level)
      @indentation_level = indentation_level
    end
    
    def indentation_level
      @indentation_level
    end
    
    def target=(a_target)
      @target = a_target
    end
    
    def target
      @target
    end
    
    def action=(an_action)
      @action = an_action
    end
    
    def action
      @action
    end
    
    def on_action(&block)
      obj = Object.new
      obj.instance_variable_set('@action', block)
      def obj.menu_item_action(sender)
        @action.call(sender)
      end
      self.action = :menu_item_action
      self.target = obj
    end
    
    def tag=(a_tag)
      @tag = a_tag
    end
    
    def tag
      @tag
    end
    
    def represented_object=(an_object)
      @represented_object = an_object
    end
    
    def represented_object
      @represented_object
    end
    
    def view=(a_view)
      @view = a_view
    end
    
    def view
      @view
    end
    
    
    def highlighted?
      false
    end
    
    def hidden=(hidden)
      @hidden = hidden
    end
    
    def hidden?
      @hidden
    end
    
    def hidden_or_has_hidden_ancestor?
      @hidden
    end
    
    def tooltip=(tooltip)
      @tooltip = tooltip
    end
    
    def tooltip
      @tooltip
    end
  end
  
  class View < Responder
    
    def enclosing_menu_item
      nil
    end    
  end
end
