# 
# view.rb
# vienna
# 
# Created by Adam Beynon.
# Copyright 2010 Adam Beynon.
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

require 'foundation/core/responder'
require 'foundation/core/builder'

module CherryKit
  
  class View < Responder
    
    # Get the layout hash from the receiver (Hash)
    attr_accessor :layout
    
    # the view's window
    attr_reader :window
    
    def initialize(frame)
      # initialize
      # default layout
      @layout = {
        :left   => 0,
        :top    => 0,
        :right  => 0,
        :bottom => 0
      }
      # all of our subviews
      @subviews = []
      
      # for every display property defined, we add an observer when it changes,
      # so we can tell the view that it needs a redisplay
      self.class.all_display_attributes.each do |property|
        self.observe(property) do |oldvalue, newvalue|
          self.needs_display = true
        end
      end
    end
    
    # For duplicating views. This will duplicate all relevant properties.
    # Subclasses should do their own behaviour. Does NOT copy subviews,
    # superview or window
    # 
    def dup
      result = self.class.new
      result.layout = layout
      
      result
    end
    
    # ======================
    # = Display attributes =
    # ======================
    
    def self.all_display_attributes
      if CherryKit::View == self
        return @display_attributes ||= []
      else
        @display_attributes ||= []
        return @display_attributes + superclass.all_display_attributes
      end
    end
    
    # Add each of the given display properties to the array of properties for
    # this class
    def self.display_attributes(*properties)
      @display_attributes ||= []
      @display_attributes = @display_attributes + properties
    end
    
    # Set each of the given class names (strings) to the array of class names
    # which will all be added together with superclass' to build up the full
    # class name. (e.g. CK::Control will be 'ck-view ck-control')
    # 
    def self.class_names(*names)
      # puts "setting class names to #{names.inspect} for #{self}"
      @css_class_names = names
    end
    
    def self.all_class_names
      # puts "looking for #{self} with #{@css_class_names.inspect}"
      if CherryKit::View == self
        return @css_class_names ||= []
      else
        @css_class_names ||= []
        return ([] + superclass.all_class_names) + @css_class_names
      end
    end
    
    display_attributes :visible, :layout
    
    class_names 'ck-view'
    
    # Return the theme name to use for the view. In all systems, root_theme is
    # used as the default. To use another theme, set the theme_name property for
    # the window when created so that all subviews will inherit that theme.
    # 
    # @returns {Symbol} theme name
    # 
    def theme_name
      :root_theme
    end
    
    # Returns the receivers container view
    # 
    # @returns [View] containing view
    # 
    def superview
      @superview
    end
    
    def render_context
      @render_context
    end
    
    def create_render_context
      return @render_context if @render_context
      
      render_context = RenderContext.new tag_name      
      render_with_render_context render_context
      
      @render_context = render_context
    end
    
    def render_with_render_context(render_context)
      __update_renderer
            
      # if we have set renderer.. might not always be set (root view etc)
      if @renderer
        @renderer.render render_context
      end
      
      if @renderer
        update_renderer
      end
    end
    
    def visible?
      true
    end
    
    # Bounds of the view. This often needs to be recalculated based on css
    # layout etc.
    # 
    # @returns {Browser::Rect} rect bounds
    def bounds
      Browser::Rect.new 0, 0, `#{render_context.element}.__element__.clientWidth`, `#{render_context.element}.__element__.clientHeight`
    end
    
    # Update the renderer. We assume we have our render context, so we just need
    # to make sure we have our actual renderer available (usually from a theme)
    def __update_renderer
      if @renderer
        # puts "need to call on renderer to update"
      else
        __create_renderer
      end
    end
    
    # create the renderer - private method that calls actual create_renderer
    def __create_renderer
      # find the right theme
      theme = Theme.find_theme theme_name
      
      unless theme
        raise "Cannot find theme named #{theme_name}"
      end
      
      # the renderer for our custom view. Our renderer might be nil. The base
      # view for example does not create a renderer, so do not always assume
      # that one will exist
      @renderer = create_renderer theme
    end
    
    # create the renderer just for this view.
    # 
    # @param {CherryKit::Theme} theme to create renderer from
    # @returns {CherryKit::Renderer} renderer
    # 
    def create_renderer(theme)
      theme.view self
    end
    
    def update_renderer
      # puts "updating"
      if @renderer
        @renderer.update
      end
    end
    
    # Root element tag_name used for building the responder context. Should be a
    # Symbol. Default is <tt>:div</tt>
    # 
    # @returns {Symbol} tag name
    # 
    def tag_name
      :div
    end
  
    
    # NEVER EVER call this method directly. This will create and / or update
    # the rendering context as needed
    # 
    def display
      # puts "Displaying init"
      if @render_context
        # if we already have our render context, just update it
        # if @renderer
          # @renderer.update
        # end
        update_renderer
      else
        # puts "need to create render context"
        render_context = create_render_context
        @superview.render_context.element << render_context.element
      end
    end
    
    def <<(subview)
      add_subview subview
    end
    
    # Add subview
    # 
    # @param {CherryKit::View} view to append as subview
    # @returns {self}
    # 
    def add_subview(subview)
      # inform subview that it must first remove itself from its superview
      subview.remove_from_superview
      # privately set the window to our current window
      subview._window = @window
      # notify subview that it is soon to move to this view
      subview.will_move_to_superview self
      # set private superview variable on subview
      subview.instance_variable_set :@superview, self
      # do DOM manipulation here
      @subviews << subview
      # reset responder chain for subview
      subview.next_responder = self
      # alert subview that its move is complete
      subview.did_move_to_superview self
      # any callbacks that might be ndded
      did_add_subview subview
    end
    
    # Remove the receiver from its current superview
    # 
    def remove_from_superview
      
    end
    
    # Perform additonal actions once the subview has been added to the 
    # receiver
    # 
    # @param {CherryKit::View} subview that was added
    # @returns {nil}
    # 
    def did_add_subview(subview)
      # nothing by default
    end
    
    # Called when the receiver is about to move to the given superview
    # 
    # @param {CherryKit::View} view to move to
    # 
    def will_move_to_superview(superview)
      # nothing by default
    end
    
    # Called when the receiver has just moved to the given superview. Default 
    # action is to simply call self.needs_display which marks this view as 
    # needing display. This should always be called in a custom overridden
    # method, or just use super().
    # 
    # @param {CherryKit::View} view that is now the superview
    # 
    def did_move_to_superview(superview)
      self.needs_display = true
    end
    
    # Marks the receiver as needing displaying (rendering). Windows are in
    # charge of calling renderers etc as needed, so this method simply
    # registers itself with its window as needing display.
    # 
    # @param {true|false} needs_displaying
    # 
    def needs_display=(needs_displaying)
      # puts "======= needs_display"
      # we should only mark ourself as needing display if we have a window
      if @window
        RunLoop.current_run_loop.add_task self, :display
      end
    end
    
    # Sets the window for the view. This method should never be directly called.
    # Instead, use <tt><<</tt> to add the view to another view within the window
    # hierarchy.
    # 
    # @private
    # 
    # @param {CherryKit::Window} window to set
    # 
    def _window=(window)
      # puts "setting window to #{window} for #{self}"
      # if we already belong to the window, just return
      return if @window == window
      # callback
      will_move_to_window window
      
      @window = window
      
      # mark ourselves as needing redisplay (before our subviews are)
      self.needs_display = true
      
      # inform each subview that we are all moving
      @subviews.each do |subview|
        subview._window = window
      end
      
      # second callback
      did_move_to_window window
    end
    
    # Callback informing the receiver that it is about to join the new window
    # 
    # @param {CherryKit::Window} window to join
    # 
    def will_move_to_window(window)
      # do nothing by default
    end
    
    # Inform the receiver that it has joined the new window
    # 
    # @param {CherryKit::Window} window just joint
    # 
    def did_move_to_window(window)
      # do nothing by default
    end
    
    # ==========
    # = Events =
    # ==========
    
    # IF the view should capture all touches (instead of allowing subviews to),
    # then return true. Default is false. ScrollView, for example, returns true
    # 
    def capture_touches?
      false
    end
    
    # ===================
    # = Handling events =
    # ===================
    
    # Handle mouse down. Default implementation simply calls super(), which 
    # passes the event back up to CK::Responders implementation which passes the
    # event onto the next_responder
    # 
    # @param {Browser::Event}
    # 
    def mouse_down(event)
      super event
    end
    
    # ================
    # = Touch Events =
    # ================
    def touches_began(touches, event)
      puts "#{self}#touches_began"
    end
    
    def touches_ended(touches, event)
      puts "#{self}#touches_ended"
    end
    
    def touches_moved(touches, event)
      puts "#{self}#touches_moved"
    end
    # 
    # def touched_cancelled(touches, event)
    #   
    # end
    
    
    # ==================================
    # = Register views to DOM id names =
    # ==================================
    def self.[]=(id, view)
      (@view_ids ||= {})[id] = view
    end
    
    def self.[](id)
      @view_ids[id]
    end
  end
end
