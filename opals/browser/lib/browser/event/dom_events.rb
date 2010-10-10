class Event
  
  module DOMEvents
    
    # Adds the given +listener+ to the receiver for the given +event_name+.
    # More than one listeners can be added using this method, and they are 
    # called in the order that they are added as a listener.
    # 
    # Events registered through this will never use their procs return value to
    # stop propgation or bubbling, instead use the relevant methods on event.
    # 
    # @param [String, Symbol] event_name the event type to listen for
    # @param [Proc] listener the proc to deal with the event
    # @return [Element, Document] returns the receiver
    def on(event_name, &listener)
      event_class = Event
      event_name = `#{event_name.to_s}.replace(/_/g, '');`
      `var func = function(evt) {
        //console.log(#{event_class});
        evt = #{event_class}.$from_native(evt);
        var res = #{listener}.apply(#{listener}.__self__, [evt]);
      };
      
      var element = #{self}['@element'];
      if (element.addEventListener) {
        element.addEventListener(#{event_name}, func, false);
      } else {
        element.attachEvent('on' + #{event_name}, func);
      }`
      self
    end
    
    # A hash of opal event names to the browser event names. If an event is not
    # listed here, then the {#on} method simply uses the passed name (i.e. you
    # must use the actual name in your code.). This also fixes some cross 
    # browser issues (IE uses focusin instead of focus, etc)
    # %W(mouse_down mouse_up mouse_move key_down key_up key_press click).each do |rb_name|
    #   define_method(rb_name) do |&block|
    #     # on event_name, &`arguments[0]`
    #     # this should be:
    #     # 
    #     # if block_given?
    #     #   self.on event_name, &block
    #     # else
    #     #   self.fire event_name
    #     # end
    #     # 
    #     # to allow us to fire events (pretend they fired for testing???!)
    #     `if (arguments[0] && arguments[0].info & #{self}.TP) {
    #       return this.$on(#{rb_name}, arguments[0]);
    #     } else {
    #       return console.log("need to fire event: " + #{rb_name});
    #     }`
    #   end
    # end
    
  end
end

Element.include Event::DOMEvents
Document.extend Event::DOMEvents
