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

module Browser
  
  # Event class
  class Event
    
    def self.listen(element, event_name, &block)
      `var eventName = #{event_name.to_s};
      var elem = #{element}.__element__;
      
      var listener = function(evt) {
        var native = #{self}.$from_native(evt);
        
        var result = #{block}.__fun__(native);
        
        if (!result.r) {
          evt.preventDefault();
          evt.stopPropagation();
        }
      };
      
      if (elem.addEventListener) {
        elem.addEventListener(eventName, listener, false);
      }
      else if (elem.attachEvent) {
        elem.attachEvent("on" + eventName, listener)
      }
      else {
        throw "Unknown elem attach type for #{element}";
      }`
      
      self
    end
  
    
    # Create an Event instance from the given native_event.
    # 
    # @param {Native} native_event
    # @returns {Event} event
    # 
    def self.from_native(native_event)
      event = allocate
      `#{event}.__event__ = #{native_event};`
      event
    end
    
    # Type of event, as a symbol. Here we convert the actual event type into a 
    # symbol, and also rename some ie only events into more w3c friendly events.
    # 
    def type
      if @type
        return @type
      else
        @type = `vnY(#{self}.__event__.type)`
        return @type
      end
    end
    
    # Allow event type to be overridden. This only sets the type for our
    # abstraction: the native event type is not altered
    # 
    # @param {Symbol} event_type for the event
    # 
    def type=(event_type)
      @type = event_type
    end
    
    KEY_CODES = {
      8   => :delete,
      9   => :tab,
      13  => :return
    }
    
    # Return the key representation of the keycode
    # 
    # @returns {Symbol} key
    # 
    def key
      return @key if @key
      @key = KEY_CODES[key_code]
    end
    
    def key_code
      event = `#{self}.__event__`
      `return #{event}.keyCode || #{event}.which;`
    end
  end
end