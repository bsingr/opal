class Time
  
  # bad form, should use instance_variable_get instead.
  attr_reader :native
  
  def self.now
    new
  end
  
  def initialize
    @native = `new Date()`
  end
  
  def to_s
    `return #{@native}.toString();`
  end
  
  def inspect
    `return #{@native}.toString();`
  end
  
  def -(other)
    `return #{@native}-#{other.native};`
  end
end
