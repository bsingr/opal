class Boolean

  def to_s
    self ? 'true' : 'false'
  end
  
  def ==(other)
    `return #{self} === #{other} ? #{true} : #{false};`
  end
end
