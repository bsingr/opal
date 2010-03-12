class Symbol
  
  def ==(other)
    `return (#{self}===#{other})?true:false;`
  end
  
  def inspect
    `return ":" + #{self}.ptr;`
  end
  
  def to_s
    `return #{self}.ptr;`
  end
  
  alias_method :id2name, :to_s
  
  def to_sym
    self
  end
  
  alias_method :intern, :to_sym
  
  def to_proc
    `var id = #{self}.ptr;
    var f = function($$, id, _, o) {
      var args = Array.prototype.slice.call(arguments, 3);
      return vm_send(o, id, args, nil, 8);
    };
    return f;`
  end
  
  def succ
    self
  end
  
  alias_method :next, :succ
  
  def length
    `return #{self}.ptr.length;`
  end
  
  alias_method :size, :length
  
  def upcase
    `return ID2SYM(#{self}.ptr.toUpperCase());`
  end
  
  def downcase
    `return ID2SYM(#{self}.ptr.toLowerCase());`
  end
  
  def capitalize
    `return ID2SYM(#{self}.ptr[0].toUpperCase() + #{self}.ptr.substr(1).toLowerCase());`
  end
  
end
