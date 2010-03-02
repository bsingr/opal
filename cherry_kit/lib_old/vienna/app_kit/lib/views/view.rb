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
  
  # Auto resizing masks
  # ====================
  # :none   
  # :width
  # :height
  # :min_x 
  # :min_y 
  # :max_x 
  # :max_y 
  AUTO_RESIZING_MASKS = {
    :none       => 0x00,
    :min_x      => 0x01,
    :width      => 0x02,
    :max_x      => 0x04,
    :min_y      => 0x08,
    :height     => 0x10,
    :max_y      => 0x20
  }
  
  # Border masks
  # ============
  # :none
  # :line
  # :bezel
  # :groove
  
  
  class View < Responder
    
    def initialize(frame)
      # super frame
      super()
      setup_display_context
      @frame = frame
      # puts "yeaappapapa"
      # puts frame
      @bounds = Rect.new(0, 0, frame.width, frame.height)
      self.frame = frame
      
      @subviews = []
      @window = nil
      @superview = nil
      
      @posts_frame_changed_notifications = false
      @autoresizes_subviews = true
      @autoresizing_mask = []
      
      # Tracking areas for mouse events. Important to intiialize early, so views
      # can set up tracking as soon as they like
      @tracking_areas = []
    end
    
    def init_with_coder(coder)
      super coder
      setup_display_context
      view_flags = coder.decode_int :view_flags
      
      @autoresizing_mask = []
      resize_mask = view_flags & 0x3F
      # go through, and check each of our masks against possible values. If so, add
      # to our 'rubified' masks array
      AUTO_RESIZING_MASKS.each do |sym, mask|
        if (resize_mask & mask).nonzero?
          # puts sym.to_s
          @autoresizing_mask << sym
        end
      end
      
      @autoresizes_subviews = (view_flags & 0x100).nonzero? ? true : false
      # puts "view resizing: #{@autoresizes_subviews}"
      
      @frame = Rect.new(0, 0, 0, 0)
      @frame = coder.decode_rect :frame if coder.has_key?(:frame)
      @bounds = Rect.new(0, 0, @frame.width, @frame.height)
      
      @posts_frame_changed_notifications = false
      @tracking_areas = []
      
      @subviews = []
      subviews = coder.decode_object :subviews
      
      if subviews
        subviews.each do |subview|
          self << subview
          # subview.superview = self
        end
      end
      
      self.frame = @frame
      
    end
    
    def self.build options, &block
      view = self.new(options[:frame]) 
      if block
        yield view
      end
      view
    end
    
    def element
      @element
    end
    
    def display_mode
      # ENV[:display_mode]
      :render
    end
    
    def setup_display_context
      if display_mode == :render
        @element = Element.new :div, nil
        @element.css :overflow => 'hidden'
        @display_context = RenderContext.new :div, nil
        @element << @display_context
      else
        @element = Element.new :div
        @display_context = GraphicsContext.new
        @element << @display_context
      end
    end
    
    def accepts_first_mouse the_event
      true
    end
    
    def accepts_first_responder
      true
    end
    
    def graphics_port
      `return #{@display_context.element}.getContext('2d');`
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
      # puts 'in display properties..'
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
      @subviews
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
      # puts "adding subview"
      if @subviews.include? a_view
        # puts "i already have this view!"
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
      @subviews.each do |s|
        s.view_will_move_to_window win
      end
    end
    
    def view_did_move_to_window
      # puts self
      # puts "a"
      @subviews.each do |s|
        # puts "b"
        s.view_did_move_to_window
      end
      # puts "c"
      self.needs_display = true
      # puts "d"
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
      if @superview
        @superview.subviews.delete(self)
        @superview.element.remove(@element)
      end
    end
    
    def replace_subview old_view, with:new_view
      
    end
    
    def posts_frame_changed_notifications= flag
      
    end
    
    def posts_frame_changed_notifications?
      
    end
    
    def resize_subviews_with_old_size(size)
      @subviews.each do |subview|
        subview.resize_with_old_superview_size(size)
      end
    end
    
    def resize_with_old_superview_size(old)
      super_frame = @superview.frame
      this_frame = @frame.copy
      origin_changed = false
      size_changed = false
      mask = @autoresizing_mask

      # x dimensions
      if mask.include?(:min_x)
        if mask.include?(:width)
          if mask.include?(:max_x)
            this_frame.x = this_frame.x + ((super_frame.width - old.width) / 3)
            this_frame.width = this_frame.width + ((super_frame.width - old.width) / 3)
          else
            this_frame.x = this_frame.x + ((super_frame.width - old.width) / 2)
            this_frame.width = this_frame.width + ((super_frame.width - old.width) / 2)
          end
          
          size_changed = true
          origin_changed = true
        
        elsif mask.include?(:max_x)
          this_frame.x = this_frame.x + ((super_frame.width - old.width) / 2)
          origin_changed = true
        else
          this_frame.x = this_frame.x + (super_frame.width - old.width) / 2
          origin_changed = true
        end
      
      elsif mask.include?(:width)
        if mask.include?(:max_x)
          this_frame.width = this_frame.width + ((super_frame.width - old.width) / 2)
        else
          this_frame.width = this_frame.width + (super_frame.width - old.width)
        end
        size_changed = true
      end
      

      
      # y dimensions
      if mask.include?(:min_y)
        if mask.include?(:height)
          if mask.include?(:max_y)
            this_frame.y = this_frame.y + ((super_frame.height - old.height) / 3)
            this_frame.height = this_frame.height + ((super_frame.height - old.height) / 3)
          else
            this_frame.y = this_frame.y + ((super_frame.height - old.height) / 2)
            this_frame.height = this_frame.height + ((super_frame.height - old.height) / 2)
          end
          
          size_changed = true
          origin_changed = true
        
        elsif mask.include?(:max_y)
          this_frame.y = this_frame.y + ((super_frame.height - old.height) / 2)
          origin_changed = true
        else
          this_frame.y = this_frame.y + (super_frame.height - old.height) / 2
          origin_changed = true
        end
      
      elsif mask.include?(:height)
        if mask.include?(:max_y)
          this_frame.height = this_frame.height + ((super_frame.height - old.height) / 2)
        else
          this_frame.height = this_frame.height + (super_frame.height - old.height)
        end
        size_changed = true
      end

      if size_changed || origin_changed
        self.frame = this_frame
      end
    end
    
    def autoresizes_subviews=(flag)
      @autoresizes_subviews = flag
    end
    
    def autoresizes_subviews?
      @autoresizes_subviews
    end
    
    def autoresizing_mask=(mask)
      if mask.is_a?(Array)
        # puts "setting array"
        # puts mask
        @autoresizing_mask = mask
      else
        # puts 'setting other'
        @autoresizing_mask = [mask]
      end
    end
    
    def autoresizing_mask
      @autoresizing_mask
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
      
      @bounds.size.width = new_size.width
      @bounds.size.height = new_size.height
      
      self.needs_display = true
      
      @element.size = new_size
      @display_context.size = new_size
      
      if @autoresizes_subviews
        resize_subviews_with_old_size(old_size)
      end
    
      if @posts_frame_changed_notifications
        nc = NotificationCenter.default_center
        nc.post_notification_name 'frame chnage notification', object:self
      end          
    end
    
    def frame=(frame)
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
    

    
    def convert_point(point, from_view:view)
      # no view means no parent view, just return point
      return convert_point_from_base(point) unless view
      
      Point.new(point.x - @frame.x, point.y - @frame.y)
    end
    
    def convert_point point, to_view:view
      
    end
    
    def convert_size size, from_view:view
      
    end
    
    def convert_size size, to_view:view
      
    end
    
    def convert_rect rect, from_view:view
      
    end
    
    def convert_rect(rect, to_view:view)
      
    end


    
    def convert_point_to_base point
      
    end
    
    def convert_point_from_base(point)
      if @superview
        return @superview.convert_point_from_base(Point.new(point.x - @frame.x, point.y - @frame.y))
      else
        return point
      end
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
      return unless @window
      
      
      display
    end
    
    
    # Clear the given rect, and set clipping to this rect as well
    def needs_display_in_rect invalid_rect
      @needs_display
    end
    
    def needs_display?
      @needs_display
    end
    
    def lock_focus
      RenderContext.current_context = @display_context
      GraphicsContext.current_context = @display_context
      unless display_mode == :render
        `#{@display_context.graphics_port}.clearRect(0, 0, #{bounds.width}, #{bounds.height});`
      else
        # @display_context.inner_html = ""
      end
    end
    
    def unlock_focus
      
    end
    
    def self.focus_view
      
    end
    
    def visible_rect
      
    end
   
    
    
    def display
      return unless @window
      view_will_draw
      if display_mode == :render
        # puts 'Rendering....?'
        lock_focus
        RenderContext.current_context = @display_context
        render @display_context
        @display_context.first_time = false
        unlock_focus
      else
        # graphics_context = @window.graphics_context
        GraphicsContext.current_context = @display_context
        # graphics_context.graphics_port = self.graphics_port
        
        draw_rect bounds
      end
    end
    
        
    
    def render(context)    
      # Default imp: just fill the element with the given background color
      # if background_color
      # end
    end
    
    
    def draw_rect rect
      # puts 'drawing rect'
    end
    
    def view_will_draw
      
    end


    
    def hit_test point
      # puts self.class.name
      # puts @superview
      point = convert_point point, from_view:@superview
      # puts "#{point.x}, #{point.y}"
      return nil unless point.in_rect?(bounds)
      count = @subviews.length
      # puts "subviews: #{count}"
      i = 0

      `for (i = 0; i < count; i++) {`
        view_to_check = @subviews[i]
        hit_test = view_to_check.hit_test(point)
        return hit_test if hit_test
      `}`
      
      self
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
        # to parts of the view can be done later, but for now, one area to resive events
        @element.add_event_listener :mouseover do |evt|
          # puts 'OMG, mouse over!'
        end
        
        @element.add_event_listener :mouseout do |evt|
          # puts 'OMG, mouse out of element'
        end
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
