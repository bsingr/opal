module Spec
  
  module DSL
    
    module Main
      
      def describe(*args, &block)
        # puts args
        instance_eval &block
        # a = Class.new
        # puts a
      end
      
      def it(*args, &block)
        a = Spec::Matchers
        # puts args
        a.instance_eval &block
      end
      
      # alias :context :describe
      
    end # end Main
  end
end

include Spec::DSL::Main
