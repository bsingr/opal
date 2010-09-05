# 
# dom_events.rb
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

class Event
  
  module DOMEvents
    
    # Adds the given +listener+ to the receiver for the given +event_name+.
    # More than one listeners can be added using this method, and they are 
    # called in the order that they are added as a listener.
    # 
    # @param [String, Symbol] event_name the event type to listen for
    # @param [Proc] listener the proc to deal with the event
    # @return [Element, Document] returns the receiver
    def listen(event_name, &listener)
      add_listener event_name, &listener
    end
    
    def on(event_name, &listener)
      add_listener event_name, &listener
    end
    
    # Add the given +listener+ as the ONLY listener for the +event_type+ given.
    # Adding a new listener will remove the old listener. Usually it is best to
    # use {#listen} instead of this method.
    # 
    # @param [String, Symbol] event_name the event type to listen for
    # @param [Proc] listener the proc to deal with the event
    # @return [Element, Document] returns the receiver
    def add_listener(event_name, &listener)
      event_class = Event
      `var func = function(evt) {
        //console.log(#{event_class});
        evt = #{event_class}.$from_native(evt);
        var res = #{listener}.apply(#{listener}.__self__, [evt]);
        return (res !==undefined && res.r);
      };
      
      var element = #{self}.__element__;
      if (element.addEventListener) {
        element.addEventListener(#{event_name.to_s}, func, false);
      } else {
        element.attachEvent('on' + #{event_name.to_s}, func);
      }`
      self
    end
  end
end

Element.include Event::DOMEvents
Document.extend Event::DOMEvents
