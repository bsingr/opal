class Dir
  
  def self.getwd
    `return #{self}.opal.IO.getwd();`
  end
  
  def self.glob(glob)
    `return #{self}.opal.IO.glob(#{glob});`
  end
  
  def self.[](globs)
    glob globs
  end
end
