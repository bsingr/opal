module Spec
  
  module Example
    
    class ExampleGroupFactory
      
      def self.register_example_group(klass)
        Spec::Runner.options.add_example_group klass
        # puts "need to add #{klass} to runner"
      end
      
      def self.create_example_group(*args, &block)
        # puts "here #{args.to_s}"
        ExampleGroup.describe(*args, &block)
      end
    end
  end
end
