module Spec
  
  module Example
    
    module ExampleGroupMethods
      
      def self.matcher_class
        @matcher_class
      end
      
      def self.matcher_class=(matcher_class)
        @matcher_class = matcher_class
      end
      
      def self.build_description_from(*args)
        "description text"
      end
            
      # make describe metod available
      # 
      def describe(*args, &group_block)
        subclass(*args, &group_block)
      end
      
      def example(*args)
        puts "in it #{args.inspect}"
      end
      
      alias_method :it, :example
      
      # Create the subclass for describe context
      # 
      def subclass(*args, &group_block)
        # @class_count ||= 0
        # @class_count += 1
        # puts @class_count
        klass = const_set("Adam", Class.new(self))
        puts klass
        ExampleGroupFactory.register_example_group(klass)
        klass.module_eval(&group_block)
        klass
      end
      
    end #end ExampleGroupMethods
  end
end
