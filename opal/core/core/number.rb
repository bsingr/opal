class Number
  
  def +(other)
    `return #{self}+#{other};`
  end
  
  def -(other)
    `return #{self}-#{other};`
  end
  
  def *(other)
    `return #{self}*#{other};`
  end
  
  def /(other)
    `return #{self}/#{other};`
  end
  
  def %(other)
    `return #{self}%#{other};`
  end
  
  def **(other)
    `return Math.pow(#{self},#{other});`
  end
  
  def >(other)
    `return #{self}>#{other};`
  end
  
  def >=(other)
    `return #{self}>=#{other};`
  end
  
  def <(other)
    `return #{self}<#{other};`
  end
  
  def <=(other)
    `return #{self}<=#{other};`
  end
  
  def to_s
    `return #{self}.toString();`
  end
  
  def inspect
    `return #{self}.toString();`
  end
  
  def +@
    self
  end
  
  def -@
    `return -#{self};`
  end
  
  def <=>(other)
    `if(a===b)return 0;`
    `if(a<b)return -1;`
    `return 1;`
  end
  
  def real?
    `return #{self}!=Math.round(#{self});`
  end
  
  def integer?
    `return #{self}==Math.round(#{self});`
  end
  
  def nonzero?
    `return #{self}!==0;`
  end
  
  def zero?
    `return #{self}===0;`
  end
  
  def ==(other)
    `return #{self}===#{other};`
  end
  
  def eql?(other)
    `return #{self}===#{other};`
  end
  
  def even?
    `return (#{self}%2==0)?true:false;`
  end
  
  def odd?
    `return (#{self}%2==0)?false:true;`
  end
  
  def pred
    `return --#{self};`
  end
  
  def next
    `return ++#{self};`
  end
  
  alias_method :succ, :next
  
  def <<(other)
    `return #{self}<<#{other};`
  end
  
  def >>(other)
    `return #{self}>>#{other};`
  end
  
  def &(other)
    `return #{self}&#{other};`
  end
  
  def |(other)
    `return #{self}|#{other};`
  end
  
  def ^(other)
    `return #{self}^#{other};`
  end
  
  def ~
    `return ~#{self};`
  end
  
  def to_f
    `return parseFloat(#{self});`
  end
  
  def to_i
    `return parseInt(#{self});`
  end
  
  alias_method :to_int, :to_i
  
  def floor
    `return Math.floor(#{self});`
  end
  
  def ceil
    `return Math.ceil(#{self});`
  end
  
  def round
    `return Math.round(#{self});`
  end
  
  def truncate
    `return Math.round(#{self});`
  end
  
  def times(number)
    `for(var i=0;i<#{number};i++){`
    yield number
    `}`
  end
end
