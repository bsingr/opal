class TrueClass

  def to_s
    "true"
  end
  
  def ==(other)
    `return #{self} === #{other} ? #{true} : #{false};`
  end
  
  def &(other)
    if self
      if other
        true
      else
        false
      end
    else
      false
    end
  end
  
  def |(other)
    if self
      true
    else
      if other
        true
      else
        false
      end
    end
  end
  
  def ^(other)
    if self
      if other
        false
      else
        true
      end
    else
      if other
        true
      else
        false
      end
    end
  end
end
