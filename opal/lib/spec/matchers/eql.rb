module Spec
  
  module Matchers
    
    def eql(expected)
      Matcher.new(:eql, expected) do |exp|
        match do |actual|
          actual.eql?(exp)
        end
        
        failure_message_for_should do |actual|
          "expected: #{exp.inspect} but got: #{actual.inspect} (compared using eql?)"
        end
        
        failure_message_for_should_not do |actual|
          "expected: #{exp.inspect} not to equal: #{actual.inspect} (compared using eql?)"
        end
      end
    end
    
  end
end
