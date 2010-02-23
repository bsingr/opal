require 'spec/matchers/operator_matcher'
require 'spec/matchers/eql'

module Spec
  
  module Matchers
    
    class Matcher
      include Spec::Matchers
      
      attr_reader :expected, :actual
      
      def initialize(name, expected, &declarations)
        
      end
      
    end
  
    
    
  end # end Matchers
end
