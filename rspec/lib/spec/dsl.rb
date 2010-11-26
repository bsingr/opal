
module Spec
  
  module DSL
    
    module Main
      
      def describe(name, &block)
        # puts Spec::Example::ExampleGroupFactory.create_example_group
        # raise "in descrube"
        Spec::Example::ExampleGroupFactory.create_example_group name, &block
      end
      
    end # Main
  end
end

# raise "about to main"
include Spec::DSL::Main
