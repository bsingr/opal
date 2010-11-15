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
    `#{self}.$opal.require(#{require_path});
    return #{true};`
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
require 'opalruby/string'
require 'opalruby/symbol'
require 'opalruby/top_self'
require 'opalruby/true_class'


# =================================
# = Testing stuff goes below here =
# =================================

puts "=====\n Testing\n=====\n"

def do_something
  while true
    return 500
  end
end

puts do_something

puts "=====\nTesting Finished."
