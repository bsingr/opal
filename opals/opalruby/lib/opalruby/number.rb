
class Number  
  # Unary Plus - Returns the receiver's value.
  # 
  # @example
  #   +5
  #   # => 5
  # 
  # @return [Number] receiver
  def +@()
    self
  end
  
  # Unary Minus - Returns the receiver's value, negated.
  # 
  # @example
  #   -5
  #   # => -5
  # 
  # @return [Number] result
  def -@()
    `return -#{self};`
  end
  
  # Returns `self` modulo `other`. See {Number#divmod} for more information.
  # 
  # @param [Number] other number to use for modulo
  # @return [Number]
  def %(other)
    `return #{self} % #{other};`
  end
  
  alias_method :modulo, :%
  
  # Bitwise AND.
  # 
  # @param [Number] other number to AND with.
  # @return [Number] result
  def &(other)
    `return #{self} & #{other};`
  end
  
  # Performs multiplication.
  # 
  # @param [Number] other number to multiply with
  # @return [Number] result
  def *(other)
    `return #{self} * #{other};`
  end
  
  # Raises `self` to the `other` power.
  # 
  # @param [Number] other number to raise to
  # @return [Number] result
  def **(other)
    `return Math.pow(#{self}, #{other});`
  end
  
  # Performs addition.
  # 
  # @param [Number] other number to add
  # @result [Number] result
  def +(other)
    `return #{self} + #{other};`
  end
  
  # Performs subtraction.
  # 
  # @param [Number] other number to subtract
  # @result [Number] result
  def -(other)
    `return #{self} - #{other};`
  end
  
  # Performs division.
  # 
  # @param [Number] other number to divide by.
  # @return [Number] result
  def /(other)
    `return #{self} / #{other};`
  end
  
  # Returns `true` if the value of `self` is less than that of `other`, `false`
  # otherwise.
  # 
  # @param [Number] other number to compare
  # @return [Boolean] result
  def <(other)
    `return #{self} < #{other} ? #{true} : #{false};`
  end
  
  # Returns `true` if the value of `self` is less than or equal to `other`, 
  # `false` otherwise.
  # 
  # @param [Number] other number to compare
  # @return [Number] result
  def <=(other)
    `return #{self} <= #{other} ? #{true} : #{false};`
  end
  
  # Returns `true` if the value of `self` is greater than that of `other`, 
  # `false` otherwise.
  # 
  # @param [Number] other number to compare
  # @return [Boolean] result
  def >(other)
    `return #{self} > #{other} ? #{true} : #{false};`
  end
  
  # Returns `true` if the value of `self` is greater than or equal to `other`, 
  # `false` otherwise.
  # 
  # @param [Number] other number to compare
  # @return [Number] result
  def >=(other)
    `return #{self} >= #{other} ? #{true} : #{false};`
  end
  
  # Shifts `self` left `count` positions.
  # 
  # @param [Number] count number to shift
  # @return [Number] result
  def <<(count)
    `return #{self} << #{count};`
  end
  
  # Shifts `self` right `count` positions.
  # 
  # @param [Number] count number to shift
  # @return [Number] result
  def >>(count)
    `return #{self} >> #{count};`
  end
  
  # Comparison - Returns `-1`, `0`, `1` or `nil` depending on whether `self` is
  # less than, equal to or greater than `other`.
  # 
  # @param [Number] other number to compare
  # @return [Number, nil] result
  def <=>(other)
    `if (!(#{other}.info & #{self}.TN)) return #{nil};
    else if (#{self} < #{other}) return -1;
    else if (#{self} > #{other}) return 1;
    return 0;`
  end
  
  # Returns `true` if `self` equals `other` numerically, `false` otherwise.
  # 
  # @param [Number] other number to compare
  # @return [Boolean] true or false
  def ==(other)
    `return (#{self}.valueOf() === #{other}.valueOf()) ? #{true} : #{false};`
  end
  
  # Bitwise EXCLUSIVE OR.
  # 
  # @param [Number] other number to XOR
  # @return [Number] result
  def ^(other)
    `return #{self} ^ #{other};`
  end
  
  # Returns the absolute value of `self`.
  # 
  # @example
  #   -1234.abs
  #   # => 1234
  #   1234.abs
  #   # => 1234
  # 
  # @return [Number] absolute value
  def abs
    `return Math.abs(#{self});`
  end
  
  alias_method :magnitude, :abs
  
  # Returns `true` if `self` is even, `false` otherwise.
  # 
  # @return [Boolean]
  def even?
    `return (#{self} % 2 == 0) ? #{true} : #{false};`
  end
  
  # Returns `true` if `self` is odd, `false` otherwise.
  # 
  # @return [Boolean]
  def odd?
    `return (#{self} % 2 == 0) ? #{false} : #{true};`
  end
  
  # Returns the number equal to `self` + 1.
  # 
  # @example
  #   1.next
  #   # => 2
  #   (-1).next
  #   # => 0
  # 
  # @return [Number] result
  def next
    `return parseInt(#{self}) + 1;`
  end
  
  alias_method :succ, :next
  
  # Returns the number equal to `self` - 1.
  # 
  # @example
  #   1.pred
  #   # => 0
  #   (-1).pred
  #   # => -2
  # 
  # @return [Number] result
  def pred
    `return parseInt(#{self}) -1;`
  end
  
  # Iterates `block`, passing in integer values from `self` up to and including
  # `finish`.
  # 
  # If no block is given, an enumerator is returned instead.
  # 
  # @note Enumerator functionality not yet implemented.
  # 
  # @example
  #   5.upto(10) { |i| puts i }
  #   # => 5
  #   # => 6
  #   # => 7
  #   # => 8
  #   # => 9
  #   # => 10
  # 
  # @param [Number] finish where to stop iteration
  # @return [Number] returns receiver
  def upto(finish, &block)
    `for (var i = #{self}; i <= #{finish}; i++) {
      #{block}.apply(#{block}.__self__, [i]);
    }
    return #{self};`
  end
  
  # Iterates `block`, passing decreasing values from `self` down to and 
  # including `finish`.
  # 
  # If no block is given, an enumerator is returned instead.
  # 
  # @note Enumerator functionality not currently implemented.
  # 
  # @example
  #   5.downto(1) { |x| puts x }
  #   # => 5
  #   # => 4
  #   # => 3
  #   # => 2
  #   # => 1
  # 
  # @param [Number] finish where to stop iteration
  # @return [Number] returns receiver
  def downto(finish, &block)
    `for (var i = #{self}; i >= #{finish}; i--) {
      #{block}.apply(#{block}.__self__, [i]);
    }
    return #{self};`
  end
  
  # Iterates `block` `self` times, passing in values from zero to `self` - 1.
  # 
  # If no block is given, an enumerator is returned instead.
  # 
  # @note Enumerator functionality not yet implemented.
  # 
  # @example
  #   5.times { |x| puts x }
  #   # => 0
  #   # => 1
  #   # => 2
  #   # => 3
  #   # => 4
  # 
  # @return [Number] returns receiver
  def times(&block)
    `for (var i = 0; i < #{self}; i++) {
       #{block}.apply(#{block}.__self__, [i]);
    }
    return #{self};`
  end
  
  # Bitwise OR.
  # 
  # @param [Number] other number to OR with.
  # @return [Number] result
  def |(other)
    `return #{self} | #{other};`
  end
  
  # Returns `true` if `self` is zero, `false` otherwise.
  # 
  # @return [Boolean] result
  def zero?
    `return #{self}.valueOf() === 0 ? #{true} : #{false};`
  end
  
  # Returns the receiver if it is not zero, `nil` otherwise.
  # 
  # @return [Number, nil] receiver or nil
  def nonzero?
    `return #{self}.valueOf() === 0 ? #{nil} : #{self};`
  end
  
  # One's complement: returns a number where each bit is flipped.
  # 
  # @return [Number] result
  def ~
    `return ~#{self};`
  end
  
  # Returns the smallest integer greater than or equal to `num`.
  # 
  # @example
  #   1.ceil
  #   # => 1
  #   1.2.ceil
  #   # => 2
  #   (-1.2).ceil
  #   # => -1
  #   (-1.0).ceil
  #   # => -1
  # 
  # @return [Number] result
  def ceil
    `return Math.ceil(#{self});`
  end
  
  # Returns the largest integer less than or equal to `self`.
  # 
  # @example
  #   1.floor
  #   # => 1
  #   (-1).fllor
  #   -1
  # 
  # @return [Number] result
  def floor
    `return Math.floor(#{self});`
  end
  
  # Returns `true` if `self` is an integer.
  # 
  # @return [Boolean]
  def integer?
    `return #{self} % 1 === 0 ? #{true} : #{false};`
  end
  
  def inspect
    `return #{self}.toString();`
  end
  
  def to_s
    `return #{self}.toString();`
  end
  
  
  def to_i
    `return parseInt(#{self});`
  end
end
