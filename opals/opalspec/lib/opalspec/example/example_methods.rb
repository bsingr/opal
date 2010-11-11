

module Spec
  
  module Example
    
    module ExampleMethods
      
      # include Spec::Matchers
      
      def initialize(example_proxy, &implementation)
        # puts "initialize imp:"
        # puts implementation.inspect
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
        @example_proxy.description
      end
      
      def execute(run_options, instance_variables)
        run_options.reporter.example_started @example_proxy
        execution_error = nil
        
        # puts "executing.."
        begin
          # puts "befote"
          before_each_example
          # instance_eval &@implementation
          # puts "instance eval.."
          # puts @implementation.inspect
          instance_eval(&@implementation)
        rescue Exception => e
          # puts "ExampleMethods#execute rescuing"
          execution_error = e
        end
        
        run_options.reporter.example_finished @example_proxy.update(description), execution_error
      end
    end
  end
end
