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
    
    # Boolean whether or not the view can receive multi-touch events. Default
    # is false. If false (default), then the view is only sent details of the
    # first touch in the view, all other touches will be ignored within CKApp
    # and not passed to this view.
    # 
    # @getter multiple_touch_enabled?
    # 
    # @attribute {true|false} multiple_touch_enabled
    # 
    attr_writer :multiple_touch_enabled
    
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
      
      # by default only receive single touches
      @multiple_touch_enabled = false
      
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
    
    # NEVER EVER call this method directly. This will create and / or update
    # the rendering context as needed
    # 
    def display
      if @render_context
        update
      else
        render_context = create_render_context
        # first call .render(), then immediately update() it
        render render_context
        update
        # add to super
        @superview.render_context.element << render_context.element
      end
    end
    
    # Create the render_context based on the theme and create_renderer()
    def create_render_context
      return @render_context if @render_context
      
      render_context = RenderContext.new tag_name            
      theme = Theme.find_theme theme_name
      # unless we could find the theme, throw an error - theme must exist
      theme or raise "Cannot find theme named #{theme_name}"
      # get our renderer. unless overridden, this will be theme::View renderer
      @renderer = create_renderer theme
      
      @render_context = render_context
    end
    
    # Create the renderer just for this view. The default action is to create
    # a simple view renderer. In this case, the most likely behaviour is that
    # .render() and .update() of this view should be overridden for rendering
    # custom views/data etc
    # 
    # @param {CherryKit::Theme} theme to create renderer from
    # @returns {CherryKit::Renderer} renderer
    # 
    def create_renderer(theme)
      theme.view self
    end
    
    # Core method for the initial render of the view. This method is passed the
    # render context that we render to. The default behaviour is to simply call
    # on the @renderer to render itself in the given context. Any view that does
    # not have a themed renderer should use this method instead and MUST call
    # super()
    # 
    # @param {CherryKit::RenderContext} render_context to render to
    # @returns nil
    # 
    def render(render_context)
      @renderer.render render_context
    end
    
    # Core method for updating the view. This is called immediately after render
    # and also everytime the view needs an update (self.needs_display=true).
    # Again the default behaviour is to simply call .update() on the @renderer,
    # but non themed views may simply have their own code here for updating, 
    # but as before, MUST call super() to allow the default ViewRenderer do its
    # business
    # 
    # @returns nil
    # 
    def update
      @renderer.update
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

    
    # Root element tag_name used for building the responder context. Should be a
    # Symbol. Default is <tt>:div</tt>
    # 
    # @returns {Symbol} tag name
    # 
    def tag_name
      :div
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
    
    # Can the view receive multiple touches: true or false
    def multiple_touch_enabled?
      @multiple_touch_enabled
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
