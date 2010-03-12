class Proc
  
  def self.new(&block)
    block
  end
  
  def call(*args)
    `#{args}.unshift(nil);` # maintain self context
    `#{args}.unshift(nil);` # maintain id context
    `#{args}.unshift(nil);` # maintain block context
    `try{return #{self}.apply(#{self},#{args});}`
    `catch(e){`
      `if (e.klass==rb_eLocalJumpError){`
        `if(e.iv_tbl.type=="return"){`
          `return e.iv_tbl.args;`
        `}`
      `}`
      `throw e`
    `}`
  end
  
  alias_method :===, :call
  alias_method :yield, :call
  alias_method :[], :call
  
  def to_proc
    self
  end
end

module Kernel
  
  def proc(&block)
    block
  end
  
  def lambda(&block)
    block
  end
end