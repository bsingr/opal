class Class

  # def new(*args)
  #   `var obj = self.$m.allocate(self);
  #   args.unshift(obj);

  #   obj.$m.initialize.apply(null, args);

  #   return obj;`
  # end

  # This is what new should be: need to fix compiler for splat args
  #
  # def new(*args)
  #   obj = allocate
  #   obj.initialize *args
  #   obj
  # end

  def superclass
    `var sup = self.$super;

    if (!sup) {
      if (self == $opal.BasicObject) return Qnil;
      throw new Error('RuntimeError: uninitialized class');
    }

    return sup;`
  end
end
