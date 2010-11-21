class Class
  
  def include(mod)
    OpalVM.include self, mod
  end
  
  def extend(mod)
    OpalVM.extend self, mod
  end
  
  def allocate
    `return rb_obj_alloc(#{self});`
  end
  
  def self.new(super_class)
    OpalVM.subclass super_class
  end
  
  def new
    obj = allocate
    # recv
    `arguments[0] = #{obj}`
    `#{obj}.$m.$initialize.apply(#{obj}, arguments)`
    obj
  end
  
  def initialize
    puts "in Class.new initialize"
  end
end
