require 'spec/matchers/operator_matcher'
require 'spec/matchers/generated_descriptions'
require 'spec/matchers/eql'
require 'spec/matchers/be'
require 'spec/matchers/be_kind_of'
require 'spec/matchers/be_an_instance_of'

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
        # puts "setting actual to #{actual.inspect}"
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
      
      def failure_message_for_should(&block)
        if block
          @failure_message_for_should_block = block
        else
          @failure_message_for_should_block.call(@actual)
        end
      end
      
      def failure_message_for_should_not(&block)
        if block
          @failure_message_for_should_not_block = block
        else
          @failure_message_for_should_not_block.call(@actual)
        end
      end
      
    end # end Matxher
  end # end Matchers
end
