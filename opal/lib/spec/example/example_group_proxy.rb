module Spec
  
  module Example
    
    class ExampleGroupProxy
      
      def initialize(example_group)
        @description = example_group.description
        # @nested_descriptions = example_group.nested_descriptions
        @examples = example_group.example_proxies
        # @options = example_group.options
      end
      
      attr_reader :description
      
      attr_reader :nested_descriptions
      
      attr_reader :examples
      
      attr_reader :options
      
    end #end ExampleGroupProxy
  end
end
