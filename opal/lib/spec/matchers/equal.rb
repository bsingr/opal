module Spec
  module Matchers
    
    def equal(expected)
      Matcher.new(:equal, expected) do |exp|
        match do |actual|
          actual.equal?(exp)
        end
        
        def inspect_object(o)
          "#<#{o.class}:#{o.object_id}> => #{o.inspect}"
        end
        
        failure_message_for_should do |actual|
          "expected #{inspect_object(exp)}, but got #{inspect_object(actual)} (using equal?)"
        end
      end
    end
    
  end
end
