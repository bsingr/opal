class Symbol

  def inspect
    `return ':' + self.toString();`
  end

  def to_s
    `return self.toString();`
  end

  def to_sym
    self
  end

end

