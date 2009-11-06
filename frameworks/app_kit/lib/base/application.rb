# 
# application.rb
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
  
  # Application notifications
  APP_WILL_FINISH_LAUNCHING = 'APP_WILL_FINISH_LAUNCHING'
  APP_DID_FINISH_LAUNCHING = 'APP_DID_FINISH_LAUNCHING'
  APP_DID_CHANGE_SCREEN_PARAMETERS = 'APP_DID_CHANGE_SCREEN_PARAMETERS'
  
  # Run loop modes
  RUN_LOOP_MODES = {
    :normal => 0,
    :modal_panel => 1,
    :event_tracking => 2
  }
  
  class Application
        
    attr_accessor :windows, :event_queue, :views_needing_display
    attr_reader :delegate
    
    def initialize
      # super
      @windows = []
      @event_queue = []
      @views_needing_display = []
      
      @delegate = nil
      @run_loop_mode = :normal
    end
    
    def run_loop_mode
      @run_loop_mode
    end
    
    # Event capture bindings
    def bind_events types, &block
      @run_loop_mode = :event_tracking
      @event_binding_mask = types
      @event_binding_block = block
      @event_binding_window = self.current_event.window
      
      # We can capture mouse movements if needed
      # puts 'types:'
      # puts types
      if types.include? :left_mouse_dragged
        # puts 'Addng mouse moved!'
        Document.add_event_listener :mousemove do |evt|
          the_event = Event.from_native_event evt, with_window:nil, with_type: :left_mouse_dragged
          send_event the_event
        end
      end
    end
    
    def unbind_events
      @run_loop_mode = :normal
      
      # Remove mouse mvoed event listener
      if @event_binding_mask.include? :left_mouse_dragged
        Document.remove_event_listener :mousemove
      end
    end
    
    def current_event
      @current_event
    end
    
    def send_event the_event
      @current_event = the_event
      # key events
      
      # event binding
      if @run_loop_mode == :event_tracking
        if @event_binding_mask.include? the_event.type
          # some events might not have their window set..
          the_event.window = @event_binding_window
          @event_binding_block.call the_event
        end
        return # if not, ignore event
      end
      
      # All other cases, send to window (should only likely be key events)
      the_event.window.send_event the_event      
    end
      
    # Mark view as needing display at the end of the current run loop
    # 
    def mark_view_for_display view, flag
      unless @views_needing_display.contains? view
        @views_needing_display << view
      end
    end
    
    # Redraw every 'dirty' view
    # 
    def display_required_views
      @views_needing_display.each do |view|
        view.draw_rect()
      end
      @views_needing_display = []
    end
    
        
    # Add window
    # 
    def add_window(window)
      # @windows << window
      0
    end
    
    def <<(window)
      add_window window
    end
    
    # Get shared app
    # 
    def self.shared_application
      @app ||= self.new()
    end
  
    # Set App delegate
    # 
    def delegate=(obj)
      return if @delegate == obj

      nc = VN::NotificationCenter.default_center
          
      if @delegate
        nc.remove_observer @delegate, name:APP_WILL_FINISH_LAUNCHING, object:self
        nc.remove_observer @delegate, name:APP_DID_FINISH_LAUNCHING, object:self
        nc.remove_observer @delegate, name:APP_DID_CHANGE_SCREEN_PARAMETERS, object:self
      end
    
      @delegate = obj
    
      if @delegate.respond_to? :will_finish_launching
        nc.add_observer @delegate, selector:'will_finish_launching', name:APP_WILL_FINISH_LAUNCHING, object:self
      end
            
      if @delegate.respond_to? :did_finish_launching
        nc.add_observer @delegate, selector:'did_finish_launching', name:APP_DID_FINISH_LAUNCHING, object:self
      end
    end
  
  
    def running?
      true
    end
  
    def finish_launching
      # force at the moment, this should detect runtime environment: browser or desktop
      ENV[:platform] = :browser
      
      if @run_block
        @run_block.call self
      end
                
      Document.add_event_listener :mousedown do |evt|
        if App.run_loop_mode == :event_tracking
          the_event = Event.from_native_event evt, with_window:nil, with_type: :left_mouse_down
          send_event the_event
        end
      end
      
      Document.add_event_listener :mouseup do |evt|
        if App.run_loop_mode == :event_tracking
          the_event = Event.from_native_event evt, with_window:nil, with_type: :left_mouse_up
          send_event the_event
        end
      end
      
      nc = NotificationCenter.default_center
      nc.post_notification_name APP_WILL_FINISH_LAUNCHING, object:self
      nc.post_notification_name APP_DID_FINISH_LAUNCHING, object:self
    end
  
    def run (&block)
      @run_block = block
    end
    
    def send_action(action, to:target, from:sender)
      # puts 'in app, sending action #{action}'
      if action && target
        target.perform_selector(action, with_object:sender)
      end
    end
  end
  `console.log('this pare');`
  # Vienna::App
  App = Application.shared_application
  `console.log('ermmm');`
end

# Attach events to window to capture finished loading...
`window.onload = function() {`
	VN::App.finish_launching
`};`
