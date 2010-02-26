module Spec
  
  module DSL
    
    module Main
      # include Spec::Example::ArgsAndOptions
      
      def describe(*args, &block)
        Spec::Example::ExampleGroupFactory.create_example_group(*args, &block)
        # instance_eval &block
        # a = Class.new
        # puts a
      end
      
      # def it(*args, &block)
      #   a = Spec::Matchers
      #   # puts args
      #   a.instance_eval &block
      # end
      
      # alias :context :describe
      
    end # end Main
  end
end

include Spec::DSL::Main
