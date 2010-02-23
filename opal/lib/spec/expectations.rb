require 'spec/expectations/fail_with'
require 'spec/expectations/handler'
require 'spec/expectations/errors'

module Kernel
  
  def should(matcher, message, &block)
    # puts "in should!"
    # puts Spec::Expectations
    Spec::Expectations::PositiveExpectationHandler.handle_matcher(self, matcher, message)
  end
  
  def should_not(matcher, message, &block)
    Spec::Expectations::NegativeExpectationHandler.handle_matcher(self, matcher, message)
  end  
end
