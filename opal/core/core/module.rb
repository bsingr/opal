class Module
  
  def attr_accessor(*attributes)
    attr_reader *attributes
    attr_writer *attributes
  end
  
  def attr_reader(*attributes)
    attributes.each do |attribute|
      attribute = attribute.to_s
      define_method(attribute) do
        `return rb_ivar_get(#{self},"@" + #{attribute});`
      end
    end
  end
  
  def attr_writer(*attributes)
    attributes.each do |attribute|
      attribute = attribute.to_s
      puts "doing #{attribute}"
      define_method("#{attribute}=") do |value|
        `return rb_ivar_set(#{self},"@" + #{attribute},#{value});`
      end
    end
  end
  
  def ===(object)
    object.kind_of?(self)
  end
  
  def to_s
    `return #{self}.iv_tbl.__classid__;`
  end
  
  def extend(mod)
    `return rb_include_module(rb_singleton_class(#{self}), #{mod});`
  end
  
  def include(mod)
    `return rb_include_module(#{self}, #{mod});`
  end
  
  def ancestors
    `var a = [], k = #{self};`
    `while (k) {`
      `a.push(k);`
      `k = k.sup;`
    `}`
    `return a;`
  end
  
  def superclass
    `return #{self}.sup;`
  end
  
end
