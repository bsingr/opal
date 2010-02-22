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
        @_proxy = example_proxy
        @_implementation = implementation
      end
      
      # Description for example
      # 
      def description
        
      end
      
      # Actually run example
      # 
      def execute(run_options, instance_variables)
        
      end
      
    end
  end
end
