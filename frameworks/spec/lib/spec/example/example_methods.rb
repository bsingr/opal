# 
# example_methods.rb
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
  
  module Example
    
    module ExampleMethods
      
      # include Spec::Matchers
      
      def initialize(example_proxy, &implementation)
        @example_proxy = example_proxy
        @implementation = implementation
      end
      
      def before_each_example
        run_before_each
      end
      
      def run_before_each
        example_group_hierarchy.run_before_each self
      end
      
      def example_group_hierarchy
        self.class.example_group_hierarchy
      end
      
      def description
        @description
      end
      
      def execute(run_options, instance_variables)
        run_options.reporter.example_started @example_proxy
        execution_error = nil
        
        begin
          before_each_example
          # instance_eval &@implementation
          instance_eval &@implementation
        rescue Exception => e
          # puts "ExampleMethods#execute rescuing"
          execution_error = e
        end
        
        run_options.reporter.example_finished @example_proxy.update(description), execution_error
      end
    end
  end
end
