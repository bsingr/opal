# 
# view.rb
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
  
  # Auto resixzing masks
  # ====================
  # :none   
  # :width
  # :height
  # :min_x 
  # :min_y 
  # :max_x 
  # :max_y 
  
  # Border masks
  # ============
  # :none
  # :line
  # :bezel
  # :groove
  
  
  class View < Responder
    
    
    def initialize(frame)
      puts 'initialising view'
      # super frame
      super()
      setup_display_context
      
      @frame = Rect.new(100, 100, 100, 100)
      @bounds = Rect.new(0, 0, 100, 100)
      
      @subviews = []
      @window = nil
      @superview = nil
      
      @posts_frame_changed_notifications = false
      @autoresizes_subviews = true
      
      # Tracking areas for mouse events. Important to intiialize early, so views
      # can set up tracking as soon as they like
      @tracking_areas = []
    end
    
    def element
      @element
    end
    
    # Override to force a mode for drawing/rendering. Default is to follow suit
    # from Vienna.drawing_mode, but some classes may like to force a mode
    # regardless of system context. For example, TextField always renders for
    # efficiency, and some complex views may only be able to draw, not render
    def display_mode
      Vienna.display_mode
    end
    
    def setup_display_context
      # Currently force views to use drawing based display
      setup_drawing_context
    end
    
    def setup_drawing_context
      @element = Element.element_with_type :div, class_name:'', id:''
      @display_element = Element.element_with_type :canvas, class_name:'', id:''
      @element << @display_element
    end
    
    def setup_render_context
      @element = Element.element_with_type :div, class_name:'', id:''
      @display_element = Element.element_with_type :div, class_name:'', id:''
      @element << @display_element
    end
    
    def graphics_port
      `return #{@display_element.element}.getContext('2d');`
    end
    
    # Called when View.from_coder(coder) is called
    # - This does not call initialize at any point
    def initialize_with_coder coder
      
    end
        
    # Called when View.from_builder(builder) is called
    # - This does not call initialize at any point
    def initialize_with_builder builder
      
    end
    
    def self.display_properties
      # add to constant DISPLAY_PROPERTIES, but, also add in superclass'
      # should be a class variable?
      puts 'in display properties..'
    end
    
    display_properties :frame, :frame_size
    
    def did_change_value_for_key
      # we must override super in here..
      # call super
      # then if the key contains a val from DISPLAY_PROPERTIES, then we need
      # to re draw the view
    end
    
    def window
      
    end
    
    def superview
      
    end
    
    def subviews
      
    end
    
    def descendant_of?(a_view)
      
    end
    
    def ancestor_shared_with_view(a_view)
      
    end
    
    def opaque_ancestor
      
    end
    
    def hidden=(flag)
      
    end
    
    def hidden?
      
    end
    
    def hidden_or_has_hidden_ancestor?
      
    end
    
    def view_did_hide
      
    end
    
    def view_did_unhide
      
    end
    
    def subviews=(new_subviews)
      
    end
    
    def add_subview(a_view)
      if @subviews.include? a_view
        return
      end
      
      a_view.remove_from_superview
      a_view.view_will_move_to_superview self
      a_view.view_will_move_to_window @window
      
      @subviews << a_view
      
      # add element to our own
      @element << a_view.element
      
      a_view.next_responder = self
      a_view.view_did_move_to_superview
      a_view.view_did_move_to_window
      did_add_subview self
    end
    
    def <<(a_view)
      add_subview a_view
    end
    
    def add_subview(a_view, positioned:place, relative_to:other_view)
      
    end
    
    def view_will_move_to_window win
      @window = win
    end
    
    def view_did_move_to_window
      
    end
    
    def view_will_move_to_superview new_super
      @superview = new_super
    end
    
    def view_did_move_to_superview
      
    end
    
    def did_add_subview subview
      
    end
    
    def will_remove_subview subview
      
    end
    
    def remove_from_superview
      
    end
    
    def replace_subview old_view, with:new_view
      
    end
    
    def posts_frame_changed_notifications= flag
      
    end
    
    def posts_frame_changed_notifications?
      
    end
    
    def resize_subviews_with_old_size size
      
    end
    
    def resize_with_old_superview_size old
      
    end
    
    def autoresizes_subviews=(flag)
      
    end
    
    def autoresizes_subviews?
      
    end
    
    def autoresizing_mask=(mask)
      
    end
    
    def autoresizing_mask
      
    end
    
    # 
    # Frame
    #
    def frame_origin=(new_origin)

      @frame.x = new_origin.x
      @frame.y = new_origin.y
      @element.origin = new_origin
      
      if @posts_frame_changed_notifications
        nc = NotificationCenter.default_center
        nc.post_notification_name 'frame chnage notification', object:self
      end
    end
    
    def frame_size=(new_size)
      
      old_size = Size.new(@frame.width, @frame.height)
            
      @frame.size.width = new_size.width
      @frame.size.height = new_size.height
      
      # bounds
      @bounds.size.width = new_size.width
      @bounds.size.height = new_size.height      
      # bound end
      
      self.resize_subviews_with_old_size(old_size) if @autoresizes_subviews
      self.needs_display = true
      
      @element.size = new_size
      @display_element.size = new_size
    
      if @posts_frame_changed_notifications
        nc = NotificationCenter.default_center
        nc.post_notification_name 'frame chnage notification', object:self
      end          
    end
    
    def frame=(frame)
      frame = Rect.new(100, 100, 100,100)
      self.frame_origin = frame.origin
      self.frame_size = frame.size
      
      if @posts_frame_changed_notifications
        nc = NotificationCenter.default_center
        nc.post_notification_name 'view chnages notification', object:self
      end
    end
    
    def frame
      @frame
    end
    
    def frame_rotation=(angle)
      
    end
    
    def frame_rotation
      @frame_rotation
    end
    
    def frame_center_rotation=(angle)
      
    end
    
    def frame_center_rotation
      
    end
    
    # 
    # Bounds
    # 
    
    def bounds_origin=(new_origin)
      
    end
    
    def bounds_size=(new_size)
      
    end
    
    def bounds_rotation=(angle)
      
    end
    
    def bounds_rotation
      
    end
    
    def translate_origin_to_point translation
      
    end
    
    def rotate_by_angle angle
      
    end
    
    def bounds=(bounds)
      
    end
    
    def bounds
      @bounds
    end

    
    
    def flipped?
      
    end
    
    def rotated_from_base?
      
    end
    
    def rotated_or_scaled_from_base?
      
    end
    
    def opaque?
      
    end
    

    
    def convert_point point, from_view:view
      
    end
    
    def convert_point point, to_view:view
      
    end
    
    def convert_size size, from_view:view
      
    end
    
    def convert_size size, to_view:view
      
    end
    
    def convert_rect rect, from_view:view
      
    end
    
    def convert_rect rect, to_view:view
      
    end


    
    def convert_point_to_base point
      
    end
    
    def convert_point_from_base point
      
    end
    
    def convert_size_to_base size
      
    end
    
    def convert_size_from_base size
      
    end
    
    def convert_rect_to_base rect
      
    end
    
    def convert_rect_from_base rect
      
    end

   
    def can_draw?
      
    end
    
    # Clear the whole view for display - i.e. draw everything from scratch - remove any clipping
    def needs_display=(flag)
      @needs_display = flag
      
      # FIXME: this shouldnt be done here
      # puts 'drawing rect!'
      # puts bounds.to_s
      
      graphics_context = @window.graphics_context
      GraphicsContext.current_context = graphics_context
      graphics_context.graphics_port = self.graphics_port
      puts 'now showing graphics context'
      puts graphics_context
      
      draw_rect bounds
    end
    
    
    # Clear the given rect, and set clipping to this rect as well
    def needs_display_in_rect invalid_rect
      @needs_display
    end
    
    def needs_display?
      @needs_display
    end
    
    def lock_focus
      
    end
    
    def unlock_focus
      
    end
    
    def self.focus_view
      
    end
    
    def visible_rect
      
    end
   
    
    
    def display
      if @needs_display
        # display
      end
    end
    
    def draw_rect rect
      puts 'drawing rect'
    end
    
    def view_will_draw
      
    end


    
    def hit_test point
      
    end
    
    def mouse point, in_rect:rect
      
    end
    
    
    # TODO: Force depreciate these? tracking_areas are more useful than these 'legacy' methods
    # ----------------------------------------------------------------------------------------
    # # Returns a tag to use for reference... this could be our unique reference for the DOM
    # def add_tracking_rect rect, owner:an_object, user_data:data, assume_inside:flag
    #   
    # end
    # 
    # def remove_tracking_rect tag
    #   
    # end
    
    def add_tracking_area tracking_area
      # Only attatch events if there are no current tracking areas. It is expensive to needlesly add new event handlers
      if @tracking_areas.empty?
        # for now, assume maximum of 1 tracking_area, and that it covers entire view. Adding more
        # to parts of the view can be done later, but for now, one area to resive events.
        @element.add_event_listener :mouseover, `function() { console.log('OMG, mouse over!'); }`
        @element.add_event_listener :mouseout, `function() { console.log('OMG, mouse out of the element!'); }`
      end
      
      @tracking_areas << tracking_area    
    end
    
    def remove_tracking_area tracking_area
      
    end
    
    def tracking_areas
      @tracking_areas
    end
    
    def update_tracking_areas
      
    end
  end
end
