class Exception
  # we also need to set err.$m to the right method table incase a subclass adds
  # custom methods.. just get this from the klass: self.
  def self.allocate
    `var err = new Error();
    err.$klass = self;
    return err;`
  end

  def initialize(message = '')
    `return self.message = message;`
  end

  def message
    `return self.message;`
  end
  
  def inspect
    `return "#<" + self.$klass.__classid__ + ": '" + self.message + "'>";`
  end

  def to_s
    `return self.message;`
  end
end

class StandardError < Exception; end
class RuntimeError < Exception; end
class LocalJumpError < StandardError; end
class TypeError < StandardError; end

class NameError < StandardError; end
class NoMethodError < NameError; end
class ArgumentError < StandardError; end

class ScriptError < Exception; end
class LoadError < ScriptError; end

class IndexError < StandardError; end
class KeyError < IndexError; end
class RangeError < StandardError; end

