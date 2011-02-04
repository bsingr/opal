class TrueClass
  def to_s
    "true"
  end

  def &(other)
    `return other.$r ? Qtrue : Qfalse;`
  end

  def |(other)
    true
  end

  def ^(other)
    `return other.$r ? Qfalse : Qtrue;`
  end
end

TRUE = true


