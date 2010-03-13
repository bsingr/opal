module Kernel
  
  def nil?
    false
  end
  
  def ===(other)
    self == other
  end
  
  def tap
    yield self
    self
  end
  
  def =~
    nil
  end
  
  def !~(obj)
    self =~ obj ? false : true
  end
  
  def eql?(other)
    `#{self}===#{other}` ? true : false
  end
  
  def class
    `return rb_class_real(#{self}.klass);`
  end
  
  def clone
    self
  end
  
  def dup
    self
  end
  
  def initialize_copy
    self
  end
  
  def raise(exception, string)
    msg = ""
    if exception.is_a?(String)
      msg = exception
      exc = RuntimeError.new(msg)
    elsif exception.is_a?(Exception)
      exc = exception
    else
      msg = string if string
      exc = exception.new(msg)
    end
    
    `throw #{exc};`
    self
  end
  
  alias_method :fail, :raise
  
  def object_id
    `if(#{self}.hash!=undefined)return #{self}.hash;`
    `var hash=opal_yield_hash();`
    `#{self}.hash=hash;`
    `return hash;`
  end
  
  def respond_to?(m)
    `var f= rb_search_method(#{self}.klass,(#{m}.klass==rb_cString)?#{m}:#{m}.ptr);`
    `if (f) return true;`
    `return false;`
  end
  
  def to_s
    c = `rb_obj_classname(#{self})`
    if `#{self}.flags&T_OBJECT`
      `return "#<" + #{c} + ":" + #{self}.hash + ">";`
    else
      c
    end
  end
  
  def inspect
    to_s
  end
  
  def instance_of?(a_class)
    `rb_class_real(#{self}.klass)==#{a_class}` ? true : false
  end
  
  def kind_of?(a_class)
    `var k = #{self}.klass;
    while (k) {

      if (k == #{a_class}) return true;
      k = k.sup;
    }
    return false;`
  end
  
  alias_method :is_a?, :kind_of?
  
  def send(method_id, *args)
    `return vm_send(#{self},#{method_id},#{args},nil,8);`
  end
  
  alias_method :__send__, :send
  
  def instance_eval(string, &block)
    if string
      raise "instance_eval with string not yet implemented"
    end
    
    raise "no block given for instance_eval" unless block
    `return #{block}.call(#{block},#{self},nil,nil,#{self});`
  end
  
  def instance_exec(*args, &block)
    raise "no block given for instance_exec" unless block_given?
    `#{args}.unshift(nil);`
    `#{args}.unshift(nil);`
    `#{args}.unshift(#{self});` # recv
    `return #{block}.apply(#{block},#{args});`
  end
  
end
