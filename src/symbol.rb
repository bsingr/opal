class Symbol

  def inspect
    `return ':' + self.$ptr;`
  end

  def to_s
    `return self.$ptr;`
  end

  def to_sym
    self
  end

end

