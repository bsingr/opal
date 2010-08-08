# 
# event.rb
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

module CherryKit
  
  # Module to hold cherry kit additions to the event class. These additions are
  # used for custom handling of events within cherry kit applications.
  # 
  module EventAdditions
    
    # Returns the View instance that the event originated from. Basically, the
    # native target property is retreieved, and then that element is compared to
    # CherryKits hash of elements => views. The element's parentNode is
    # recursively got until the node has an id (which is used to lookup in the
    # hash table)
    # 
    # @returns {CherryKit::View} the view
    # 
    def view
      if @view
        return @view
      else
      element = `#{self}.__event__.target || #{self}.__event__.srcElement;`
      `while (element) {
        if (!element.id) {
          element = element.parentNode; 
        } else {
          break;
        }
      }`
      return @view = CherryKit::View[`#{element}.id`]
      end
    end
    
    # manually set view
    def view=(view)
      @view = view
    end
    
    # location in clinet (browser)
    # 
    # @returns {CherryKit::Point} location
    # 
    def location_in_client
      return @location_in_client if @location_in_client
      # if we have not cached it, now do it
      event = `#{self}.__event__;`
      
      # @location_in_client = { :left => `#{event}.clientX`,
                              # :top  => `#{event}.clientY` }
                              
      @location_in_client = Browser::Point.new `#{event}.clientX`, `#{event}.clientY`
    end
    
    # location of event within designated view
    # 
    def location_in_view
      offset = view.render_context.element.element_offset
      client = location_in_client
      
      Browser::Point.new(client.x - offset.x, client.y - offset.y)
    end
    
    # CherryKit window for the event
    # 
    def window
      @window ||= view.window
    end
  end
end

Browser::Event.include CherryKit::EventAdditions
