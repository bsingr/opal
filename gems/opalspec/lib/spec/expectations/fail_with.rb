module Spec  
  module Expectations
    
    def self.fail_with(message, expected, target)
      raise Spec::Expectations::ExpectationNotMetError.new(message)
    end
  end
end
