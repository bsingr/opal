class Dir
  def self.getwd
    # OpalVM.getwd
    __getwd__
  end
  
  def self.glob(glob)
    # OpalVM.glob glob
    __glob__ glob
  end
  
  def self.[](globs)
    # glob globs
    __glob__ globs
  end
end
