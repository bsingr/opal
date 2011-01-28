require 'opalspec/matchers/operator_matcher'
require 'opalspec/matchers/be'
require 'opalspec/matchers/generated_descriptions'


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
