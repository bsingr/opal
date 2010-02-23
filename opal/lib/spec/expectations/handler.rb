module Spec
  
  module Expectations
    
    class PositiveExpectationHandler
      
      def self.handle_matcher(actual, matcher, message, &block)
        Spec::Matchers.last_should = :should
        Spec::Matchers.last_matcher = matcher
        # puts "trying #{actual}"
        # puts nil == matcher
        return Spec::Matchers::PositiveOperatorMatcher.new(actual) if matcher.nil?
        
        # puts "must use normal matcher #{matcher.inspect}"
        match = matcher.matches?(actual)
        return match if match
        
        Spec::Expectations.fail_with "must have failed"
        # if we have a matcher, we should not use PositiveOperator
        # if matcher
          # puts "need to use normal"
        # else
          # Spec::Matchers::PositiveOperatorMatcher.new(actual)
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
