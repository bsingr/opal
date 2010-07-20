# 
# html_formatter.rb
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
      
      class HtmlFormatter
        
        attr_reader :example_group
        
        attr_reader :example_group_number
        
        def initialize(options)
          @options = options
          @example_group_number = 0
          @example_number = 0
          @header_red = nil
        end
        
        def start(number_of_examples)
          # @start_time = Time.now
        end
        
        def end
          @end_time = Time.now
        end
        
        def results_output
          @results_output ||= Browser::Element.from_native(`document.getElementById('results')`)
        end
        
        def example_group_started(example_group)
          @example_group = example_group
          @example_group_red = false
          # @example_group_number += 1
          
          @example_group_div = results_output.div :class_name => "example_group"
          @example_group_dl = @example_group_div.dl
          @example_group_dt = @example_group_dl.dt :content  => example_group.description, :id       => "example_group_#{example_group_number}"
        end
        
        def example_started(example)
          # @example_number += 1
        end
        
        def example_failed(example, counter, failure)
          @header_red = true
          # make_red Element['rspec-header']
          # make_red @example_group dt
          @example_group_red = true
          
          dd = @example_group_dl.dd :class_name => "spec failed"
          
          dd.span :content => example.description,
                  :class_name => "failed_spec_name"
          
          failure_div = dd.div :class_name => "failure"
          `console.log(#{failure.exception});`
          failure_div.div(:class_name => "message").pre(:content => failure.exception.message)
        end
        
        def example_passed(example)
          @example_group_dl.dd(:class_name => "spec passed").span(:content => example.description, :class_name => "passed_spec_name")
        end
        
        def example_pending(example, message)
          # make_yellow Element['rspec-header'] unless @header_red
          # make_yellow(@example_group_dt) unless @example_group_red
          @example_group_dl.dd(:class_name => "spec not_implemented").span(:content => "#{example.description} (PENDING: #{message})", :class_name => "not_implemented_spec_name")
        end
      end
    end
  end
end
