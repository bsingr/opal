
class Exception
  
  def message
    @message
  end
  
  def initialize(message=nil)
    @message = message
  end
  
  def inspect
    "#<#{self.class.name}: #{@message}>"
  end
  
  def to_s
    @message
  end
end


class RuntimeError < Exception
  
end

class StandardError < Exception
  
end
