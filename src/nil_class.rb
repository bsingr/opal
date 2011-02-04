class NilClass
  
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

  def nil?
    true
  end

  def &(other)
    false
  end

  def |(other)
    `return other.$r ? Qtrue : Qfalse;`
  end

  def ^(other)
    `return other.$r ? Qtrue : Qfalse;`
  end
end

NIL = nil

