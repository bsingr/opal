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
    Opal.require_path require_path
  end
  
  # remove this!!!!!!!
  def puts(a)
    `console.log(#{a})`
    nil
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

require 'opal/kernel'
require 'opal/basic_object'
require 'opal/dir'
require 'opal/enumerator'
require 'opal/file'
require 'opal/hash'
require 'opal/io'
require 'opal/match_data'
require 'opal/proc'
require 'opal/range'
require 'opal/regexp'
require 'opal/ruby'
require 'opal/top_self'
