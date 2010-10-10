# 
# example_group_methods.rb
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
    
    module ExampleGroupMethods
      
      # puts "including before and after hooks"
      include Spec::Example::BeforeAndAfterHooks
      
      def describe group_name, &group_block
        # puts "describing in her instead!"
        # puts group_block
        subclass group_name, &group_block
      end
      
      def subclass group_name, &group_block
        # @class_count = @class_count || 0
        @class_count ||= 0
        # @class_count += 1
        klass = const_set "Subclass#{@class_count}", Class.new(self)
        klass.description = group_name
        
        Spec::Example::ExampleGroupFactory.register_example_group klass
        
        # puts group_block
        klass.module_eval &group_block
        klass
      end
      
      def it(example_name, &implementation)
        example_proxy = Spec::Example::ExampleProxy.new example_name
        example_proxies << example_proxy
        example_implementations[example_proxy] = implementation || pending_implementation
        example_proxy
      end
      
      # alias_method :it, :example
      # alias_method :specify, :example
      
      def description
        @description ||= "PLACEHOLDER DESCRIPTION"
      end
      
      def description=(description)
        @description = description
        self
      end
      
      def pending_implementation
        proc {
          raise Spec::Example::NotYetImplementedError
        }
      end
      
      def run(run_options)
        # puts "need to run group: #{description}"
        examples = examples_to_run run_options
        notify run_options.reporter
        success = true
        before_all_instance_variables = nil
        
        run_before_all run_options
        
        run_examples success, before_all_instance_variables, examples, run_options
        
        run_after_all run_options
      end
      
      def run_examples(success, instance_variables, examples, run_options)
        examples.each do |example|
          # puts "running #{example}"
          example_group_instance = new example, 
                                       &example_implementations[example]
          
          example_group_instance.execute run_options, instance_variables
        end
      end
      
      def run_before_all(run_options)
        # puts "running before all for #{description}"
        # puts before_all_parts
        
        # for now just run.. worry about scope later
        before_all_parts.each do |part|
          part.call
        end
      end
      
      def run_after_all(run_options)
        after_all_parts.each do |part|
          part.call
        end
      end
      
      def notify(reporter)
       reporter.example_group_started Spec::Example::ExampleGroupProxy.new(self)
      end
      
      def examples_to_run(run_options)
        example_proxies
      end
      
      def example_proxies
        @example_proxies ||= []
      end
      
      def example_implementations
        @example_implementations ||= {}
      end
      
      def example_group_hierarchy
        @example_group_hierarchy ||= Spec::Example::ExampleGroupHierarchy.new self
      end
    end
  end
end
