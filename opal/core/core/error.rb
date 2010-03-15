class Exception
  
  # def initialize(message)
  #   if message
  #     @message = message
  #   else
  #     @message = `#{self}.klass.iv_tbl.__classid__`
  #   end
  # end
  
end

class SystemExit < Exception; end

class Fatal < Exception; end

class SignalException < Exception; end

class Interrupt < SignalException; end

class StandardError < Exception; end

class TypeError < StandardError; end

class ArgumentError < StandardError; end

class IndexError < StandardError; end

class KeyError < IndexError; end

class RangeError < StandardError; end

class ScriptError < Exception; end

class SyntaxError < ScriptError; end

class LoadError < SyntaxError; end

class NotImplementedError < StandardError; end

class NameError < StandardError; end

class NoMethodError < NameError; end

class RuntimeError < StandardError; end
