module Spec
  
  module Expectations
    
    class PositiveExpectationHandler
      
      def self.handle_matcher(actual, matcher, message)
        # if we have a matcher, we should not use PositiveOperator
        # if matcher
          # puts "need to use normal"
        # else
          Spec::Matchers::PositiveOperatorMatcher.new(actual)
        # end
      end
    end
    
    class NegativeExpectationHandler
      
      def self.handle_matcher(actual, matcher, message)
        Spec::Matchers::NegativeOperatorMatcher.new(actual)
      end
    end
    
  end
end
