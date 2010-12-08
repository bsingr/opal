module Kernel

  # def require(require_path)
    # Opal.require_path require_path
  # end
  
  # # remove this!!!!!!!
  #  def puts(a)
  #    `console.log(#{a})`
  #    nil
  #  end
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
