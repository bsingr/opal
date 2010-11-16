# The kernel module is included directly into {Object}, making all of these 
# methods globally accessible from any Object.
module Kernel
  # Repeatedly executes the block.
  # 
  # @note Method does not return an enumerator if no block given(yet).
  # 
  # @example
  #   loop do
  #     puts "this will infinetly print"
  #   end
  # 
  # @param [Proc] block
  # @return [Object] returns the receiver
  def loop
    raise LocalJumpError, "no block given" unless block_given?
    
    while true
      yield
    end
  end
  
  # Simple equivalent to `Proc.new`. Returns a {Proc} instance.
  # 
  # @example
  #   proc { puts "a" }
  #   # => #<Proc 0x2828283>
  # 
  # @param [Proc] block
  # @return [Proc]
  def proc(&block)
    raise ArgumentError, "block required" unless block_given?
    # make block know its a proc/lambda style?
    block
  end
  
  # Prints each argument in turn to the browser console. Currently there is no
  # use of `$stdout`, so it is hardcoded into this method to write to the 
  # console directly.
  # 
  # @param [Object] args objects to print using `inspect`
  # @return [nil]
  def puts(*args)
    args.each do |arg|
      OpalVM.puts arg.to_s
    end
    
    nil
  end
  
  # Raises an exception. If given a {String} argument, this method will raise a
  # {RuntimeError} with the given `string` as a message. Otherwise, if the first
  # parameter is a subclass of {Exception}, then the method will raise a new 
  # instance of the given `exception` class with the `string` as a method, if it
  # exists, or a default message otherwise`
  # 
  # @example String message
  #   raise "some error"
  #   # => RuntimeError: some error
  # 
  # @example Exception subclass
  #   raise StandardError, "something went wrong"
  #   # => StandardError: something went wrong
  # 
  # @param [Exception, String] exception exception class or string to throw
  # @param [String] string to pass as message for exception
  # @return [nil]
  def raise(exception, string = nil)
    msg = nil
    if exception.is_a? String
      msg = exception
      exc = RuntimeError.new msg
    elsif exception.is_a? Exception
      exc = exception
    else
      if string
        msg = string
      end
      exc = exception.new msg
    end
    `rb_vm_raise(#{exc})`
    # OpalVM.raise exc
  end
  
  # FIXME: wtf?!?! not working..
  def instance_variable_defined?(variable_name)
    `return (rb_ivar_defined(#{variable_name.to_s}) ? #{true} : #{false});`
  end
  
  def instance_variable_get(variable_name)
    `return rb_ivar_get(#{self}, #{variable_name.to_s});`
  end
  
  def instance_variable_set(variable_name, value)
    `return rb_ivar_set(#{self}, #{variable_name.to_s}, #{value});`
  end
  
  # Returns `true` if `yield` would execute a block in the current context, 
  # `false` otherwise. 
  # 
  # @note In Opal this is kind of a fake method. The compiler treats 
  # `block_given?` as a keyword to make its use easier to deal with in 
  # javascript (keep things nice and efficient). Its use is the same to the end
  # programmer, apart from it should not be overriden - it is never actually
  # called.
  # 
  # @return [Boolean] was a block given
  def block_given?
    false
  end
  
  def method_missing(sym, *args)
    raise NoMethodError, "undefined method `#{sym}` for #{self.inspect}"
  end
  
  def to_a
    [self]
  end
  
  def tap
    yield self
    self
  end
  
  
  
  # @fixme: this should not be here.
  def !=(other)
    `return #{self == other}.r ? #{false} : #{true};`
  end
  

  
  def is_a?(klass)
   `var search = #{self}.$k;
    
    while (search) {
      if (search == #{klass})
        return #{true};
      
      search = search.$sup;
    }
    
    return #{false};`
  end
  
  # alias_method :kind_of?, :is_a?
  
  def nil?
    false
  end
  
  def respond_to?(method)
    `var method_id = #{method.to_s}.toString();
    if (#{self}['$' + method_id]) {
      return #{true};
    }
    return #{false};`
  end
  
  def ===(other)
    self == other
  end
  
  
  
  def __send__(method, *args)
    `var m_id = #{method.to_s};
    var args_to_send = #{args};
    // block
    args_to_send.unshift(#{nil});
    // recv
    args_to_send.unshift(#{self});
    
    return (#{self}['$' + m_id] || #{self}.m$(m_id)).apply(#{self}, args_to_send);`
  end
  
  def class
    `return rb_class_real(#{self}.$k);`
  end
  
  # Returns a random number. If `max` is `nil` then the result is 0. Otherwise
  # returns a random number from `0` to `max`.
  # 
  # @example
  #   rand      # => 0.192272821917329
  #   rand      # => 0.972628272363732
  #   rand 10   # => 8
  #   rand 10   # => 4
  # 
  # @param [Number] max max number to use
  # @return [Number] random number
  def rand(max = nil)
    if max
      `Math.floor(Math.random() * #{max})`
    else
      `Math.random()`
    end
  end
  
  def __id__
    `return #{self}.$h;`
  end
  
  def to_s
    "#<#{self.class}:#{self.__id__}>"
  end
  
  def inspect
    to_s
  end
  
  def object_id
    `return #{self}.id;`
  end
  

  
  # An alias of {#raise}
  # 
  # @param [Exception, String] exception exception class or string to throw
  # @param [String] string to pass as message for exception
  # @return [nil]
  def fail(exception = nil, string = nil)
    raise exception, string
  end
  
  def instance_eval(&block)
    if block_given?
      `#{block}(#{self}, #{nil})`
    end
  end
  
  def const_set(const_name, const_value)
    `return #{self}.const_set(#{const_name}, #{const_value});`
  end
  
end
