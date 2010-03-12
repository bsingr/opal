# Javascript, as the underlying platform, uses a single class for both True and
# False language values. For this reason, and namely efficiency, a single class
# is used within Opal to represent Boolean values. In Ruby, there is a 
# distinguishable pair of classes: TrueClass and FalseClass. This is not the 
# case in Ruby, but all methods of both classes are implemented under the single
# class {Boolean}.
# 
# TrueClass and FalseClass constants are therefore missing from Opal runtime.
#
class Boolean
  
  # Returns a string representation of the value, 'true' for true, and 'false'
  # for false
  # 
  # == Usage:
  # 
  #   true.to_s   # "true"
  #   false.to_s  # "false"
  # 
  # @return [String] string representation
  # 
  def to_s
    self ? "true" : "false"
  end
  
  # Returns a string representation of the value. Follows the same principle as
  # {#to_s}
  # 
  # == Usage:
  # 
  #   true.to_s   # "true"
  #   false.to_s  # "false"
  # 
  # @return [String] string representation
  # 
  def inspect
    self ? "true" : "false"
  end
  
  # And: carries out a boolean logic test. 
  # For <tt>true</tt>, returns <tt>false</tt> if other is <tt>nil</tt> or
  # <tt>false</tt>, <tt>true</tt> otherwise. For <tt>false</tt>, this method
  # always evaluates to <tt>false</tt>.
  # 
  # Usage:
  # 
  #   true & nil      # false
  #   true & "a"      # true
  #   true & 0        # true
  #   false & true    # false
  #   false & false   # false
  # 
  # @param [Object] other the object to compare
  # @return [Boolean] result
  # 
  def &(other)
    if self
      other ? true : false
    else
      false
    end
  end
  
  def |(other)
    if self
      true
    else
      other ? true : false
    end
  end
  
  def ^(other)
    if self
      other ? false : true
    else
      other ? true : false
    end
  end
end
