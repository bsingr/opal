
class Module
  
  def name
    `return #{self}.class_name;`
  end
  
  def ===(object)
    object.is_a? self
  end
  
  def undef_method symbol
    puts "need to undefine method: #{symbol}"
  end
  
  def define_method(method, &implementation)
    # we are defining a method, so always use opal_self to reclaim self
    # `#{implementation}.__fun__.opal_self = true;
    `var mid = #{method.to_s};
    #{self}.dm(mid, #{implementation}, false);
    return #{self};`
  end
  
  # `print('defining alias_method in ' + self.$h)`
  # `print(rb_mo)`
  # `print(rb_module.$h)`
  
  def alias_method(new_name, old_name)
    # `print("in alias..")`
    # `console.log("in here " + this);`
    # `console.log(this);`
    new_name = new_name.to_s
    old_name = old_name.to_s
    # puts "alias #{new_name} from #{old_name}"
    # `console.log(#{self}.allocator.prototype);`
    # `var body = function() {
      # return #{self}['$' + #{old_name}].apply(this, arguments);
    # };`
  # `#{self}.dm(#{new_name}, #{self}.allocator.prototype['$' + #{old_name}], false)`
  `#{self}.$dm(#{new_name}, #{self}.$m['$' + #{old_name}], false)`
    self
  end
  
  def attr_accessor(*attributes)
    # puts "in attr_accessor"
    `#{self}.$attr_reader.apply(#{self}, [#{self}, #{nil}].concat(#{attributes}))`
     `#{self}.$attr_writer.apply(#{self}, [#{self}, #{nil}].concat(#{attributes}))`
    self
  end
  
  def to_s
    `return #{self}.$i.__classid__;`
  end
  
  
  
  def attr_reader(*attributes)
    # `console.log("outer self is: " + self)`
    # console.log(self);
    # console.log(arguments);
    # `
    # puts "yeah, doing #{attributes}"
    attributes.each do |attribute|
      # puts "doing #{attribute}"
      mid = attribute.to_s
      `#{self}.dm(mid, function(recv) {
        if (recv['@' + mid] === undefined) recv['@' + mid] = #{nil};
        return recv.ig('@' + mid);
      }, false)`
    end
    
    self
  end
  
  def attr_writer(*attributes)
    attributes.each do |attribute|
      mid = attribute.to_s
      mid2 = `#{mid} + "="`
      `#{self}.dm(#{mid2}, function(recv, block, val) {
        return recv.is('@' + #{mid}, val);
      }, false)`
    end
    
    self
  end
  
  def const_set(id, value)
    `return #{self}.cs(#{id}, #{value});`
  end
  
  def module_eval(&block)
    # puts "about to module eval"
    # `console.log(#{self});`
    if block_given?
      # puts "block was given.."
      # `console.log(#{self});`
      # `#{block}.__fun__.opal_self = true;`
      # `#{block}.apply(#{self})`
      `#{block}(#{self}, #{nil})`
      # `#{}`
    end
  end
  
  # alias_method :class_eval, :module_eval
end
