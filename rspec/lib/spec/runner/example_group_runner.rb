# 
# example_group_runner.rb
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
    
    class ExampleGroupRunner
      
      def initialize(options)
        @options = options
      end
      
      def run
        puts "preparing"
        prepare
        puts "example group each"
        # puts example_groups.inspect
        example_groups.each do |group|
          puts "running group #{group.inspect}"
          group.run @options
        end
        puts "finish.."
        finish
      end
      
      def example_groups
        # puts @options
        @options.example_groups
      end
      
      def prepare
        rep = reporter
        # puts rep
        rep.start number_of_examples
      end
      
      def finish
        # puts "finishing"
        # reporter.end
      end
      
      def reporter
        @options.reporter
      end
      
      def number_of_examples
        0
      end
      
    end # ExampleGroupRunner
  end
end
