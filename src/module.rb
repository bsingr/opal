class Module
  
  def name
    `return self['__classid__'];`
  end

  def ===(obj)
    obj.kind_of? self
  end

  def define_method(method_id, &block)
    raise LocalJumpError, "no block given" unless block_given?
    `console.log("self is:")`
    `console.log(self)`
    `$def(self, #{method_id.to_s}, block)`
    nil
  end

  def attr_accessor(*attrs)
    attr_reader *attrs
    attr_writer *attrs
  end

  def attr_reader(*attrs)
    `for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];
      var method_id = #{`attr`.to_s};

      $def(self, method_id, 
            new Function('self', 'return rb_ivar_get(self, "@' + method_id + '");'));

    }

    return nil;`
  end

  def attr_writer(*attrs)
    `for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];
      var method_id = #{`attr`.to_s};

      $def(self, method_id + '=', 
        new Function('self', 'val', 'return rb_ivar_set(self, "@' + method_id + '", val);'));

    }

    return nil;`
  end

  def alias_method(new_name, old_name)
    new_name = new_name.to_s
    old_name = old_name.to_s
#    `rb_define_method_raw(self, new_name, self.$m_tbl[old_name])`
    `$opal.am(self, new_name, old_name)`
    self
  end

  def to_s
    `return self['__classid__'];`
  end

  def const_set(id, value)
    `return rb_vm_cs(self, #{id.to_s}, value);`
  end

  def class_eval(str, &block)
    #puts "block for class eval:"
    #puts block
    if block_given?
      `block(self)`
    else
      raise "need to compile str"
    end
  end

  def module_eval(str, &block)
    class_eval str, &block
  end

  def private
    self
  end

  def public
    self
  end

  def protected
    self
  end

  def include(mod)
    `self.include(mod)`
    nil
  end

  def extend(mod)
    `self.extend(mod)`
    nil
  end
end

