# 
# responder.rb
# vienna
# 
# Created by Adam Beynon.
# Copyright 2009 Adam Beynon.
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the 'Software'), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#

module Vienna
  
  # KEY_BINDINGS = {
  #       :escape => 'cancel',
  #       :backspace => 'delete_backward',
  #       :delete => 'delete_forward',
  #       :return => 'insert_newline',
  #       :tab => 'insert_tab',
  #       :left => 'move_left',
  #       :right => 'move_right',
  #       :up => 'move_up',
  #       :down => 'move_down',
  #       :home => 'move_to_beginning_of_document',
  #       :end => 'move_to_end_of_document',
  #       :pagedown => 'page_down',
  #       :pageup => 'page_up',
  #       :shift_tab => 'insert_backtab',
  #       :shift_left => 'move_left_and_modify_selection',
  #       :shift_right => 'move_right_and_modify_selection',
  #       :shift_up => 'move_up_and_modify_selection',
  #       :shift_down => 'move_down_and_modify_selection',
  #       :alt_left => 'move_left_and_modify_selection',
  #       :alt_right => 'move_right_and_modify_selection',
  #       :alt_up => 'move_up_and_modify_selection',
  #       :alt_down => 'move_down_and_modify_selection',
  #       :ctrl_a => 'select_all'
  #     }
  
  class Responder
    
    def initialize
      super
      @next_responder = nil
    end
    
    def next_responder= a_responder
      @next_responder = a_responder
    end
    
    def next_responder
      @next_responder
    end
    
    def try_to_perform an_action, with:an_object
      
    end
    
    def perform_key_equivalent the_event
      false
    end
    
    def mouse_down the_event
      @next_responder.mouse_down the_event
    end
    
    def right_mouse_down the_event
      @next_responder.right_mouse_down the_event
    end
    
    def other_mouse_down the_event
      @next_responder.other_mouse_down the_event
    end
    
    def mouse_up the_event
      @next_responder.mouse_up the_event
    end
    
    def right_mouse_up the_event
      @next_responder.right_mouse_up the_event
    end
    
    def other_mouse_up the_event
      @next_responder.other_mouse_up the_event
    end
    
    def mouse_moved the_event
      @next_responder.mouse_moved the_event
    end
    
    def mouse_dragged the_event
      @next_responder.mouse_dragged the_event
    end
    
    def scroll_wheel the_event
      @next_responder.scroll_wheel the_event
    end
    
    def right_mouse_dragged the_event
      @next_responder.right_mouse_dragged the_event
    end
    
    def other_mouse_dragged the_event
      @next_responder.other_mouse_dragged the_event
    end
    
    def mouse_entered the_event
      @next_responder.mouse_entered the_event
    end
    
    def mouse_exited the_event
      @next_responder.mouse_exited the_event
    end
    
    def key_down the_event
      @next_responder.key_down the_event
    end
    
    def key_up the_event
      @next_responder.key_up the_event
    end
    
    def flags_changed the_event
      
    end
    
    def cursor_update the_event
      
    end
    
    
    
    def no_responder_for event_selector
      
    end
    
    def accepts_first_responder
      false
    end
    
    def become_first_responder
      true
    end
    
    def resign_first_responder
      true
    end
    
    
    
    def interpret_key_events event_array
      
    end
    
    def flush_buffered_key_events
      
    end
    
    
    
    
    def menu=(menu)
      @menu = menu
    end
    
    def menu
      @menu
    end
    
    
    
    def show_context_help sender
      
    end
    
    
    
    def help_requested the_event
      
    end
    
    
    
    def undo_manager
      @next_responder.undo_manager
    end
  end
end
