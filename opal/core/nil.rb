class NilClass
  
  def to_s
    ""
  end
  
  def inspect
    "nil"
  end
  
  def &(obj)
    false
  end
  
  def |(obj)
    obj ? true : false
  end
  
  def ^(obj)
    obj ? true : false
  end
  
  def to_a
    []
  end
  
  def to_f
    0.0
  end
  
  def to_i
    0
  end
  
  def ==(other)
    `return (#{other} === nil || #{other} === null || #{other} === undefined);`
  end
  
  def nil?
    true
  end
end
