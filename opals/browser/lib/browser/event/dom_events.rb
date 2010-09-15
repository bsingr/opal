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
    def on(event_name, &listener)
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
    
    # Add methods for our core event names
    %W(mousedown mouseup mousemove).each do |event_name|
      define_method(event_name) do |&block|
        # on event_name, &`arguments[0]`
        # this should be:
        # 
        # if block_given?
        #   self.on event_name, &block
        # else
        #   self.fire event_name
        # end
        # 
        # to allow us to fire events (pretend they fired for testing???!)
        `if (arguments[0] && arguments[0].info & #{self}.TP) {
          return this.$on(#{event_name}, arguments[0]);
        } else {
          return console.log("need to fire event: " + #{event_name});
        }`
      end
    end
    
  end
end

Element.include Event::DOMEvents
Document.extend Event::DOMEvents
