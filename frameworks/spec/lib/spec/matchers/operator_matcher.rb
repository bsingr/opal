# 
# operator_matcher.rb
# vienna
# 
# Created by Adam Beynon.
# Copyright 2010 Adam Beynon.
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#

module Spec
  
  module Matchers
    
    class OperatorMatcher
      
      def initialize(actual)
        @actual = actual
      end
      
      [:==, :===, :=~, :>, :<, :>=, :<=].each do |op|
        define_method(op) do |exp|
          puts "about to call eval_match"
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
