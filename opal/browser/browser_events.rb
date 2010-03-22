module BrowserEvents
  
  # Adds a listener to the receiver for a native event type given by
  # <tt>event_name</tt>. The receiver is then returned.
  # 
  # <tt>event_name</tt> should be a symbol, and all valid browser DOM event 
  # types are valid. W3C names should be used, i.e. do not start event names
  # with "on"
  # 
  #     elem = Document[:my_element]
  #     elem.add_listener(:click) { puts "An element was clicked!" }
  # 
  # @param [Symbol] type the event to capture
  # @param [Proc] block the event action
  # @return [Object] the receiver
  # 
  def add_listener(type, &block)
    # instance exec block so "self" becomes the receiver
    `var f = function(evt){`
      instance_exec(`opal_event_wrap(#{Event},evt)`, &block)
    `};`
    `if(#{self}.addEventListener){#{self}.addEventListener(#{type.to_s},f,false);}`
    `else{#{self}.attachEvent('on'+#{type.to_s}, f);}`
    self
  end
  
  def remove_listener(type)
    
  end
  
end
