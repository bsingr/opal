class Event
  
  # Take a browser based event and wrap it in Ruby glory. Uses window.event for
  # some IE browsers.
  # 
  # klass is the class to use. Event is used by default, but custom classes for
  # custom frameworks might wish to extend the klass for certain event types.
  # 
  `window.opal_event_wrap=function(klass, event){`
    `var r=rb_obj_alloc(klass);`
    `r.iv_tbl['@native']=event||window.event;`
    `return r;`
  `};`
  
  def initialize
    raise "Events cannot be manually created."
  end
  
  # Will return <tt>true</tt> if the alt key was pressed during the event, 
  # <tt>false</tt> otherwise
  # 
  # @return [Boolean]
  # 
  def alt?
    `return #{@native}.altKey;`
  end
  
  # Will return <tt>true</tt> if the shift key was pressed during the event, 
  # <tt>false</tt> otherwise
  # 
  # @return [Boolean]
  #
  def shift?
    `return #{@native}.shiftKey;`
  end
  
  # Will return <tt>true</tt> if the ctrl key was pressed during the event, 
  # <tt>false</tt> otherwise
  # 
  # @return [Boolean]
  #
  def ctrl?
    `return #{@native}.ctrlKey;`
  end
  
  # Will return <tt>true</tt> if the meta key was pressed during the event, 
  # <tt>false</tt> otherwise
  # 
  # @return [Boolean]
  #
  def meta?
    `return #{@native}.metaKey;`
  end
end
