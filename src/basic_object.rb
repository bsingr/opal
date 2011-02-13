class BasicObject
  def initialize
    # ...
  end

  def ==(other)
    `if (self == other) return Qtrue;
    return Qfalse;`
  end

  def equal?(other)
    self == other
  end
end

