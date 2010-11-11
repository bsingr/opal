
module Spec
  
  module Matchers
    
    class OperatorMatcher
      
      def initialize(actual)
        @actual = actual
      end
      
      [:==, :===, :=~, :>, :<, :>=, :<=].each do |op|
        define_method(op) do |exp|
          # puts "about to call eval_match"
          eval_match @actual, op, exp
        end
      end
      
      def eval_match(actual, operator, expected)
        @operator = operator
        @expected = expected
        __delegate_operator actual, operator, expected
      end
      
      def fail_with_message(message)
        Spec::Expectations.fail_with message, @expected, @actual
      end
    end
    
    class PositiveOperatorMatcher < OperatorMatcher
      
      def __delegate_operator(actual, operator, expected)
        if actual.__send__ operator, expected
          true
        else
          fail_with_message "expected: #{expected.inspect}, but got: #{actual.inspect} (using #{operator})"
        end
      end
    end
  end
end
