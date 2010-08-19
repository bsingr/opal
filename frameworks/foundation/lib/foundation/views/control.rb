# 
# control.rb
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

require 'foundation/views/view'

module CherryKit
  
  class Control < View
    
    display_attributes :enabled, :selected, :highlighted, :control_size
    
    attr_writer :enabled, :highlighted, :selected
    
    attr_accessor :value
    
    # Managing the control size. Valid values are
    # 
    # :mini, :small, :regular, :large
    # 
    attr_accessor :control_size
    
    # Expose our value binding
    # 
    # expose_binding :value
    
    # Expose our enabled binding
    # 
    # expose_binding :enabled
    
    def highlighted?
      @highlighted
    end
    
    def enabled?
      @enabled
    end
    
    def selected?
      @selected
    end
    
    def initialize
      super
      
      @selected = false
      @highlighted = false
      @control_size = :regular
      @enabled = true
    end
    
    def dup
      result = super
      result.enabled = enabled?
      
      result
    end
    
    # ==================
    # = Event handling =
    # ==================
    
    def mouse_down(event)
      # do nothing unless we are enabled
      return unless enabled?
      # start tracking mouse otherwise
      track_mouse event
    end
    
    # Track the mouse within the control beginning with the given event (which
    # will more than likely be a :mouse_down event)
    # 
    # @param {Event} event to start tracking
    # @returns nil
    # 
    def track_mouse(event)
      # puts "tracking mouse!"
      CKApp.handle_events([:mouse_up, :mouse_dragged]) do |event|
        type = event.type
        location = event.location_in_view self
        within_frame = bounds.contains_point? location
        puts "within frame: #{location.x}, #{location.y}"
        puts "#{bounds.x}, #{bounds.y}, #{bounds.width}, #{bounds.height}"
        puts "witjing frame.....? #{within_frame}"
        # puts "event #{type.inspect}, #{location.x}, #{location.y}"
        
        if type == :mouse_down
          # puts type
          start_tracking? location
        
        elsif type == :mouse_up
          # when mouse is up, just stop tracking and post that we wish to stop
          # receiving events. simples.
          stop_tracking location
          CKApp.finish_handling_events
          
        elsif type == :mouse_moved || type == :mouse_dragged
          # we should only actually get mouse dragged events. fixc this later.
          if within_frame
            if !@tracking_was_within_frame
              start_tracking? location
            else
              continue_tracking? location
            end
          else
            stop_tracking location, false
          end
          
          # continue_tracking? location
        end
        
        @tracking_was_within_frame = within_frame
      end
    end
    
    # Should start tracking?
    # 
    # @param {Point} location (:left, :top)
    # @returns {true|false}
    # 
    def start_tracking?(location)
      # puts "start tracking.."
    end
    
    def stop_tracking(location, mouse_up)
      # puts "stop trackinhg.."
    end
    
    def continue_tracking?(location)
      # puts "continue tracking.."
    end
    
    
    # ========================
    # = Touch event tracking =
    # ========================
    
    def touches_began(touches, event)
      touch = touches[0]
      location = touch.location_in_view self
      begin_tracking_with_touch? touch, event
    end
    
    def touches_ended(touches, event)
      touch = touches[0]
      location = touch.location_in_view self
      end_tracking_with_touch touch, event
    end
    
    def touches_moved(touches, event)
      touch = touches[0]
      location = touch.location_in_view self
      continue_tracking_with_touch? touch, event
    end
    
    # =========================
    # = Tracking touch events =
    # =========================
    
    def begin_tracking_with_touch?(touch, event)
      # puts "Control#begin_tracking_with_touch?(#{touch}, #{event})"
      start_tracking? touch.location_in_view(self)
    end
    
    def continue_tracking_with_touch?(touch, event)
      continue_tracking? touch.location_in_view(self)
    end
    
    def end_tracking_with_touch(touch, event)
      stop_tracking touch.location_in_view(self)
    end
    
    def cancel_tracking_with_event(event)
      
    end
  end
end
