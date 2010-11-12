# 
# terminal_formatter.rb
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
    
    module Formatter
      
      class TerminalFormatter
        
        attr_reader :example_group
        
        attr_reader :example_group_number
        
        def initialize(options)
          @options = options
          @example_group_number = 0
          @example_number = 0
        end
        
        def start(number_of_examples)
          # 
          # puts "STARTING SOME SPECS"
        end
        
        def end
          # @end_time = Time.now
          # puts "Completed #{@example_number} specs."
        end
        
        def example_group_started(example_group)
          @example_group = example_group
          # puts "starting: #{example_group.description}"
        end
        
        def example_started(example)
          @example_number += 1
        end
        
        def example_failed(example, counter, failure)
          # puts "FAILEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD"
          puts "\033[0;31m#{@example_group.description}: #{example.description}\033[m"
          puts ""
          # `console.log(#{failure.exception})`
          puts "  #{failure.exception.message}"
          puts ""
          # puts "\033[0;31FAILURE: #{@example_group.description} - #{example.description}\033[m"
        end
        
        def example_passed(example)
          # example_failed example, nil, nil
          # puts "  PASSED: #{example.description}"
          puts "\033[0;32m#{@example_group.description}: #{example.description}\033[m"
        end
        
        def example_pending(example, message)
          puts "\033[0;33m#{@example_group.description}: #{example.description}\033[m"
        end
        
      end
    end
  end
end
