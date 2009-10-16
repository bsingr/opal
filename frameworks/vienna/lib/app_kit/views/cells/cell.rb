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


# action cell
# -----------
# - (id)target;
# - (void)setTarget:(id)anObject;
# - (SEL)action;
# - (void)setAction:(SEL)aSelector;
# - (NSInteger)tag;
# - (void)setTag:(NSInteger)anInt;

module Vienna
  
  class Cell
    
    def self.prefers_tracking_until_mouse_up
      true
    end
    
    def init_text_cell string
      
    end
    
    def init_image_cell image
      
    end
    
    def control_view
      @control_view
    end
    
    def control_view=(view)
      @control_view = view
    end
    
    def type
      @type
    end
    
    def type=(type)
      @type = type
    end
    
    def state
      @state
    end
    
    def state=(state)
      @state = state
    end
    
    def target
      @target
    end
    
    def target=(obj)
      @target = obj
    end
    
    def action
      @action
    end
    
    def action=(selector)
      @action = selector
    end
    
    def tag
      @tag
    end
    
    def tag=(tag)
      @tag = tag
    end
    
    def title
      @title
    end
    
    def title=(str)
      @title = str
    end
    
    def opaque?
      @opaque
    end
    
    def enabled?
      @enabled
    end
    
    def enabled=(flag)
      @enabled = flag
    end
    
    def continuous?
      @continuous
    end
    
    def continuous=(flag)
      @continuous = flag
    end
    
    def editable?
      @editable
    end
    
    def editable=(flag)
      @editable = flag
    end
    
    def selectable?
      @selectable
    end
    
    def selectable=(flag)
      @selectable = flag
    end
    
    def bordered?
      @bordered
    end
    
    def bordered=(flag)
      @bordered = flag
    end
    
    def bezeled?
      @bezeled
    end
    
    def bezeled=(flag)
      @bezeled = flag
    end
    
    def scrollable?
      @scrollable
    end
    
    def scrollable=(flag)
      @scrollable = flag
      wraps = false if flag
    end
    
    def highlighted?
      @highlighted
    end
    
    def highlighted=(flag)
      @highlighted = flag
    end
    
    def alignment
      @alignment
    end
    
    def alignment=(flag)
      @alignment = flag
    end
    
    def wraps?
      @wraps
    end
    
    def wraps=(flag)
      @wraps = flag
      scrollable = false if flag
    end
    
    def font
      @font
    end
    
    def font=(font)
      @font = font
    end
    
    def entry_acceptable? str
      true
    end
    
    def key_equivalent
      @key_equivalent
    end
    
    def formatter=(new_formatter)
      @formatter = new_formatter
    end
    
    def formatter
      @formatter
    end
    
    def object_value
      
    end
    
    def object_value=(obj)
      
    end
    
    def valid_object_value?
      true
    end
    
    def string_value
      
    end
    
    def string_value=(str)
      
    end
    
    def compare other_cell
      
    end
    
    def int_value
      
    end
    
    def int_value=(an_int)
      
    end
    
    def float_value
      
    end
    
    def float_value=(a_float)
      
    end
    
    def double_value
      
    end
    
    def double_value=(a_double)
      
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
    
    def image=(img)
      @image = img
    end
    
    def control_tint=(control_tint)
      @control_tint = control_tint
    end
    
    def control_tint
      @control_tint
    end
    
    def control_size
      @control_size
    end
    
    def control_size=(size)
      @control_size = size
    end
    
    def represented_object
      @represented_object
    end
    
    def represented_object=(obj)
      @represented_object = obj
    end
    
    def cell_attribute param
      
    end
    
    def set_cell_attribute param, to:value
      
    end
    
    def image_rect_for_bounds rect
      
    end
    
    def title_rect_for_bounds rect
      
    end
    
    def drawing_rect_for_bounds rect
      
    end
    
    def cell_size
      
    end
    
    def cell_size_for_bounds rect
      
    end
    
    def highlight_color_with_frame cell_frame, in_view:control_view
      
    end
    
    def calc_draw_info
      
    end
    
    def setup_field_editor_attributes text_obj
      
    end
    
    def draw_interior_with_frame cell_frame, in_view:control_view
      
    end
    
    def draw_with_frame cell_frame, in_view:control_view
      puts 'current context is:'
      ctx = GraphicsContext.current_context
      `#{ctx.graphics_port}.fillRect(20, 20, 100, 100);`
      `#{ctx.graphics_port}.clearRect(40, 40, 60, 60);`
    end
    
    def highlight flag, with_frame:cell_frame, in_view:control_view
      
    end
    
    def mouse_down_flags
      
    end
    
    def get_periodic_delay delay, interval:interval
      
    end
    
    def start_tracking_at start_point, in_view:control_view
      
    end
    
    def continue_tracking last_point, at:current_point, in_view:control_view
      
    end
    
    def stop_tracking last_point, at:stop_point, in_view:control_view, mouse_is_up:flag
      
    end
    
    def track_mouse the_event, in_rect:cell_frame, of_view:control_view, until_mouse_up:flag
      
    end
    
    def edit_with_frame rect, in_view:control_view, editor:text_obj, delegate:an_obj, event:the_event
      
    end
    
    def select_with_frame rect, in_view:control_view, editor:text_obj, delegate:an_obj, start:sel_start, length:sel_length
      
    end
    
    def end_editing text_obj
      
    end
    
    def reset_cursor_rect cell_frame, in_view:control_view
      
    end
    
    def menu=(menu)
      @menu = menu
    end
    
    def menu
      @menu
    end
    
    def menu_for_event event, in_rect:cell_frame, of_view:view
      
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
    
    def truncates_last_visible_line?
      @truncates_last_visible_line
    end
    
    def truncates_last_visible_line= (flag)
      @truncates_last_visible_line = flag
    end
    
    
    
    # 
    # Keyboard UI stuff
    # 
    
    def refuses_first_responder= flag
      @refuses_first_responder = flag
    end
    
    def refuses_first_responder?
      @refuses_first_responder
    end
    
    def accepts_first_responder?
      @accepts_first_responder
    end
    
    def shows_first_responder= flag
      @shows_first_responder = flag
    end
    
    def shows_first_responder?
      @shows_first_responder
    end
    
    def perform_click sender
      
    end
    
    
    def focus_ring_type= type
      @focus_ring_type = type
    end
    
    def focus_ring_type
      @focus_ring_type
    end
    
    def self.default_focus_ring_type
      
    end
    
    
    # 
    # Attributed string methods
    # 
    
    def attributed_string_value
      
    end
    
    def attributed_string_value= obj
      
    end
    
    def allows_editing_text_attributes?
      @allows_editing_text_attributes
    end
    
    def allows_editing_text_attributes= flag
      @allows_editing_text_attributes = flag
      imports_graphics = false unless flag
    end
    
    def imports_graphics?
      @imports_graphics
    end
    
    def imports_graphics= flag
      @imports_graphics = flag
      @allows_editing_text_attributes = true if flag
    end
    
    
    # 
    # Cell state
    # 
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
    
    
    def background_style
      @background_style
    end
    
    def background_style= style
      @background_style = style
    end  
  end # end cell  
end
