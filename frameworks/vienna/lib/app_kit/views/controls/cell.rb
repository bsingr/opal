# 
# cell.rb
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
  
  CELL_TYPES = {
    :null               => 0,
    :text               => 1,
    :image              => 2
  }
  
  # Image positions
  IMAGE_POSITIONS = {
    :text_only          => 0,
    :image_only         => 1,
    :left               => 2,
    :right              => 3,
    :below              => 4,
    :above              => 5,
    :overlaps           => 6
  }
  
  CELL_STATES = {
    # FIXME: Doesnt support 'minus' numbers
    # :mixed              => -1,
    :off                => 0,
    :on                 => 1
  }
  
  CELL_MASKS = {
    :none               => 0,
    :contents           => 1,
    :push_in            => 2,
    :change_gray        => 4,
    :change_background  => 8
  }
  
  CONTROL_TINTS = {
    :default            => 0,
    :blue               => 1,
    :graphite           => 6,
    :clear              => 7
  }

  CONTROL_SIZES = {
    :regular            => 0,
    :small              => 1,
    :mini               => 2
  }
  
  class Cell
    
    def self.prefers_tracking_until_mouse_up
      
    end
    
    def init_text_cell str
      @cell_type = :text
      @enabled = true
      @editable = false
      @selectable = false
      @state = :off
      @title = str
      @image = nil
      @bordered = false
      @bezeled = false
      @highlighted = false
      @refuses_first_responder = false      
    end
    
    def init_image_cell img
      
    end
    
    def initialize
      init_text_cell 'Cell'
    end
    
    def class_name= class_name
      @class_name = class_name
    end
    
    def class_name
      @class_name || 'vn-control'
    end
    
    def theme_name= theme_name
      @theme_name = theme_name
    end
    
    def theme_name
      @theme_name || ''
    end
    
    
    
    def control_view
      @control_view
    end
    
    def control_view= view
      @control_view = view
    end
    
    def type
      @type
    end
    
    def type= a_type
      @type = a_type
    end
    
    def state
      @state
    end
    
    def state= state
      @state = state
    end

    def target
      @target
    end
    
    def target= target
      @target = target
    end
    
    def action
      @action
    end
    
    def action= action
      @action = action
    end
    
    def tag
      @tag
    end
    
    def tag= tag
      @tag = tag
    end
    
    def title
      @title
    end
    
    def title= title
      @title= title
    end
    
    def opaque?
      @opaque
    end
    
    def enabled?
      @enabled
    end
    
    def enabled= flag
      @enabled = flag
    end
    
    def send_action_on mask
      
    end
    
    def continuous?
      @continuous
    end
    
    def continuous= flag
      @continuous = flag
    end
    
    def editable?
      @editable
    end
    
    def editable= flag
      @editable = flag
    end
    
    def selectable?
      @selectable
    end
    
    def selectable= flag
      @selectable = flag
    end
    
    def bordered?
      @bordered
    end
    
    def bordered= flag
      @bordered = flag
    end
    
    def bezeled?
      @bezeled
    end
    
    def bezeled= flag
      @bezeled = flag
    end
    
    def scrollable?
      @scrollable
    end
    
    def scrollable= flag
      @scrollable = flag
      self.wraps = false if flag
    end
    
    def highlighted?
      @highlighted
    end
    
    def highlighted= flag
      @highlighted = flag
    end
    
    def alignment
      @alignment
    end
    
    def alignment= align
      @alignment = align
    end
    
    def wraps?
      @wraps
    end
    
    def wraps= flag
      @wraps = flag
      self.scrollable = false if flag
    end
    
    def font
      @font
    end
    
    def font= obj
      @font = obj
    end
    
    def entry_acceptable? str
      true
    end
    
    def key_equivalent
      @key_equivalent
    end
    
    def formatter= formatter
      @formatter = formatter
    end
    
    def formatter
      @formatter
    end
    
    def object_value
      
    end
    
    def object_value= obj
      
    end
    
    def valid_object_value?
      true
    end
    
    def string_value
      
    end
    
    def string_value= str
      
    end
    
    def int_value
      
    end
    
    def int_value= val
      
    end
    
    def float_value
      
    end
    
    def float_value= val
      
    end
    
    def double_value
      
    end
    
    def double_value= val
      
    end
    
    def compare other_cell
      
    end
    
    
    def take_int_value_from sender
      
    end
    
    def take_float_value_from sender
      
    end
    
    def take_double_value_from sender
      
    end
    
    def take_string_value_from sender
      
    end
    
    def take_object_value_from sender
      
    end
    
    def image
      @image
    end
    
    def image= img
      @image = img
    end
    
    def control_tint
      @control_tint
    end
    
    def control_tint= control_tint
      @control_tint = control_tint
    end
    
    def control_size= size
      @control_size = size
    end
    
    def control_size
      @control_size
    end
    
    def represented_object
      @represented_object
    end
    
    def represented_object= obj
      @represented_object = obj
    end
    
    def cell_attribute a_parameter
      
    end
    
    def set_cell_attribute a_parameter, to:value
      
    end
    
    def image_rect_for_bounds the_rect
      the_rect
    end
    
    def title_rect_for_bounds the_rect
      the_rect
    end
    
    def drawing_rect_for_bounds the_rect
      the_rect
    end
    
    def cell_size
      
    end
    
    def cell_size_for_bounds a_rect
      
    end
    
    def highlight_color_with_frame cell_frame, in_view:control_view
      
    end
    
    def calc_draw_info a_rect
      
    end
    
    def set_up_field_editor_attributes text_obj
      text_obj
    end
    
    
    # Rendering
    def render_interior_with_frame cell_frame, in_view:control_view
      
    end
    
    def render_with_frame cell_frame, in_view:control_view
      # render nothing
    end
    
    
    
    # Drawing
    def draw_interior_with_frame cell_frame, in_view:control_view
      
    end
    
    def draw_with_frame cell_frame, in_view:control_view
      
    end
    
    
    
    def highlight flag, with_frame:cell_frame, in_view:control_view
      if @highlighted != flag
        @highlighted = flag
        render_with_frame cell_frame, in_view:control_view
      end
    end
    
    def mouse_down_flags
      
    end
    
    def get_periodic_delay delay, interval:interval
      
    end
    
    def render_context= a_context
      @render_context = a_context
    end
    
    def render_context
      @render_context
    end
    
    
    
      
    def start_tracking_at start_point, in_view:control_view
      # highlight true
      true
    end
    
    def continue_tracking last_point, at:current_point, in_view:control_view
      
    end
    
    def stop_tracking last_point, at:stop_point, in_view:control_view, mouse_is_up:flag
      # highlight false
    end
    
    def track_mouse the_event, in_rect:cell_frame, of_view:control_view, until_mouse_up:flag
      location = control_view.convert_point(the_event.location_in_window, from_view:nil)
      
      unless start_tracking_at the_event.location_in_window, in_view:control_view
        return false
      end
      
      highlight true, with_frame:cell_frame, in_view:control_view
      
      # highlight with frame
      App.send_action action, to:target, from:self if continuous?
      
      # capture further events
      puts 'Requesting binding'
      App.bind_events [:left_mouse_up, :left_mouse_dragged] do |the_event|
        location = control_view.convert_point the_event.location_in_window, from_view:nil
        puts the_event.type
      
        if the_event.type == :left_mouse_up
          App.unbind_events
        end
        
        if location.in_rect? cell_frame
          highlight true, with_frame:cell_frame, in_view:control_view
        else
          highlight false, with_frame:cell_frame, in_view:control_view
        end
        
        # if flag
        #           if the_event.type == :left_mouse_up
        #             stop_tracking the_event.location_in_window, at:the_event.location_in_window, mouse_is_up:true
        #             App.unbind_events
        #             # set next state
        #             
        #             if location.in_rect? bounds
        #               App.send_action @action, to:@target, from:self
        #             end
        #             
        #             # highlight false
        #             return
        #           else
        #             unless continue_tracking the_event.location_in_window, the_event.location_in_window
        #               App.unbind_events
        #             end
        #             
        #             # highlight false?
        #           end
        #         elsif location.in_rect? bounds
        #           puts 'Control#track_mouse Got here.'
        #         else
        #           
        #         end
      end
    end
    
    
    def edit_with_frame a_rect, in_view:control_view, editor:text_obj, delegate:an_obj, event:the_event
      
    end
    
    def select_with_frame a_rect, in_view:control_view, editor:text_obj, delegate:an_obj, start:sel_start, length:sel_length
      
    end
    
    def end_editing text_obj
      
    end
    
    def reset_cursor_rect cell_frame, in_view:control_view
      
    end
    
    
    
    def menu= a_menu
      @menu = a_menu
    end
    
    def menu
      @menu
    end
    
    def menu_for_event the_event, in_rect:cell_frame, of_view:view
      
    end
    
    def self.default_menu
      
    end
    
    
    def sends_action_on_end_editing= flag
      @sends_action_on_end_editing = flag
    end
    
    def sends_action_on_end_editing?
      @sends_action_on_end_editing
    end
    
    
    def base_writing_direction
      @base_writing_direction
    end
    
    def base_writing_direction= direction
      @base_writing_direction = direction
    end
    
    
    def line_break_mode= mode
      @line_break_mode = mode
    end
    
    def line_break_mode
      @line_break_mode
    end
    
    def allows_undo= flag
      @allows_undo = flag
    end
    
    def allows_undo?
      @allows_undo
    end
    
    
    
    def refuses_first_responder= flag
      @refuses_first_responder = flag
    end
    
    def refuses_first_responder?
      @refuses_first_responder
    end
    
    def accepts_first_responder?
      true
    end
    
    def shows_first_responder?
      @shows_first_responder
    end
    
    def shows_first_responder= flag
      @shows_first_responder = flag
    end
    
    def perform_click sender
      # perform click
    end
    
    
    
    def attributed_string_value
      
    end
    
    def attributed_string_value= obj
      
    end
    
    def allows_editing_text_attributes?
      @allows_editing_text_attributes
    end
    
    def allows_editing_text_attributes= flag
      @allows_editing_text_attributes = flag
      self.imports_graphics = false unless flag
    end
    
    def imports_graphics?
      @imports_graphics
    end
    
    def imports_graphics= flag
      @imports_graphics = flag
      allows_editing_text_attributes = true if flag
    end



    def allows_mixed_state= flag
      @allows_mixed_state = flag
    end
    
    def allows_mixed_state?
      @allows_mixed_state
    end
    
    def next_state
      
    end
    
    def set_next_state
      
    end

    
    
    def hit_test_for_event event, in_rect:cell_frame, of_view:control_view
      
    end
  end
end
