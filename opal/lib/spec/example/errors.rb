module Spec
  
  module Example
    
    class ExamplePendingError < StandardError
    
    end
      
    class NotYetImplementedError < ExamplePendingError
      MESSAGE = "Not Yet Implemented"
      def initialize
        super MESSAGE
      end
    end
    
  end
end
