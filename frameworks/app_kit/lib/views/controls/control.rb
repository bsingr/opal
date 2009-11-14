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
    
    def initialize(frame)
      super frame
      @cell = self.class.cell_class.new
      # @cell.render_context = @display_context
    end
    
    def init_with_coder(coder)
      super coder
      @cell = coder.decode_object :cell
    end
    
    def self.cell_class
      Cell
    end
    
    def render(context)
      # puts "A"
      @cell.render_with_frame(bounds, in_view:self)
      # puts "B"
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
    
    def on_action(&block)
      @cell.on_action(block)
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
      self.needs_display = true
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
      unless obj == @cell.object_value
        abort_editing
        @cell.object_value = obj
        self.needs_display = true
      end
    end
    
    def string_value=(obj)
      self.object_value = obj
    end
    
    # Alias for string value
    def text=(text)
      string_value = text
    end
    
    
    def int_value=(val)
      self.object_value = obj
    end
    
    def float_value=(val)
      self.object_value = obj
    end
    
    def double_value=(val)
      self.object_value = obj
    end
    
    def object_value
      @cell.object_value
    end
    
    def string_value
      @cell.string_value
    end
    
    def to_s
      string_value
    end
    
    def int_value
      @cell.int_value
    end
    
    def to_i
      int_value
    end
    
    def float_value
      @cell.float_value
    end
    
    def to_f
      float_value
    end
    
    def double_value
      @cell.double_value
    end
    
    
    
    def draw_rect(the_rect)
      @cell.draw_with_frame(bounds, in_view:self)
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
    
  
    
    def send_action(action, to:target)
      # puts 'sending action on'
      # update binding. Value binding is always set as actions are sent, so do both
      # propagate_binding(:value) if info_for_binding(:value)       
      # action
      App.send_action(action, to:target, from:self)
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
      @cell.track_mouse(the_event, in_rect:bounds, of_view:self, until_mouse_up:true)
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
    
    # Catch value bindings. these must be referenced back to object_value
    # two-way
    # basically, we override to ensure that object_value is the key to be synced
    def bind binding, to_object:observable, with_key_path:key_path, options:options
      if binding == :value
        unbind binding
        observable.add_observer self, for_key_path:key_path, options:options, context:binding
        binding_dict = {
          :observed_object => observable,
          :observed_key_path => key_path,
          :options => options,
          :key => 'object_value'
        }
        set_info binding_dict, for_binding:binding
        set_value_for_binding binding
      else
        super binding, observable, key_path, options
      end
    end
  end
end
