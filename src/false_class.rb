class FalseClass

  def to_s
    "false"
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

#FALSE = false

