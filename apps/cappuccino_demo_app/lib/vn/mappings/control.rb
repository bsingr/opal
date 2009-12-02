Vienna::Mappings.map :control => :CPControl do
  
  def to_s
    stringValue
  end

  def to_i
    intValue
  end

  def to_f
    doubleValue
  end
  
  def on_action=(block)
    on_action &block
    # `rb_funcall(self, "on_action", block);`
  end
  
  def on_action(&block)
    if target
      # already has a target..
    else
      o = Object.new
      o.instance_variable_set("@action_behavior", block)
      self.target = o
      # puts o
    end
    # singleton method for action
    def o.perform_action(sender)
      @action_behavior.call
      # puts "Oh :D it works!"
    end
    
    self.action = "perform_action:"
  end
end