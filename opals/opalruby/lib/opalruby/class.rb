class Class
  
  def include(mod)
    OpalVM.include self, mod
  end
  
  def extend(mod)
    OpalVM.extend self, mod
  end
  
  def allocate
    # `return new #{self}.allocator();`
    `return rb_obj_alloc(#{self});`
  end
  
  def self.new(super_class)
    `return #{self}.opal.__subclass("", #{super_class});`
  end
  
  def new
    # puts "allocating: #{self}"
    obj = allocate
    # recv
    `arguments[0] = #{obj}`
    `#{obj}.$m.$initialize.apply(#{obj}, arguments)`
    # block - keep as same
    # dont need this...`arguments[1] = #{nil}`
    # `#{obj}.$initialize.apply(#{obj}, arguments)`
    obj
  end
  
  def initialize
    puts "in Class.new initialize"
  end
end
