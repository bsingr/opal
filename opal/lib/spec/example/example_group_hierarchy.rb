module Spec
  
  module Example
    
    class ExampleGroupHierarchy
      
      def initialize(example_group_class)
        @example_group_class = example_group_class
      end
      
      def run_before_each(example)
        @example_group_class.before_each_parts.each do |part|
          # part.call
          example.instance_eval(&part)
        end
        # puts "run_before_each #{@example_group_class.inspect} #{@example_group_class.before_each_parts}"
        # puts @example_group_class.before_each_parts
        # example.instance_eval do
          # puts before_each_parts
        # end
      end
    end
  end
end
