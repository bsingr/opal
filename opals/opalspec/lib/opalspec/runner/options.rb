# 
# options.rb
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

module Spec
  
  module Runner
    
    class Options
      
      # attr_accessor :reporter
      def reporter
        @reporter
      end
      
      def reporter=(reporter)
        @reporter = reporter
      end
      
      # attr_reader :example_groups
      def example_groups
        @example_groups
      end
      
      def initialize
        @example_groups = []
        @reporter = Reporter.new self
      end
      
      def run_examples
        puts "run_examples"
        runner = ExampleGroupRunner.new self
        puts "run"
        runner.run
      end
      
      def formatters
        puts "looking at formatters"
        return @formatters if @formatters
        puts "looking at ruby platform"
        puts RUBY_PLATFORM
        puts "www"
        if RUBY_PLATFORM == "browser"
          @formatters ||= [Spec::Runner::Formatter::HtmlFormatter.new(self)]
        else
          @formatters ||= [Spec::Runner::Formatter::TerminalFormatter.new(self)]
        end
      end
      
      def add_example_group(example_group)
        @example_groups << example_group
      end
      
    end # Options
  end
end
