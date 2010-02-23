module Spec
  
  module Example
    
    class ExampleProxy
      
      attr_reader :description
      
      def initialize(description, options, location)
        @description = description
      end
      
    end # ExampleProxy end
  end
end
