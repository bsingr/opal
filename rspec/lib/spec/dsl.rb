
module Spec
  
  module DSL
    
    module Main
      
      def describe(name, &block)
        puts "describing..#{name}"
        `print(block)`
        puts "err, yeah"
        Spec::Example::ExampleGroupFactory.create_example_group name, &block
      end
      
    end # Main
  end
end

# raise "about to main"
include Spec::DSL::Main
