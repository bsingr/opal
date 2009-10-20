# 
# window.rb
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

require 'window_view'

module Vienna
  
  WINDOW_MASKS = {
    :borderless => 0,
    :titled => 1 << 0,
    :closable => 1 << 1,
    :miniaturizable => 1 << 2,
    :resizable => 1 << 3,
    :textured_background => 1 << 8,
    :unified_title_and_toolbar => 1 << 12,
    
    # buttons
    :close_button => 1,
    :miniaturize_button => 1,
    :zoom_button => 1,
    :toolbar_button => 1,
    :document_icon_button => 1,
    
    # Panel window masks:
    :utility => 1 << 4,
    :doc_modal => 1 << 6,
    :hud => 1 << 13
  }

  WINDOW_LEVELS = {
    :normal => 0,
    :floating => 0,
    :submenu => 0,
    :torn_off_menu => 0,
    :main_menu => 0,
    :status => 0,
    
    :modal_panel => 0,
    :pop_up_menu => 0,
    :screen_saver => 0
  }

  class Window < Responder
        
    def initialize content_rect, style_mask
      super()
      
      setup_display_context
      
      @frame = Rect.new(0, 0, 0, 0)
      
      @window_number = App.add_window self
      @style_mask = style_mask
      self.level = :normal
      @min_size = Size.new(0.0, 0.0)
      @max_size = Size.new(9999.0, 9999.0)
      @first_responder = self
      @next_responder = App
            
      setup_window_view()
      
      self.frame = content_rect
      
      @window_view.needs_display = true
      
      self.content_view = View.new(Rect.new(0, 0, @frame.width, @frame.height))
    end
    
    def self.build options, &block
      win = self.new options[:frame], options[:style]      
      if block
        yield win
      end
      win
    end
    
    def setup_display_context
      @element = Element.new :div
      @display_context = RenderContext.new :div
      @element << @display_context
      Document << @element
    end
    
    # All drawing for window is actually done with the windows window_view,
    # which is also used as the root of the window hierarchy. Shadows are
    # actually drawn by the window, and nothing else is. Mouse down and
    # mouse up events are captured on the window_views' element, as anything
    # inside the window view counts as a click on the window. This avoids
    # clicks being registered for clicking on a shadow, or any window
    # padding.
    def setup_window_view
      @window_view = WindowView.new(Rect.new(0, 0, 100, 100), style_mask)
      @window_view.window = self
      @window_view.next_responder = self
      @element << @window_view.element
      
      # Events - should attach these to the windowview...all relevant elements are subviews of this,
      # and, we wont capture events outside the visible window (e.g. the shadow which might be drawn
      # on the @element)
      @window_view.element.add_event_listener :mousedown do |event|
        the_event = Event.from_native_event event, with_window:self, with_type:'left_mouse_down'
        unless the_event.allows_propagation?
          App.send_event the_event
          the_event.stop_propagation
        end
      end
      
      @window_view.element.add_event_listener :mouseup do |event|
        the_event = Event.from_native_event event, with_window:self, with_type:'left_mouse_up'
        unless the_event.allows_propagation?
          App.send_event the_event
          the_event.stop_propagation
        end
      end
    end
    
    def self.frame_rect_for_content_rect rect, style_mask:style
      
    end
    
    def self.content_rect_for_frame_rect rect, style_mask:style
      
    end
    
    def self.min_frame_width_with_title title, style_mask:style
      
    end
    
    def frame_rect_for_content_rect rect
      
    end
    
    def content_rect_for_frame_rect rect
      rect
    end
    
    
    
    def title
      @title
    end
    
    def title=(str)
      @title = str
    end
    
    def represnted_url=(str)
      
    end
    
    def represented_url
      
    end
    
    def represented_filename
      
    end
    
    def represented_filename=(filename)
      
    end
    
    def set_title_with_represented_filename filename
      
    end
    
    def excluded_from_windows_menu=(flag)
      @excluded_from_windows_menu = flag
    end
    
    def excluded_from_windows_menu?
      @excluded_from_windows_menu
    end
    
    # Set the content view for the window
    # 
    def content_view=(view)
      # @content_view.remove_from_superview if @content_view
      view.view_will_move_to_window self
      bounds = Rect.new(0, 0, @frame.size.width, @frame.size.height)
      @content_view = view
      @content_view.frame = content_rect_for_frame_rect(bounds)
      view.view_did_move_to_window
      @window_view << @content_view
    end
    
    def content_view
      @content_view
    end
    
    def << view
      @content_view << view
    end
    
    def delegate=(obj)
      @delegate = obj
    end
    
    def delegate
      
    end
    
    def window_number
      @window_number
    end
    
    def style_mask
      @style_mask
    end
    
    def style_mask=(mask)
      @style_mask = mask
    end
    
    def field_editor create_flag, for_object:obj
    
    end
    
    def end_editing_for obj
      
    end
    
    
    
    def content_size= size
      
    end
    
    def frame_top_left_point= point
      
    end
    
    def cascade_top_left_from_point point
      
    end
    
    def frame
      @frame
    end
    
    def frame=(frame)
      # puts 'SETTING frame YALL'
      set_frame frame, display:true, animate:false
    end
    
    def set_frame frame_rect, display:flag
      set_frame frame_rect, display:flag, animate:false
    end
    
    
    def set_frame frame_rect, display:flag, animate:animate_flag
      if animate_flag
        # `throw Window#SetFrame animate not yet implemented`
      else
        # normal set_Frame
        origin = @frame.origin
        size = @frame.size
        new_origin = frame_rect.origin
        new_size = frame_rect.size
        
        puts 'about to check!!!!!!!!!!!!!'
        puts `origin.$iv_tbl`
        puts '..'
        puts `new_origin.$iv_tbl`
        # Origin changes
        unless origin.eql? new_origin
          puts 'Origins are not the same!'
          origin.x = new_origin.x
          origin.y = new_origin.y
          @element.origin = origin
          
          NotificationCenter.default_center.post_notification_name 'window did move', object:self
        end
        
        # Size changes
        unless size.eql? new_size
          puts 'Sizes are not the same!'
          # need to check max/min size conformance
          size.width = new_size.width
          size.height = new_size.height
          @window_view.frame_size = size
          @element.size = size
          
          NotificationCenter.default_center.post_notification_name 'window did resize', object:self
        end
      end
    end
    
    
    def frame_origin= origin
      
    end
    
    def animation_resize_time new_frame
      
    end
    
    def in_live_resize?
      
    end
    
    def shows_resize_indicator=(show)
      @shows_resize_indicator = show
    end
    
    def shows_resize_indicator?
      @shows_resize_indicator
    end
    
    def resize_increments=(increments)
      @resize_increments = increments
    end
    
    def resize_incremenets
      @resize_increments
    end
    
    def aspect_ratio=(ratio)
      @aspect_ratio = ratio
    end
    
    def aspect_ratio
      @aspect_ratio
    end
    
    def display
      # do displaying....
    end
    
    def preserves_content_during_live_resize?
      @preserves_content_during_live_resize
    end
    
    def preserves_content_during_live_resize=(flag)
      @preserves_content_during_live_resize = flag
    end
    
    def update
      
    end
    
    def make_first_responder responder
      
    end
    
    def first_responder
      
    end
    
    def resize_flags
      
    end
    
    def key_down the_event
      
    end
    
    def close
      
    end
    
    def released_when_closed= flag
      @released_when_closed = flag
    end
    
    def released_when_closed?
      @released_when_closed
    end
    
    def miniaturize sender
      
    end
    
    def deminiaturize sender
      
    end
    
    def zoomed?
      @zoomed
    end
    
    def zoom sender
      
    end
    
    def miniaturized?
      @miniaturized
    end
    
    def try_to_perform action, with:object
      
    end
    
    def background_color= color
      @background_color = color
    end
    
    def background_color
      @background_color
    end
    
    def movable= (flag)
      @movable = flag
    end
    
    def movable?
      @movable
    end
    
    def movable_by_window_background=(flag)
      @movable_by_window_background
    end
    
    def movable_by_window_background?
      @movable_by_window_background
    end
    
    def hides_on_deactivate=(flag)
      @hides_on_deactivate = flag
    end
    
    def hides_on_deactivate?
      @hides_on_deactivate
    end
    
    
    
    
    def center
      
    end
    
    def make_key_and_order_front(sender)
      
    end
    
    def order_front(sender)
      
    end
    
    def order_back(sender)
      
    end
    
    def order_out(sender)
      
    end
    
    def order_window place, relative_to:other_win
      
    end
    
    def order_front_regardless
      
    end
    
    
    
    def document_edited=(flag)
      @document_edited = flag
    end
    
    def document_edited?
      @document_edited
    end
    
    def visible?
      @visible
    end
    
    def key_window?
      @key_window
    end
    
    def main_window?
      @main_window
    end
    
    def can_become_key_window?
      
    end
    
    def can_become_main_window?
      
    end
    
    def make_key_window
      
    end
    
    def make_main_window
      
    end
    
    def become_key_window
      
    end
    
    def become_main_window
      
    end
    
    def resign_key_window
      
    end
    
    def resign_main_window
      
    end
    
    
    
    
    def works_when_modal?
      
    end
    
    
    
    def convert_base_to_screen point
      
    end
    
    def convert_screen_to_base point
      # puts 'in here convert_screen_to_base'
      res = Point.new(point.x - @frame.x, point.y - @frame.y)
      # puts res
      res
    end
    
    def perform_close sender
      
    end
    
    def perform_miniaturize sender
      
    end
    
    def perform_zoom sender
      
    end
    
    
    
    def level=(level)
      @level = level
      @element.css :z_index => WINDOW_LEVELS[level]
    end
    
    def level
      @level
    end
    
    def has_shadow=(flag)
      @has_shadow = flag
    end
    
    def has_shadow?
      @has_shadow
    end
    
    
    
    def min_size
      @min_size
    end
    
    def max_size
      @max_size
    end
    
    def min_size=(size)
      @min_size = size
    end
    
    def max_size=(size)
      @max_size = size
    end
    
    
    
    def next_event_matching_mask mask
      
    end
    
    def post_event event, at_start:flag
      
    end
    
    def current_event
      @current_event
    end
    
    def accepts_mouse_moved_events=(flag)
      @accepts_mouse_moved_events = flag
    end
    
    def accepts_mouse_moved_events?
      @accepts_mouse_moved_events
    end
    
    def ignores_mouse_events=(flag)
      @ignores_mouse_events = flag
    end
    
    def ignores_mouse_events?
      @ignores_mouse_events
    end
    
    def send_event event
      point = event.location_in_window
      
      case event.type
      when :key_up
        puts 'key_up'
      when :key_down
        puts 'key_down'
      when :left_mouse_down
        hit_test = @window_view.hit_test(point)
        # puts hit_test.class_name
        hit_test.mouse_down event
        # if hit_test != @first_responder && hit_test.accepts_first_responder
        #   make_first_responder hit_test
        # end
        # 
        # if self.key_window?
        #   return hit_test.mouse_down event
        # else
        #   self.make_key_and_order_front self
        #   return hit_test.mouse_down event
        # end
      when :left_mouse_up
        puts 'left_mouse_up'
      when :left_mouse_dragged
        puts 'left_mouse_dragged'
      when :scroll_wheel
        puts 'scroll_wheel'
      when :right_mouse_down
        puts 'right_mouse_down'
      when :right_mouse_up
        puts 'right_mouse_up'
      when :right_mouse_dragged
        puts 'right_mouse_dragged'
      end
    end
    
    def window_controller
      @window_controller
    end
    
    def window_controller= controller
      @window_controller = controller
    end
    
    
    
    def sheet?
      @sheet
    end
    
    def attatched_sheet
      @attached_sheet
    end
    
    
    
    def add_child_window win, ordered:place
      
    end
    
    def remove_child_window win
      
    end
    
    def child_windows
      @child_windows
    end
    
    def parent_window
      @parent_window
    end
    
    def parent_window= win
      @parent_window = win
    end
    
    
    
    def graphics_context
      @graphics_context
    end
    
    
    
    def initial_first_responder= view
      @initial_first_responder = view
    end
    
    def initial_first_responder
      @initial_first_responder
    end
    
    def select_next_key_view sender
      
    end
    
    def select_previous_key_view sender
      
    end
    
    def select_key_view_following_view view
      
    end
    
    def select_key_view_preceding_view view
      
    end
    
    def autorecalculates_key_view_loop flag
      @autorecalculates_key_view_loop = flag
    end
    
    def autorecalculates_key_view_loop?
      @autorecalculates_key_view_loop
    end
    
    def recalculate_key_view_loop
      
    end
    
    
    
    def toolbar= toolbar
      @toolbar = toolbar
    end
    
    def toolbar
      @toolbar
    end
    
    def toggle_toolbar_shown sender
      
    end
    
    def run_toolbar_customization_palette sender
      
    end
    
    def shows_toolbar_button= show
      @shows_toolbar_button
    end
    
    def shows_toolbar_button?
      @shows_toolbar_button
    end
  end
end
