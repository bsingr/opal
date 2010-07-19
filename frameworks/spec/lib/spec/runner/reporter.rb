# 
# reporter.rb
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
    
    class Reporter
      
      attr_reader :options
      
      def initialize(options)
        @options = options
        @options.reporter = self
        @failures = []
        @pending_count = 0
        @example_count = 0
      end
      
      def start(number_of_examples)
        # puts "starting"
        # @start_time = Time.now
        @start_time = 0
        formatters.each do |f|
          f.start number_of_examples
        end
      end
      
      def formatters
        @options.formatters
      end
      
      def example_group_started(example_group)
        @example_group = example_group
        formatters.each do |f|
          f.example_group_started example_group
        end
      end
      
      def example_started(example)
        puts "example_started #{example}"
      end
      
      def example_finished(example, error)
        # @example_count += 1
        
        if error.nil?
          puts "error was nil"
        else
          puts "error was not nil"
          puts error
        end
      end
      
    end # Reporter
  end
end
