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
      puts "creating application"
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
            
      center = NotificationCenter.default_center
      
      center.post_notification :name => :application_will_finish_launching, :sender => self
      
      
      listen_on Browser.document, :mousedown, :mouseup
      
      listen_on Browser.window, :resize
      
      if Browser.msie?
        listen_on Browser.document, :focusin, :focusout
      else
        listen_on Browser.window, :focus, :blur
      end
      
      center.post_notification :name => :application_did_finish_launching, :sender => self
    end
    
    # Register self to become the event handler for each of the given event
    # names, on the given element.
    # 
    #     self.listen_on Browser.body, :mousedown, :mouseup
    # 
    # Callbacks are named 'on_event_name', so for example, the receiver for
    # the mousedown event must respond to "on_mousedown". Note, these events
    # purely match the browser event names, and are not parallel to cherrykit
    # view event names (which would be mouse_down for example.)
    # 
    # @param [Browser::Element] element
    # @param [Array] events
    # @returns self
    # 
    def listen_on(element, *events)
      # add events for each passed event name
      events.each do |event|
        Browser::Event.add element, event, self, "on_#{event}"
      end
      
      self
    end
    
    # Handles the window's 'resize' event. This method simply posts out 
    # notifications to alert receivers that the browser window, i.e. screen
    # space is being adjusted. By default, every window will listen for these
    # notifications so that they can resize and /or move to suit
    # 
    # @param {Browser::Event} event from browser
    # @returns self
    # 
    def on_resize(event)
      puts "Browser did resize"
      false
    end
    
    # Handles raw events from the browser for mousedown
    # 
    # @param [Browser::Event] event received
    # @returns self
    # 
    def on_mousedown(event)
      puts "Application received mousedown event!"
    end
    
    # Handles raw mouseup events from browser
    # 
    # @para, [Browser::Event] event received
    # @returns self
    # 
    def on_mouseup(event)
      puts "Application received mouseup event!"
    end
    
    # Handles raw events from browser when the browser window comes into focus
    # 
    # @param [Browser::Event] event received
    # @returns self
    # 
    def on_focus(event)
      puts "Window now in focus"
    end
    
    # Internet Explorer's version of on_focus
    # 
    # @param [Browser::Event] event received
    # @returns self
    # 
    def on_focusin(event)
      on_focus event
    end
    
    def on_blur(event)
      
    end
    
    # Internet Explorer's on_blur
    # 
    def on_focusout(event)
      on_blur event
    end
  end
end
