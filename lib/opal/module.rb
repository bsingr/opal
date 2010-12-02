
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
    Opal.define_method self, method.to_s, &implementation
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
    Opal.alias_method self, new_name.to_s, old_name.to_s
    self
  end
  
  def to_s
    instance_variable_get '__classid__'
  end
    
  def const_set(id, value)
    `return rb_vm_cs(#{self}, #{id.to_s}, #{value});`
  end
  
  def module_eval(string = nil, filename = nil, lineno = nil, &block)
    if block_given?
      `#{block}(#{self}, #{nil})`
    elsif string
      # puts "module eval with some code....#{string.length}"
      Opal.context_eval self, string, filename, lineno
    end
  end
  
  alias_method :class_eval, :module_eval
  
  def private(*methods)
    # do nothing
  end
  
  def public(*methods)
    # do nothing
  end
  
  def protected(*methods)
    # do nothing
  end
end
