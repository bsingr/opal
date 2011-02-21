class Proc

  def to_proc
    self
  end

  def call(*args)
    # `args.unshift(self.$self);
    `return self.apply(self.$self, args);`
  end
end
