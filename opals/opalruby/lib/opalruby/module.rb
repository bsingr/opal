
class Module
  
  def name
    instance_variable_get '__classid__'
  end
  
  def ===(object)
    object.is_a? self
  end
  
  def undef_method symbol
    puts "need to undefine method: #{symbol}"
  end
  
  def define_method(method, &implementation)
    OpalVM.define_method self, method.to_s, &implementation
  end
  
  def attr_accessor(*attributes)
    attributes.each do |attribute|
      attr_reader attribute
      attr_writer attribute
    end
    
    nil
  end
  
  def attr_reader(*attributes)
    attributes.each do |attribute|
      m_id = attribute.to_s
      define_method(m_id) do
        instance_variable_get "@#{m_id}"
      end
    end
    
    nil
  end
  
  def attr_writer(*attributes)
    attributes.each do |attribute|
      id = attribute.to_s
      define_method("#{id}=") do |value|
        instance_variable_set "@#{id}", value
      end
    end
    
    nil
  end
    
  def alias_method(new_name, old_name)
    OpalVM.alias_method self, new_name.to_s, old_name.to_s
    self
  end
  
  def to_s
    instance_variable_get '__classid__'
  end
    
  def const_set(id, value)
    `return rb_vm_cs(#{self}, #{id.to_s}, #{value});`
  end
  
  def module_eval(&block)
    if block_given?
      `#{block}(#{self}, #{nil})`
    end
  end
  
  alias_method :class_eval, :module_eval
end
