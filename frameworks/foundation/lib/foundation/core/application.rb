# 
# application.rb
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

module CherryKit
  
  # Main Application class to control the lifetime and control flow of events
  # through a cherry kit application. Custom behaviour can be setup through
  # the application delegate, which by default is the custom AppController 
  # class. 
  # 
  # Notifications
  # -------------
  # 
  # On setting the delegate, the delegate is automatically registered to receive
  # all of the following notifications on the presumtion that it has a method
  # named the same as the notification name. Any methods that are not 
  # implemented will simply not receive the relevant notification. All 
  # notifications and methods are optional, but application_did_finish_launching
  # is highly recomended as it is the best/required place to setup the 
  # application GUI.
  # 
  # :application_will_finish_launching - sent when the application is nearly
  #   ready to run, but before any global events are registered. This is a
  #   suitable place to perform any additional tasks before the DOM is likely to
  #   be ready.
  # 
  # :application_did_finish_launching - sent once the DOM has been setup and all
  #   relevant events are in place. This is a suitable time to load the main
  #   interface for the application by loading some windows, or using the 
  #   Builder class and its related methods.
  # 
  class Application < Responder
    
    # The application delegate.
    # 
    attr_reader :delegate
    
    def initialize
      # an array of all our windows
      @windows = []
      # hash of our touch identifiers to the touches themselves.
      @touches = {}
      # hash of views to an array of touch identifiers
      @touches_for_views = {}
    end
    
    # Register the window for the application
    def register_window(window)
      @windows << window
    end
    
    # Set the application delegate. This method will register the delegate for
    # all notification messages that it has a defined method for.
    # 
    # @param {Object} delegate to set
    # @returns delegate
    # 
    def delegate=(delegate)
      @delegate = delegate
      
      center = NotificationCenter.default_center
      
      notifications = [
        :application_will_finish_launching,
        :application_did_finish_launching
      ]
      
      notifications.each do |notification|
        if delegate.respond_to? notification
          center.add_observer delegate, notification, notification, self
        end
      end
    
      delegate      
    end
    
    # Run the application.
    def run
      RunLoop.run do
        # body class names for css etc
        setup_body_class_names
        # global application
        Object.const_set('CKApp', self)      
        # initial notification that we will finish launching (before events)
        notify :application_will_finish_launching
        # setup/create all event handlers
        setup_event_handlers
        # we can post our did finish launching once we have all our events setup
        notify :application_did_finish_launching
      end
    end
    
    def setup_body_class_names
      body = Browser::Element.body
      if Browser.safari?
        body.class_name = 'safari'
      elsif Browser.opera?
        body.class_name = 'opera'
      elsif Browser.msie?
        # also set ie7, ie6, ie8 respectively?
        body.class_name = 'msie'
      end
    end
    
    def setup_event_handlers
      # touch based events..
      listen_for Browser.document, :touchstart, :touchmove, :touchend, :touchcancel
      # standard mouse events
      listen_for Browser.document, :mousedown, :mouseup, :mousemove
      
      listen_for Browser.document, :keydown, :keyup, :keypress
      
      # browser window resizing
      listen_for Browser.window, :resize
      
      # browser dependant focus/blur events
      if Browser.msie?
        # event_handler Browser.document, :focusin
        # event_handler Browser.document, :focusout
      else
        # event_handler Browser.window, :focus
        # event_handler Browser.window, :blur
      end
    end
    
    def listen_for(target, *events)
      events.each do |event|
        Browser::Event.listen target, event, __send__("on_#{event}")
      end
    end
    
    # Dispatch the event
    # 
    # @param {CherryKit::Event} event to send
    # @returns nil
    # 
    def send_event(event)
      # keep track of our current event
      @current_event = event
      # if we have an event handler registered, delegate events to that
      if @event_handler
        event.view = @event_handler_view
        RunLoop.run do
          `#{@event_handler}.__fun__(#{event});`
        end
      else
        # send event within a runloop block so that all action calls etc are
        # caught, as well as view display requests, so we can run them on
        # completion of sending the event
        RunLoop.run do
          # puts "============= sending event on within runloop!"
          # puts event.type
          # return
          # # `console.log(#{event});`
          # puts "view for event is: #{event.view}"
          # puts "window for event is: #{event.window}"
          res = event.window.send_event event
          # puts "res is #{res}"
          res
        end
      end
    end
    
    # Set a block delegate for dealing with all events matching the given event
    # array. Any other event will simply be ignored until the removal of this
    # block.
    # 
    # Note
    # ----
    # This method will also pass the current event to the block, so in the
    # following example, the mouse_down event will be passed as well.
    # 
    # Usage
    # -----
    # 
    #     app.handle_events([:mouse_down, :mouse_dragged]) do |event|
    #       puts "got new event #{event}"
    #     end
    # 
    # @param {Proc} block
    # 
    def handle_events(events, &block)
      @event_handler = block
      @event_handler_events = events
      @event_handler_view = @current_event.view
      # resend current event
      `#{@event_handler}.__fun__(#{@current_event});`
    end
    
    # Discard event capture.
    # 
    def finish_handling_events
      @event_handler = nil
      @event_handler_events = nil
      @event_handler_view = nil
    end
    
    # Get the array for the view, or make it if it does not exist
    def touches_for_view(view)
      if @touches_for_views[view]
        @touches_for_views[view]
      else
        @touches_for_views[view] = []
      end
    end
    
    def setup_touch_began(touch, event)
      touch_hierarchy = []
      view = touch.view
      # get all views in hierarchy
      `while(#{view}.r) {
        #{touch_hierarchy}.unshift(#{view});
        #{view} = #{view.superview};
      }`
      
      capturing_view = nil
      to_try = nil
      
      # find first view that will capture_touches? .. if any
      `for (var i = 0; i < #{touch_hierarchy}.length; i++) {
        #{to_try} = #{touch_hierarchy}[i];
        if (#{to_try.capture_touches?}.r) {
          #{capturing_view} = #{to_try};
          break;
        }
      }`
      
      if capturing_view
        touch.view = capturing_view
      else
        touch.view = event.view
      end
      
      # puts "touch hierarchy is #{touch_hierarchy.inspect}"
      # puts "capturing view is #{capturing_view}"
    end
    
    # When the user touches their finger on the document.
    def on_touchstart
      proc do |event|
        RunLoop.run do
          # puts "touchstart!"
          touches = event.changed_touches
          touches.each do |touch|
            # keep track of this touch (with identifier)
            @touches[touch.identifier] = touch
            # assign the event for the touch
            touch.event = event
            # touch.view = event.view
            # puts "touch began #{touch.identifier}"
            setup_touch_began touch, event
            # we have our right view, so make sure that we can send events to it
            # i.e. is it multi touch enabled? cannot send more than one touch
            # to non multi touch views
            view = touch.view
            view_touches = touches_for_view(view)
            
            if view.multiple_touch_enabled?
              puts "can send event!"
              view_touches << touch.identifier
              touch.view.touches_began(touches, event)
            else
              # puts "#{view} is not multi touch friendly"
              if view_touches.length > 0
                # puts "need to drop touch: multitouch not enabled for view"
                puts "touch_start: #{touch.identifier} being dropped"
              else
                view_touches << touch.identifier
                puts "touch_start: #{touch.identifier} sending!"
                touch.view.touches_began(touches, event)
              end
            end
          end

          # puts event.changed_touches
          # puts event.view
          
          false
        end
      end
    end
    
    def on_touchend
      proc do |event|
        
        RunLoop.run do
          touches = event.changed_touches
          touches.each do |touch|
            entry = @touches[touch.identifier]
            
            if @touches_for_views[entry.view].include? touch.identifier
              puts "sending touchend for #{entry.identifier}"
              entry.event = event
              entry.view.touches_ended(touches, event)
              @touches_for_views[entry.view].delete touch.identifier
            else
              # drop event otherwise
              # puts "dropping touch end for #{entry.identifier}"
            end
          end
        end
        
        false
      end
    end
    
    def on_touchmove
      proc do |event|
        RunLoop.run do
          # hash of views => touches for that view
          view_touches = {}
          touches = event.changed_touches
          touches.each do |touch|
            entry = @touches[touch.identifier]
            
            unless entry
              raise "Application: touchmove: unknown touch #{touch.identifier}"
            end
            
            if @touches_for_views[entry.view].include? touch.identifier
              entry.event = event

              view_array = view_touches[entry.view]

              unless view_array
                view_array = view_touches[entry.view] = []
              end

              view_array << touch

              entry.view.touches_moved(touches, event)
            else
              # puts "dropping move event for touch #{touch.identifier}"
            end
            
          end
        end

        false
      end
    end
    
    def on_touchcancel
      proc do |event|
        puts "touchcancel!"
        true
      end
    end
    
    # Handles the window's 'resize' event. This method simply posts out 
    # notifications to alert receivers that the browser window, i.e. screen
    # space is being adjusted. By default, every window will listen for these
    # notifications so that they can resize and /or move to suit
    # 
    # @param {Browser::Event} event from browser
    # @returns self
    # 
    def on_resize
      proc do |event|
        
      end
    end
    
    def on_keydown
      proc do |event|
        event.type = :key_down
        # puts "sending keydown event for #{event.key_code} for #{event.key}"
        res = send_event event
        # puts "on_keydown handler result is #{res}"
        res
      end
    end
    
    def on_keyup
       proc do |event|
         event.type = :key_up
         # puts "sending keyup event for #{event.key_code} for #{event.key}"
         send_event event
       end
     end
    
    def on_keypress
       proc do |event|
         event.type = :key_down
         # puts "sending keypress event for #{event.key_code} for #{event.key}"
         return true
       end
     end
    
    def on_mousemove
      proc do |event|
        # must make ruby friendly name - should check if mouse_dragged
        event.type = :mouse_moved
        # puts "mouse moved!"
        send_event event
        
        true
      end
    end
    
    # Handles raw events from the browser for mousedown
    # 
    # @param [Browser::Event] event received
    # @returns self
    # 
    def on_mousedown
      proc do |event|
        # begin
        # first we rename the event to our ruby friendly name
          event.type = :mouse_down
          @mouse_down_view = view = event.view
          window = view.window
          # get current first responder
          first_responder = window.first_responder
          # make the view the first responder (if it accepts it)
          if view != first_responder && view.accepts_first_responder?
            window.make_first_responder? view
          end
        
          send_event event
        # rescue Exception => e
          # puts "exception occured within Application#on_mousedown"
          # raise e
        # end
        
        true
      end
    end
    
    # Handles raw mouseup events from browser
    # 
    # @para, [Browser::Event] event received
    # @returns self
    # 
    def on_mouseup
      proc do |event|
        event.type = :mouse_up
        send_event event
        
        true
      end
    end

  end
end
