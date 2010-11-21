class Symbol
  
  def inspect
    `return ":" + #{self}.__ptr__;`
  end
  
  def to_s
    `return #{self}.__ptr__;`
  end
  
  def to_sym
    self
  end
end
