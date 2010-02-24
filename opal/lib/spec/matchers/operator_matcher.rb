module Spec
  
  module Matchers
    
    class OperatorMatcher
      
      def initialize(actual)
        @actual = actual
      end
      
      # Define methods for each of the following operators
      # 
      ['==', '===', '=~', '>', '>=', '<', '<='].each do |op|
        define_method(op) do |exp|
          eval_match(@actual, op, exp)
        end
      end
      
      # Try match
      # 
      def eval_match(actual, operator, expected)
        @operator = operator
        @expected = expected
        __delegate_operator(actual, operator, expected)
      end
      
      # Fail message generator
      # 
      def fail_with_message(message)
        Spec::Expectations.fail_with(message, @expected, @actual)
      end
      
    end
    
    class PositiveOperatorMatcher < OperatorMatcher
      
      def __delegate_operator(actual, operator, expected)
        if actual.__send__(operator, expected)
          true
        else
          fail_with_message("expected: #{expected.inspect}, but got: #{actual.inspect} (using #{operator})")
        end
      end
    end
    
    class NegativeOperatorMatcher < OperatorMatcher
      
      def __delegate_operator(actual, operator, expected)
        if actual.__send__(operator, expected)
          fail_with_message("expected not: #{expected.inspect}, but got: #{actual.inspect} (using #{operator})")
        else
          false
        end
      end
    end
  end  
end
