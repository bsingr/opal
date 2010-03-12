class String
  
  def ==(other)
    `return #{self}===#{other};`
  end
  
  def eql?(other)
    `return #{self}===#{other};`
  end
  
  def empty?
    `return #{self}.length==0;`
  end
  
  def reverse
    `return #{self}.split("").reverse().join("");`
  end
  
  def intern
    `return ID2SYM(#{self});`
  end
  
  alias_method :to_sym, :intern
  
  def length
    `return #{self}.length;`
  end
  
  alias_method :size, :length
  
  def +(other)
    `return #{self}+#{other};`
  end
  
  def to_s
    `return new String(#{self});`
  end
  
  alias_method :to_str, :to_s
  
  def inspect
    `return '"'+#{self}+'"';`
  end
  
  def upcase
    `return #{self}.toUpperCase();`
  end
  
  def downcase
    `return #{self}.toLowerCase();`
  end
  
  def capitalize
    `return #{self}[0].toUpperCase() + #{self}.substr(1).toLowerCase();`
  end
  
  def *(num)
    `var res=[];
    for(var i=0;i<#{num};i++){res.push(#{self});}
    return res.join("");`
  end
  
  def each(&block)
    raise "String#each not yet implemented"
  end
  
  alias_method :each_line, :each
  
end
