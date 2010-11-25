class NilClass      
  def nil?
    true
  end
  
  def to_i
    0
  end
  
  def to_f
    0.0
  end
  
  def to_s
    ""
  end
  
  def to_a
    []
  end
  
  def inspect
    "nil"
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
  
  # def !()
    # true
  # end
end

NIL = nil
