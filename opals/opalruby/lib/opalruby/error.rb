class Exception
  
  def initialize(message = nil)
    @message = message
  end

  def message
    @message
  end
  
  def inspect
    "#<#{self.class.name}: #{self.to_s}>"
    # puts "in inspect: message is:"
    # puts @message.inspect
    # @message
  end
  
  def to_s
    @message || self.class.to_s
  end
end


class RuntimeError < Exception
  
end

class StandardError < Exception
  
end
