
module Spec
  
  module Example
    
    class ExampleProxy
      
      # attr_reader :description
      def description
        @description
      end
      
      def initialize(description, options, location)
        # puts "initialize description is #{description}"
        @description = description
      end
      
      def update(description)
        # puts "update description is #{description}"
        @description = description
        self
      end
      
    end
  end
end
