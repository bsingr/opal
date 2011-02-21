class Regexp
  def inspect
    `return self.toString();`
  end

  def ==(other)
    `return self.toString() === other.toString() ? Qtrue : Qfalse;`
  end

  def eql?(other)
    self == other
  end

  def match(pattern)
    nil
  end
end
