module Spec
  
  module Example
    
    # Instance methods of an actual example/it
    module ExampleMethods
      
      include Spec::Matchers
      # include Spec::Pending
      
      # Initialized for every it statement. Ivars are set, before/after blocks
      # run, etc. implementation is the actual block, which is instant evald so
      # it has access to Matchers, which is included
      # 
      def initialize(example_proxy, &implementation)
        # puts "i1"
        @_proxy = example_proxy
        # puts "i2"
        @_implementation = implementation
        # puts @_implementation
      end
      
      def before_each_example
        run_before_each
      end
      
      def run_before_each
        example_group_hierarchy.run_before_each(self)
      end
      
      def example_group_hierarchy
        self.class.example_group_hierarchy
      end
      
      # Description for example
      # 
      def description
        @_proxy.description
      end
      
      # Actually run example
      # 
      def execute(run_options, instance_variables)
        # puts "in example_methods#execute"
        run_options.reporter.example_started(@_proxy)
        execution_error = nil
        
        begin
          before_each_example
          instance_eval(&@_implementation)
        rescue Exception => e
          # puts "the execution error is #{e.inspect}"
          execution_error = e
        end
        
        # if execution_error
          # puts "found an execution error! #{execution_error}"
        # end
        
        run_options.reporter.example_finished(@_proxy.update(description), execution_error)
        true
      end
      
    end
  end
end
