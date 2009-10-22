# 
# control.rb
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
  
  class Control < View
      
    # display_properties :enabled, :selected, :state
    
    def initialize frame
      super frame
      @cell = self.class.cell_class.new
      @cell.render_context = @display_context
    end
    
    def self.cell_class
      Cell
    end
    
    def render context
      RenderContext.current_context = context
      @cell.render_with_frame bounds, in_view:self
    end
    
    def class_name= class_name
      @cell.class_name = class_name
    end
    
    def class_name
      @cell.class_name
    end
    
    def theme_name= theme_name
      @cell.theme_name = theme_name
    end
    
    def theme_name
      @cell.theme_name
    end
    
    def cell
      @cell
    end
    
    def cell= a_cell
      @cell
    end
    
    def selected_cell
      @cell
    end
        
    def size_to_fit
        
    end
    
    def calc_size
      
    end
    
    def target
      @cell.target
    end
    
    def target=(obj)
      @cell.target = obj
    end
    
    def action
      @cell.action
    end
    
    def action=(selector)
      @cell.action = selector
    end
    
    def tag
      @cell.tag
    end
    
    def tag=(tag)
      @cell.tag = tag
    end
    
    def selected_tag
      @cell.tag
    end
    
    def ignores_multi_click=(flag)
      @cell.ignores_multi_click = flag
    end
    
    def ignores_multi_click?
      @cell.ignores_multi_click?
    end
    
    def send_action_on mask
      
    end
    
    def continuous?
      @cell.continuous?
    end
    
    def continuous=(flag)
      @cell.continuous = flag
    end
    
    def enabled?
      @cell.enabled?
    end
    
    def enabled=(flag)
      @cell.enabled = flag
    end
    
    def control_tint
      @cell.control_tint
    end
    
    def control_tint= control_tint
      @cell.control_tint = control_tint
    end
    
    def control_size= size
      @cell.control_size = size
    end
    
    def control_size
      @cell.control_size
    end
    
    def alignment
      @cell.alignment
    end
    
    # Valid alignments
    # :left, :right, :center, :justified, :natural
    # 
    def alignment=(mode)
      @cell.alignment = mode
    end
    
    def font
      @cell.font
    end
    
    def font=(font)
      @cell.font = font
    end
    
    def formatter=(new_formatter)
      @cell.formatter = new_formatter
    end
    
    def formatter
      @cell.formatter
    end
    
    def object_value=(obj)
      
    end
    
    def string_value=(obj)
      
    end
    
    # Alias for string value
    def text=(text)
      string_value = text
    end
    
    
    def int_value=(val)
      
    end
    
    def float_value=(val)
      
    end
    
    def double_value=(val)
      
    end
    
    def object_value
      
    end
    
    def string_value
      
    end
    
    def to_s
      string_value
    end
    
    def int_value
      
    end
    
    def to_i
      int_value
    end
    
    def float_value
      
    end
    
    def to_f
      float_value
    end
    
    def double_value
      
    end
    
    
    
    
    def update_cell a_cell
      
    end
    
    def update_cell_inside a_cell
      
    end
    
    def draw_cell_inside a_cell
      
    end
    
    def draw_cell a_cell
      
    end
    
    def select_cell a_cell
      
    end
    
  
    
    def send_action action, to:target
      
    end
    
    def take_int_value_from sender
      
    end
    
    def take_float_value_from sender
      
    end
    
    def take_double_value_from sender
      
    end
    
    def take_object_value_from sender
      
    end
    
    def take_string_value_from sender
      
    end
    
    def current_editor
      
    end
    
    def abort_editing?
      
    end
    
    def validate_editing
      
    end
    
    def mouse_down the_event
      return unless enabled?
      # FIXME: should this be sending the frame or the bounds?!?!?!?!
      self.lock_focus
      @cell.track_mouse the_event, in_rect:frame, of_view:self, until_mouse_up:true
      self.unlock_focus
    end
    
    
    
    def perform_click sender
      
    end
    
    def refuses_first_responder= flag
      @cell.refuses_first_responder = flag
    end
    
    def refuses_first_responder?
      @cell.refuses_first_responder?
    end
    
    
    
    def control_text_did_begin_editing notification
      
    end
    
    def control_text_did_end_editing notification
      
    end
    
    def control_text_did_change notification
      
    end
    
    
    
    
    def attributed_string_value
      @cell.attributed_string_value
    end
    
    def attributed_string_value= val
      @cell.attributed_string_value = val
    end
    
    

  end
end
