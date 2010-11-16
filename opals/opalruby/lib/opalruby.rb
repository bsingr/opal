module Kernel
  # Try to load the library or file named `require_path`. Causes an error to be
  # thrown if required path cannot be found.
  # 
  # For in browser async loading, only use string paths. String paths must use 
  # their base package name as well (e.g. 'cherry_kit/views/view'). Non string
  # names will and cannot be async loaded. (for example, File.join... etc will
  # not be async loaded
  # 
  # @param [String] require_path
  # @return [Boolean] success
  def require(require_path)
    OpalVM.require_path require_path
  end
end

class String
  def to_s
    self
  end
  
  def inspect
    `return '"' + #{self} + '"';`
  end
end

class Symbol
  def to_s
     `return #{self}.__ptr__;`
  end
end

require 'opalruby/module'
require 'opalruby/kernel'
require 'opalruby/symbol'
require 'opalruby/string'
require 'opalruby/array'
require 'opalruby/basic_object'
require 'opalruby/class'
require 'opalruby/dir'
require 'opalruby/enumerator'
require 'opalruby/error'
require 'opalruby/false_class'
require 'opalruby/file'
require 'opalruby/hash'
require 'opalruby/io'
require 'opalruby/match_data'
require 'opalruby/nil_class'
require 'opalruby/numeric'
require 'opalruby/proc'
require 'opalruby/range'
require 'opalruby/regexp'
require 'opalruby/ruby'
# require 'opalruby/string'
# require 'opalruby/symbol'
require 'opalruby/top_self'
require 'opalruby/true_class'


# =================================
# = Testing stuff goes below here =
# =================================

puts "=====\n Testing\n=====\n"

class A
  class B
    
  end
end

puts "=====\nTesting Finished."
