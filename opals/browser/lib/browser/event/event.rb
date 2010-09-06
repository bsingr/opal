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

# Event class
class Event
  
  # Create an Event instance from the given native_event.
  # 
  # @param {Native} native_event
  # @return {Event} event
  # 
  def self.from_native(event)
    result = allocate
    `#{event} = #{event} || window.event;
    
    var type = #{event}.type,
        target = #{event}.target || #{event}.srcElement,
        code = #{event}.which || #{event}.keyCode,
        key = #{Event::KEYS}['$[]'](code);
    
    if (!key.r) {
      key = #{self}.Y(String.fromCharCode(code).toLowerCase());
    }
    
    while (target && target.nodeType == 3) {
      target = target.parentNode;
    }
    
    #{result}.__shift__ = #{event}.shiftKey ? #{true} : #{false};
    #{result}.__alt__ = #{event}.altKey ? #{true} : #{false};
    #{result}.__ctrl__ = #{event}.ctrlKey ? #{true} : #{false};
    #{result}.__meta__ = #{event}.metaKey ? #{true} : #{false};
    
    #{result}.__code__ = code;
    #{result}.__key__ = key;
    #{result}.__event__ = #{event};
    #{result}.__type__ = type;`
    result
  end
  
  # Stop the receiver from propagating.
  # 
  # @return [Event] returns receiver
  def stop_propagation
    `var evt = #{self}.__event__;
    if (evt.stopPropagation) {
      evt.stopPropagation();
    } else {
      evt.cancelBubble = true;
    }`
    self
  end
  
  # Stop the default behaviour from the event
  # 
  # @return [Event] returns the receiver
  def prevent_default
    `var evt = #{self}.__event__;
    if (evt.preventDefault) {
      evt.preventDefault();
    } else {
      evt.returnValue = false;
    }`
    self
  end
  
  # Completely stop the given event.
  # 
  # @return [Event] returns the receiver
  def stop!
    stop_propagation
    prevent_default
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
  
  # ==============
  # = Key Events =
  # ==============
  
  # Hash of associated key code numbers to their descriptors.
  KEYS = {
    8   => :backspace,
    9   => :tab,
    13  => :enter,
    27  => :escape,
    32  => :space,
    37  => :left,
    38  => :up,
    39  => :right,
    40  => :down,
    46  => :delete
  }
  
  # If the receiver was a key based event, then returns a +Symbol+ for the typed
  # key, otherwise +nil+. Special keys in +KEYS+ are represented as the symbol
  # names as the keys in the hash.
  # 
  # @return [Symbol, nil] the typed key
  def key
    `return #{self}.__key__ || #{nil};`
  end
  
  # Returns +true+ if the shift key was pressed, +false+ otherwise.
  # 
  # @return [true, false] was shift pressed
  def shift?
    `return #{self}.__shift__;`
  end
  
  # Returns +true+ if the alt key was pressed, +false+ otherwise.
  # 
  # @return [true, false] was alt pressed
  def alt?
    `return #{self}.__alt__;`
  end
  
  # Returns +true+ if the ctrl key was pressed, +false+ otherwise.
  # 
  # @return [true, false] was ctrl pressed
  def ctrl?
    `return #{self}.__ctrl__;`
  end
  
  # Returns +true+ if the meta key was pressed, +false+ otherwise.
  # 
  # @return [true, false] was meta pressed
  def meta?
    `return #{self}.__meta__;`
  end
 
end

require 'browser/event/trigger_events'
require 'browser/event/dom_events'
