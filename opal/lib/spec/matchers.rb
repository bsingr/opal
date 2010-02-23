require 'spec/matchers/operator_matcher'
require 'spec/matchers/generated_descriptions'
require 'spec/matchers/eql'

module Spec
  
  module Matchers
    
    class Matcher
      include Spec::Matchers
      
      attr_reader :expected, :actual
      
      def initialize(name, expected, &declarations)
        @name = name
        @expected = expected
        instance_exec(expected, &declarations)
      end
      
      def matches?(actual)
        @actual = actual
        begin
          result = @match_block.call(actual)
          return result
        rescue
          return false
        end
        return false
        # puts "RESULT: #{result}"
      end
      
      def match(&block)
        @match_block = block
      end
      
    end # end Matxher
  end # end Matchers
end
