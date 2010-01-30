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
    
    def node_args(arg, opt, rest, post, block)
      Vienna::RubyParser::RArgsNode.new arg, opt, rest, post, block
    end
    
    def node_module(options)
      Vienna::RubyParser::RModule.new options
    end
    
    def node_class(options)
      Vienna::RubyParser::RClass.new options
    end
    
    # instance level def
    def node_def(*args)
    
    end
    
    # singleton level def
    def node_defs(*args)
    
    end
    
    # generic node, for use anywhere...
    def node type, options={}
      Vienna::RubyParser::RNode.new type, options
    end
    
    class RArgsNode
      
      attr_reader :arg, :opt, :rest, :post, :block
      
      def initialize(a,o,r,p,b)
        @arg = a
        @opt = o
        @rest = r
        @post = p
        @block = b
      end
      
      # for generator
      def to_s
        arg_length
      end
      
      def arg_size
        @arg ? @arg.length : 0
      end
      
      def opt_size
        @opt ? @opt.length : 0
      end
      
      def rest_size
        @rest ? @rest.length : 0
      end
      
      def post_size
        @post ? @post.length : 0
      end
      
      def block_size
        @block ? @block.length : 0
      end
    end
    
    class RModule
      
      attr_accessor :bodystmt
      
      def initialize options
        @bodystmt = options[:body]
        @cpath = options[:cpath]
        # puts options[:cpath]
      end
      
      def node
        :module
      end
      
      def js_name
        @js_name ||= "m#{@cpath[:cname]}"
      end
      
      def klass_name
        @klass_name ||= @cpath[:cname]
      end
      
      def super_klass
        "cObject"
      end
    end
    
    class RClass
      
      attr_accessor :bodystmt
      
      def initialize options      
        @cpath = options[:cpath]
        @superclass = options[:superclass]
        @bodystmt = options[:bodystmt]
      end
      
      def node
        :klass
      end
      
      def js_name
        @js_name ||= "c#{@cpath[:cname]}"
      end
      
      def klass_name
        @klass_name ||= @cpath[:cname]
      end
      
      def super_klass
        @superclass
      end
    end
    
    class RNode
      
      def initialize(node, options={})
        @node = node
        @options = options
      end
      
      def [](id)
        @options[id]
      end
      
      def []=(id, val)
        @options[id] = val
      end
      
      def node
        @node
      end
      
      def to_s
        "('#{@node}' #{@options.inspect})"
      end
      
      def inspect
        "('#{@node}' #{@options.inspect})"
      end
    end
    
  end
end