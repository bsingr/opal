class Symbol

  def inspect
    `return ':' + self;`
  end

  def to_s
    `return self;`
  end

  def to_sym
    self
  end

end

