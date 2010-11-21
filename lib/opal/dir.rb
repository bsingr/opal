class Dir
  def self.getwd
    OpalVM.getwd
  end
  
  def self.glob(glob)
    OpalVM.glob glob
  end
  
  def self.[](globs)
    glob globs
  end
end
