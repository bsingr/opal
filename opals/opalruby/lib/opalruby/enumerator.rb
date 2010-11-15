class Enumerator
  
  def initialize(object, method, *args, &block)
    @object = object
    @method = method.to_sym
    @args = args
  end
end

module Kernel
  def to_enum(method = :each, *args)
    # FIXME: should pass *args
    Enumerator.new self, method, args
  end
end
