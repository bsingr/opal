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
      @windows = []
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
        # global application
        Object.const_set('CKApp', self)      
        # get the system notification center
        center = NotificationCenter.default_center
        # will finish launching notification before we attach all events etc
        center.post_notification :name   => :application_will_finish_launching,         
                                 :sender => self

        # notify :application_will_finish_launching

        # setup/create all event handlers
        setup_event_handlers

        # notify :application_did_finish_launching

        # we can post our did finish launching once we have all our events setup
        center.post_notification :name   => :application_did_finish_launching, 
                                 :sender => self
      end
    end
    
    def setup_event_handlers
      # standard mouse events
      listen_for Browser.document, :mousedown, :mouseup, :mousemove
      
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
        Browser::Event.listen target, event, __send__("#{event}_handler")
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
          event.window.send_event event
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
    
    # Handles the window's 'resize' event. This method simply posts out 
    # notifications to alert receivers that the browser window, i.e. screen
    # space is being adjusted. By default, every window will listen for these
    # notifications so that they can resize and /or move to suit
    # 
    # @param {Browser::Event} event from browser
    # @returns self
    # 
    def resize_handler
      proc do |event|
        
      end
    end
    
    def mousemove_handler
      proc do |event|
        # must make ruby friendly name - should check if mouse_dragged
        event.type = :mouse_moved
        # puts "mouse moved!"
        send_event event
      end
    end
    
    # Handles raw events from the browser for mousedown
    # 
    # @param [Browser::Event] event received
    # @returns self
    # 
    def mousedown_handler
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
      end
    end
    
    # Handles raw mouseup events from browser
    # 
    # @para, [Browser::Event] event received
    # @returns self
    # 
    def mouseup_handler
      proc do |event|
        event.type = :mouse_up
        send_event event
      end
    end

  end
end
