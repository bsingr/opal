class Exception

end

class StandardError < Exception; end
class RuntimeError< Exception; end
class LocalJumpError < StandardError; end
class TypeError < StandardError; end
class NameError < StandardError; end
class NoMethodError < NameError; end
class ArgumentError < StandardError; end
class ScriptError < Exception; end
class LoadError < ScriptError; end

