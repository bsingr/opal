class FalseClass

  def to_s
    "false"
  end
  
  def ==(other)
    `return #{self} === #{other} ? #{true} : #{false};`
  end
  
  def &(other)
    false
  end
  
  def |(other)
    other ? true : false
  end
  
  def ^(other)
    other ? true : false
  end
end

FALSE = false