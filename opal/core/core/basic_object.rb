class BasicObject
  
  def initialize
    
  end
  
  def ==(other)
    `#{self}==#{other}` ? true : false
  end
  
  def equal?(other)
    `#{self}==#{other}` ? true : false
  end
  
  def !
    self ? false : true
  end
  
  def !=(other)
    self == other ? false : true
  end
  
end
