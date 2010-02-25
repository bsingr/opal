module Spec
  
  module Matchers
    
    def be_nil
      Matcher.new(:be_nil, nil) do |exp|
        match do |actual|
          actual.nil?
        end
        
        failure_message_for_should do |actual|
          "expected nil, got #{actual.inspect}"
        end
        
        failure_message_for_should_not do |actual|
          "expected not nil, got nil"
        end
      end
    end
    
    def be_false
      Matcher.new(:be_false, false) do |exp|
        match do |actual|
          actual == false
        end
        
        failure_message_for_should do |actual|
          "expected false, got #{actual.inspect}"
        end
        
        failure_message_for_should_not do |actual|
          "expected not false, got false"
        end
      end
    end
    
    def be_true
      Matcher.new(:be_true, true) do |exp|
        match do |actual|
          actual == true
        end
        
        failure_message_for_should do |actual|
          "expected true, got #{actual.inspect}"
        end
        
        failure_message_for_should_not do |actual|
          "expected not true, got true"
        end
      end
    end
    
  end # end Matchers
end
