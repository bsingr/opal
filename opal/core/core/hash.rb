class Hash
  
  def self.[](*args)
    if args.length == 1 && args.is_a?(Hash)
      args[1]
    else
      result = {}
      raise "Hash[] not fully implemented"
    end
  end
  
  def initialize(*args, &block)
    raise "Hash#initialize not implemented"
  end
  
  # Remove all keys/values
  # 
  # @return [Hash] self
  # 
  def clear
    `#{self}.keys=[];`
    `#{self}.dict=[];`
    self
  end
  
  # Set the default value for the hash
  # 
  def default=(hash_default)
    `#{self}.ifnone=#{hash_default};`
    self
  end
  
  def []=(key, value)
    `return #{self}.set(#{key},#{value});`
  end
  
  def [](key)
    `return #{self}.get(#{key});`
  end
  
  def size
    `return #{self}.keys.length;`
  end
  
  alias_method :length, :size
  
  def include?(member)
    `return #{self}.hasKey(#{member});`
  end
  
  alias_method :member?, :include?
  alias_method :has_key?, :include?
  alias_method :key?, :include?
  
  def delete(key)
    `#{self}.keys.splice(#{self}.keys.indexOf(#{key}), 1);
    var r = #{self}.dict[#{key}];
    delete #{self}.dict[#{key}];
    return r;`
  end
  
  def ==(other)
    `if (#{self} === #{other}) return true;
    if (#{other}.klass != rb_cHash) return false;
    if (#{self}.keys.length != #{other}.keys.length) return false;
    for (var i = 0; i < #{self}.keys.length; i++) {
      var k = #{self}.keys[i];
      var v = #{self}.get(k);
      if(!vm_send(v,"==",[#{other}.get(#{other}.keys[i])],nil,0)) return false;
    }
    return true;`
  end
end
