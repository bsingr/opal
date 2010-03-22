# 
# common.rb
# vienna
# 
# Created by Adam Beynon.
# Copyright 2010 Adam Beynon.
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#


module URI
  
  module REGEXP
    
    # 
    # Patterns used to parse URI's
    # 
    module PATTERN
      
      ALPHA = "a-zA-Z"
      
      ALNUM = "#{ALPHA}\\d"
      
      HEX = "a-fA-F\\d"
      
      ESCAPED = "%[#{HEX}]{2}"
      
      UNRESERVED = "-_.!~*'()#{ALNUM}"
      
      RESERVED = ";/?:@&=+$,\\[\\]"
      
      DOMLABEL = "(?:[#{ALNUM}](?:[-#{ALNUM}]*[#{ALNUM}])?)"
      
      TOPLABEL = "(?:[#{ALNUM}](?:[-#{ALNUM}]*[#{ALNUM}])?)"
      
      HOSTNAME = "(?:#{DOMLABEL}\\.)*#{TOPLABEL}\\.?"
      
      
      
    end # module PATTERN
    
  end # module REGEXP
  
  class Parser
    include REGEXP
    
    def initialize(opts)
      @pattern = initialize_pattern(opts)
    end
    
    attr_reader :pattern, :regexp
    
    def split(uri)
      case uri
      when ''
        # nil uri
      else
        raise "not yet imp Parser#split"
      end
    end
    
    def parse(uri)
      puts self.split(uri)
      "uri"
    end
    
    def join(*str)
      
    end
    
    def extract(str, schemes, &block)
      
    end
    
    def make_regexp
      
    end
    
    def escape
      
    end
    
    def unescape
      
    end
    
    def initialize_pattern(opts)
      ret = {}
      ret[:ESCAPED] = escaped = PATTERN::ESCAPED
      ret[:UNRESERVED] = unreserved = PATTERN::UNRESERVED
      ret[:RESERVED] = reserved = PATTERN::RESERVED
      ret[:DOMLABEL] = domlabel = PATTERN::DOMLABEL
      ret[:TOPLABEL] = toplabel = PATTERN::TOPLABEL
        
      
      
      ret[:HOSTNAME] = hostname = PATTERN::HOSTNAME
      
      puts Regexp.new('^' + ret[:HOSTNAME] + '$')
      
      ret
    end
    
    def initialize_regexp(pattern)
      ret = {}
    end
    
  end # class Parser
  
  DEFAULT_PARSER = Parser.new
  
  module Util
    
  end # module Util
  
  # FIXME
  # extend Escape
  include REGEXP
  
  @schemes = {}
  def self.scheme_list
    @schemes
  end
    
  # 
  # Case class for all URI Exceptions
  # 
  class Error < StandardError; end
  
  # 
  # Not a URI.
  # 
  class InvalidURIError < Error; end
  
  # 
  # Not a URI component.
  # 
  class InvalidComponentError < Error; end
  
  # 
  # URI is valid, but usage is not.
  # 
  class BadURIError < Error; end
  
  # 
  # Splits the string on the following parts and returns array with result:
  # 
  #   * Scheme
  #   * UserInfo
  #   * Host
  #   * Port
  #   * Registry
  #   * Path
  #   * Opaque
  #   * Query
  #   * Fragment
  # 
  #     puts URI.split("http://www.opalscript.org/")
  #     # => ["http", nil, "www.opalscript.org", nil, nil, "/", nil, nil, nil]
  # 
  def self.split(uri)
    DEFAULT_PARSER.split(uri)
  end
  
  def self.parse(uri)
    DEFAULT_PARSER.parse(uri)
  end
end

module Kernel
  
  # 
  # alias for {URI.parse}
  # 
  def URI(uri_str)
    URI.parse(uri_str)
  end
end
