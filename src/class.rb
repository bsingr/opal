class Class

  def new(*args)
    `var obj = self.m$allocate();
    obj.m$initialize.apply(obj, args);
    return obj;`
  end

  def allocate
    `return new self.allocator();`
  end
  
  def superclass
    `var sup = self.$super;

    if (!sup) {
      if (self == $opal.BasicObject) return Qnil;
      throw new Error("uninitialized class");
    }

    return sup;`
  end
end
