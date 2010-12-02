# The Event class wraps the native javascript element, whilst normalizing
# attribute differences that occur cross browser. Most of the functionality and
# properties are accessible through the instances of this class.
# 
# Creating Event Instances
# ========================
# 
# It is not normal to manually create instances of this class, as instead when
# events enter the opal environment, they are converted into {Event} instances
# through {Event.from_native}.
class Event
  # Create an Event instance from the given native_event.
  # 
  # @param [Native] native_event
  # @return [Event] event
  def self.from_native(event)
    `#{result = allocate};
    #{event} = #{event} || window.event;
    
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
    
    #{result}['@shift'] = #{event}.shiftKey ? #{true} : #{false};
    #{result}['@alt'] = #{event}.altKey ? #{true} : #{false};
    #{result}['@ctrl'] = #{event}.ctrlKey ? #{true} : #{false};
    #{result}['@meta'] = #{event}.metaKey ? #{true} : #{false};
    
    #{result}.__code__ = code;
    #{result}.__key__ = key;
    #{result}.__event__ = #{event};
    #{result}.__type__ = type;
    
    #{result}.__target__ = target;
    
    return #{result};`
  end
  
  # Returns the {Element} that initiated the receiver.
  # 
  # @return {Element}
  def target
    @target ||= Element.from_native `#{self}.__target__`
  end
  
  # Stop the receiver from propagating (bubbling) up the tree of DOM elements,
  # preventing any parent elements with handlers getting notified of the event.
  # 
  # {#propagation_stopped?} can be used to detect whether this method has been
  # called or not.
  # 
  # @return [Event] returns receiver
  def stop_propagation
    `#{@propagation_stopped = true};
    var evt = #{self}.__event__;
    if (evt.stopPropagation) {
      evt.stopPropagation();
    } else {
      evt.cancelBubble = true;
    }
    return #{self};`
  end
  
  # Returns `true` if {#stop_propagation} was called on the receiver, `false`
  # otherwise.
  # 
  # @example
  #   @document[:test_a].click do |event|
  #     event.propagation_stopped?  # => false
  #     event.stop_propagation
  #     event.propagation_stopped?  # => true
  #   end
  # 
  # @return [Boolean]
  def propagation_stopped?
    @propagation_stopped ? true : false
  end 
  
  # Calling this method will prevent the default of the action being triggered.
  # 
  # For example, calling this method for clicking anchor links will prevent the
  # browser actually taking the user to the new URL. {#default_prevented?} can
  # be used to check if the receiver has had this message called on it.
  # 
  # @example HTML
  #   !!!plain
  #   <a id="test_a" href="some/new/page.html">Click me!</a>
  # 
  # @example Ruby
  #   Document[:test_a].click do |event|
  #     event.prevent_default
  #   end 
  # 
  # @return [Event] returns the receiver
  def prevent_default
    `#{@default_prevented = true};
    var evt = #{self}.__event__;
    if (evt.preventDefault) {
      evt.preventDefault();
    } else {
      evt.returnValue = false;
    }
    return #{self};`
  end
  
  # Returns `true` if {#prevent_default} was called on the receiver, `false`
  # otherwise.
  # 
  # @example
  #   Document[:test_a].click do |event|
  #     event.default_prevented?  # => false
  #     event.prevent_default
  #     event.default_prevented?  # => true
  #   end
  # 
  # @return [Boolean]
  def default_prevented?
    @default_prevented ? true : false
  end
  
  # Completely stop the given event. This method will stop the event from both
  # propagating, and will prevent its default.
  # 
  # @return [Event] returns the receiver
  def kill
    stop_propagation
    prevent_default
  end
  
  # Returns the location of the event within the client as a point.
  # 
  # @return [Point]
  def location_in_client
    Point.new `#{self}.__event__.clientX`, `#{self}.__event__.clientY`
  end
  
  # Type of event, as a symbol. Here we convert the actual event type into a 
  # symbol, and also rename some ie only events into more w3c friendly events.
  # 
  # @example
  #   Document[:a_div].mouse_down do |event|
  #     puts event.type.inspect 
  #   end
  # 
  #   # => :mouse_down
  # 
  # @return [Symbol]
  def type
    `if (#{@type} !== #{nil}) return #{@type};
    var match, type = #{self}.__event__.type;
    if (match = type.match(/^(mouse|key|touch)(.*)$/)) {
      type = match[1] + "_" + match[2];
    }
    return #{@type = `#{self}.Y(type)`};`
  end
  
  # Allow event type to be overridden. This only sets the type for our
  # abstraction: the native event type is not altered.
  # 
  # @param [Symbol] type for the event
  def type=(type)
    @type = type
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
    @shift
  end
  
  # Returns +true+ if the alt key was pressed, +false+ otherwise.
  # 
  # @return [true, false] was alt pressed
  def alt?
    @alt
  end
  
  # Returns +true+ if the ctrl key was pressed, +false+ otherwise.
  # 
  # @return [true, false] was ctrl pressed
  def ctrl?
    @ctrl
  end
  
  # Returns +true+ if the meta key was pressed, +false+ otherwise.
  # 
  # @return [true, false] was meta pressed
  def meta?
    @meta
  end
  
end

require 'browser/event/trigger_events'
require 'browser/event/dom_events'
