require 'spec/matchers/operator_matcher'
require 'spec/matchers/be'
require 'spec/matchers/generated_descriptions'


module Spec
  
  module Matchers
    
    class Matcher
      # include Spec::Matchers
      # extend Spec::Matchers
      
      # attr_reader :expected, :actual
      
      def initialize(name, expected, &declarations)
        @name = name
        @expected = expected
        instance_exec expected, &declarations
      end
      
    end # Matcher
  end # Matchers
end # Spec
