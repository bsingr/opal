
require 'opalspec/expectations/fail_with'
require 'opalspec/expectations/handler'
require 'opalspec/expectations/errors'

module Kernel
  
  def should(matcher = nil, message = nil, &block)
    # `if (!#{matcher}) {#{matcher} = #{nil};}`
    # `if (!#{message}) {#{message} = #{nil};}`
    r = Spec::Expectations::PositiveExpectationHandler.handle_matcher self, 
                                                                  matcher, 
                                                                  message
  end
  
  def should_not(matcher, message, &block)
    Spec::Expectations::NegativeExpectationHandler.handle_matcher self,
                                                                  matcher,
                                                                  message
  end
end
