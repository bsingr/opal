
require 'spec/expectations/fail_with'
require 'spec/expectations/handler'
require 'spec/expectations/errors'

module Kernel
  
  def should(matcher = nil, message = nil, &block)
    # `if (!#{matcher}) {#{matcher} = #{nil};}`
    # `if (!#{message}) {#{message} = #{nil};}`
    r = Spec::Expectations::PositiveExpectationHandler.handle_matcher self, 
                                                                  matcher, 
                                                                  message
  end
  
  def should_not(matcher = nil, message = nil, &block)
    Spec::Expectations::NegativeExpectationHandler.handle_matcher self,
                                                                  matcher,
                                                                  message
  end
end
