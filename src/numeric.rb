class Numeric
  # Unary Plus - Returns the receivers value
  #
  # @example
  #
  #     +5
  #     # => 5
  #
  # @return [Numeric] receiver
  def +@
    `return self;`
  end

  # Unary minus - returns the receiver's value, negated.
  #
  # @example
  #
  #     -5
  #     # => -5
  #
  # @return [Numeric] result
  def -@
    `return -self;`
  end

  # Returns `self` modulo `other`. See {#divmod} for more information.
  #
  # @param [Numeric] other number to use for module
  # @return [Numeric] result
  def %(other)
    `return self % other;`
  end

  def modulo(other)
    `return self % other;`
  end

  # Bitwise AND.
  #
  # @param [Numeric] other numeric to AND with
  # @return [Numeric]
  def &(num2)
    `return self & num2;`
  end

  # Performs multiplication
  #
  # @param [Numeric] other number to multiply with
  # @return [Numeric]
  def *(other)
    `return self * other;`
  end

  # Raises `self` to the power of `other`.
  #
  # @param [Numeric] other number to raise to
  # @return [Numeric]
  def **(other)
    `return Math.pow(self, other);`
  end

  # Performs addition.
  #
  # @param [Numeric] other number to add
  # @return [Numeric]
  def +(other)
    `return self + other;`
  end

  # Performs subtraction
  #
  # @param [Numeric] other number to subtract
  # @return [Numeric]
  def -(other)
    `return self - other;`
  end

  # Performs division
  #
  # @param [Numeric] other number to divide by
  # @return [Numeric]
  def /(other)
    `return self / other;`
  end

  # Returns `true` if the value of `self` is less than that or `other`, `false`
  # otherwise.
  #
  # @param [Numeric] other number to compare
  # @return [true, false] result of comparison
  def <(other)
    `return self < other ? Qtrue : Qfalse;`
  end

  # Returns `true` if the value of `self` is less than or equal to `other`, 
  # `false` otherwise.
  #
  # @param [Numeric] other number to comapre
  # @return [true, false] result of comparison
  def <=(other)
    `return self <= other ? Qtrue : Qfalse;`
  end

  # Returns `true` if the value of `self` is greater than `other`, `false`
  # otherwise.
  #
  # @param [Numeric] other number to compare with
  # @return [true, false] result of comparison
  def >(other)
    `return self > other ? Qtrue : Qfalse;`
  end

  # Returns `true` if `self` is greater than or equal to `other`, `false`
  # otherwise.
  #
  # @param [Numeric] other number to compare with
  # @return [true, false] result of comparison
  def >=(other)
    `return self >= other ? Qtrue : Qfalse;`
  end

  # Shift `self` left by `count` positions.
  #
  # @param [Numeric] count number to shift
  # @return [Numeric]
  def <<(count)
    `return self << count;`
  end

  # Shifts 'self' right by `count` positions.
  #
  # @param [Numeric] count number to shift
  # @return [Numeric]
  def >>(count)
    `return self >> count;`
  end

  # Comparison - Returns '-1', '0', '1' or nil depending on whether `self` is
  # less than, equal to or greater than `other`.
  #
  # @param [Numeric] other number to compare with
  # @return [Number, nil]
  def <=>(other)
    `if (typeof other != 'number') return nil;
    else if (self < other) return -1;
    else if (self > other) return 1;
    return 0;`
  end

  # Returns `true` if `self` equals `other` numerically, `false` otherwise.
  #
  # @param [Numeric] other number to compare
  # @return [true, false]
  def ==(other)
    `return self.valueOf() === other.valueOf() ? Qtrue : Qfalse;`
  end

  # Bitwise EXCLUSIVE OR.
  #
  # @param [Numeric] other number to XOR with
  # @return [Numeric]
  def ^(other)
    `return self ^ other;`
  end

  # Returns the absolute value of `self`.
  #
  # @example
  #
  #     -1234.abs
  #     # => 1234
  #     1234.abs
  #     # => 1234
  #
  # @return [Numeric]
  def abs
    `return Math.abs(self);`
  end

  def magnitude
    `return Math.abs(self);`
  end

  # Returns `true` if self is even, `false` otherwise.
  #
  # @return [true, false]
  def even?
    `return (self % 2 == 0) ? Qtrue : Qfalse;`
  end

  # Returns `true` if self is odd, `false` otherwise.
  #
  # @return [true, false]
  def odd?
    `return (self % 2 == 0) ? Qfalse : Qtrue;`
  end

  # Returns the number equal to `self` + 1.
  #
  # @example
  #
  #     1.next
  #     # => 2
  #     (-1).next
  #     # => 0
  #
  # @return [Numeric]
  def succ
    `return self + 1;`
  end

  def next
    `return self + 1;`
  end

  # Returns the number equal to `self` - 1
  #
  # @example
  #
  #     1.pred
  #     # => 0
  #     (-1).pred
  #     # => -2
  #
  # @return [Numeric]
  def pred
    `return self - 1;`
  end

  # Iterates the block, passing integer values from `self` upto and including
  # `finish`.
  #
  # @example
  #
  #     5.upto(10) { |i| puts i }
  #     # => 5
  #     # => 6
  #     # => 7
  #     # => 8
  #     # => 9
  #     # => 10
  #
  # @param [Numeric] finish where to stop iteration
  # @return [Numeric] returns the receiver
  def upto(finish)
    `for (var i = self; i <= finish; i++) {
      #{yield `i`};
    }

    return self;`
  end

  # Iterates the block, passing decreasing values from `self` downto and
  # including `finish`.
  #
  # @example
  #
  #     5.downto(1) { |x| puts x }
  #     # => 5
  #     # => 4
  #     # => 3
  #     # => 2
  #     # => 1
  #
  # @param [Numeric] finish where to stop iteration
  # @return [Numeric] returns the receiver
  def downto(finish)
    `for (var i = self; i >= finish; i--) {
      #{yield `i`};
    }

    return self;`
  end

  # Iterates the block `self` number of times, passing values in the range 0 to
  # `self` - 1.
  #
  # @example
  #   
  #     5.times { |x| puts x }
  #     # => 0
  #     # => 1
  #     # => 2
  #     # => 3
  #     # => 4
  #
  # @return [Numeric] returns the receiver
  def times
    `for (var i = 0; i < self; i++) {
      #{yield `i`};
    }

    return self;`
  end

  # Bitwise OR.
  #
  # @param [Numeric] other number to OR with
  # @return [Numeric]
  def |(other)
    `return self | other;`
  end

  # Returns `true` if `self` is zero, `false` otherwise.
  #
  # @return [true, false]
  def zero?
    `return self == 0 ? Qtrue : Qfalse;`
  end

  # Returns the receiver if it is not zero, `nil` otherwise
  #
  # @return [Numeric, nil]
  def nonzero?
    `return self == 0 ? nil : self;`
  end

  # One's complement: returns a number where each bit is flipped.
  #
  # @return [Numeric]
  def ~
    `return ~self;`
  end

  # Returns the smallest integer greater than or equal to `num`.
  #
  # @example
  #
  #     1.ceil        # => 1
  #     1.2.ceil      # => 2
  #     (-1.2).ceil   # => -1
  #     (-1.0).ceil   # => -1
  #
  # @return [Numeric]
  def ceil
    `return Math.ceil(self);`
  end

  # Returns the largest integer less than or equal to `self`.
  #
  # @example
  #
  #     1.floor       # => 1
  #     (-1).floor    # => -1
  #
  # @return [Numeric]
  def floor
    `return Math.floor(self);`
  end

  # Returns `true` if self is an ineteger, `false` otherwise.
  #
  # @return [true, false]
  def integer?
    `return self % 1 == 0 ? Qtrue : Qfalse;`
  end

  def inspect
    `return self.toString();`
  end

  def to_s
    `return self.toString();`
  end

  def to_i
    `return parseInt(self);`
  end
end

