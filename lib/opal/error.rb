class Exception
  
  def initialize(message = nil)
    @message = message
  end

  def message
    @message
  end
  
  def inspect
    "#<#{self.class.name}: #{self.to_s}>"
  end
  
  def to_s
    @message || self.class.to_s
  end
end


class RuntimeError < Exception
  
end

class StandardError < Exception
  
end
