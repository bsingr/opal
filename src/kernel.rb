module Kernel
  # Try to load the library or file named `path`. An error is thrown if the 
  # path cannot be found.
  #
  # @param [String] path
  # @return [true, false] 
  def require(path)
    `return rb_require(path);`
  end

  # Repeatedly executes the given block.
  #
  # @example
  #
  #     loop do
  #       puts "this will infinetly repeat"
  #     end
  #
  # @return [Object] returns the receiver.
  def loop
    `while (true) {
      try {
        #{yield};
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e['@exit_value'];
          default:
            throw e;
        }
      }
    }

    return self;`
  end

  # Simple equivalent to `Proc.new`. Returns a new proc from the given block.
  #
  # @example
  #
  #     proc { puts "a" }
  #     # => #<Proc 02002>
  #
  # @return [Proc]
  def proc(&block)
    raise ArgumentError, "block required" unless block_given?
    block
  end

  def lambda(&block)
    raise ArgumentError, "block required" unless block_given?
    block
  end

  # Raises an exception. If given a string, this method will raise a
  # RuntimeError with the given string as a message. Otherwise, if the first
  # parameter is a subclass of Exception, then the method will raise a new
  # instance of the given exception class with the string as a message, if it
  # exists, or a fdefault message otherwise.
  #
  # @example String message
  #
  #     raise "some error"
  #     # => RuntimeError: some error
  #
  # @example Exception subclass
  #
  #     raise StandardError, "something went wrong"
  #     # => StandardError: something went wrong
  #
  # @param [Exception, String] exception
  # @param [String]
  # @return [nil]
  def raise(exception, string = nil)
    `var msg = nil, exc;

    if (typeof exception == 'string') {
      msg = exception;
      exc = #{RuntimeError.new `msg`};
    } else if (#{`exception`.kind_of? Exception}.$r) {
      exc = exception;
    } else {
      if (string != nil) msg = string;

      exc = #{`exception`.new `msg`};
    }

    rb_vm_raise(exc);`
  end

  def fail(exception, string = nil)
    raise exception, string
  end

  def instance_variable_defined?(name)
    `name = #{name.to_s};
    return self[name] == undefined ? Qfalse : Qtrue;`
  end

  def instance_variable_get(name)
    `name = #{name.to_s};
    return self[name] == undefined ? nil : self[name];`
  end

  def instance_variable_set(name, value)
    `name = #{name.to_s};
    return self[name] = value;`
  end

  # Returns `true` if a block was given to the current method, `false` 
  # otherwise.
  #
  # @NOTE: In opal, this is actually a fake method. block_given? is inlined
  # for efficiency and implementation details.
  #
  # @return [true, false]
  def block_given?
    false
  end

  def method_missing(sym, *args)
    #raise "undefined method `#{sym}` for #{self.inspect}"
    raise NoMethodError, "undefined method `#{sym}` for #{self.inspect}"
  end

  def to_a
    [self]
  end

  def tap
    raise LocalJumpError, "no block given" unless block_given?
    yield self
    self
  end

  def kind_of?(klass)
    `var search = self.$klass;

    while (search) {
      if (search == klass) {
        return Qtrue;
      }

      search = search.$super;
    }

    return Qfalse;`
  end

  def is_a?(klass)
    kind_of? klass
  end

  def nil?
    false
  end

  def respond_to?(method_id)
    `if (self.$m[#{`method_id`.to_s}]) {
      return Qtrue;
    }

    return Qfalse;`
  end

  def ===(other)
    self == other
  end

  def __send__(method_id, *args)
    `args.unshift(self);
    return self.$m[#{method_id.to_s}].apply(null, args);`
  end

  def send(method_id, *args)
    __send__ method_id, *args
  end

  def class
    `return rb_class_real(self.$klass);`
  end

  # Returns a random number. If max is `nil`, then the result is 0. Otherwise
  # returns a random number between 0 and max.
  #
  # @example
  #
  #     rand        # => 0.918378392234
  #     rand        # => 0.283842929289
  #     rand 10     # => 9
  #     rand 100    # => 21
  #
  # @param [Numeric] max
  # @return [Numeric]
  def rand(max = `undefined`)
    `if (max != undefined) 
        return Math.floor(Math.random() * max);
    else
      return Math.random();`
  end

  def __id__
    `return self.$hash();`
  end

  def object_id
    `return self.$hash();`
  end

  def to_s
    "#<#{`rb_class_real(self.$klass)`.to_s}:#{`self.$hash()`}>"
  end 

  def inspect
    to_s
  end

  def instance_eval(&block)
    `block(self)` if block_given?
    self
  end

  def const_set(name, value)
    `return rb_const_set(rb_class_real(self.$klass), name, value);`
  end

  def const_defined?(name)
    false
  end
end

