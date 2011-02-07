class Proc

  def to_proc
    self
  end

  def call(*args)
    `args.unshift(self.$self);
    return self.apply(null, args);`
  end
end
