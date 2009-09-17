# 
# nodes.rb
# vienna
# 
# Created by Adam Beynon.
# Copyright 2009 Adam Beynon.
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

module Vienna
  
  class RubyParser
    
    def node_module(options)
      Vienna::RubyParser::RModule.new(self, options)
    end
    
    def node_class(options)
      Vienna::RubyParser::RClass.new(self, options)
    end
    
    # instance level def
    def node_def(*args)
    
    end
    
    # singleton level def
    def node_defs(*args)
    
    end
    
    # generic node, for use anywhere...
    def node_generic(type, options={})
      Vienna::RubyParser::RNode.new type, options
    end
    
    class RModule
      
      def initialize(parser, options)
        @parser = parser
        
        @body = options[:body]
        # puts options[:cpath]
      end
    end
    
    class RClass
      
      attr_accessor :parser
      
      def initialize(parser, options)
        @parser = parser
        
        @cpath = options[:cpath]
        @superclass = options[:superclass]
        @bodystmt = options[:bodystmt]
        
        # @parser.write "Writing class definition\n"
        # @parser.write "#{@cpath}\n"
        # @parser.write "#{@superclass}\n"
        # @parser.write "#{@bodystmt}\n"
        # @parser.write self
        @parser.generate_class self
      end
      
      def js_name
        "c#{@cpath[:cname]}"
      end
      
      def klass_name
        @cpath[:cname]
      end
      
      def super_klass
        # @superclass
        ""
      end
    end
    
    class RNode
      
      def initialize(type, options={})
        @type = type
        @options = options
      end
      
      def [](id)
        @options[id]
      end
      
      def type
        @type
      end
      
      def to_s
        "(#{@type}: #{@options.inspect})"
      end
    end
    
  end
end