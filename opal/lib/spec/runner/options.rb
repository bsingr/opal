module Spec
  
  module Runner
    
    class Options
      
      attr_reader :example_groups
      
      def initialize
        @example_groups = []
      end
      
      def add_example_group(example_group)
        @example_groups << example_group
      end
      
      def remove_example_group(example_group)
        @example_groups.delete(example_group)
      end
      
      def project_root
        @project_root ||= 'example'
      end
      
      def run_examples
        runner = ExampleGroupRunner.new(self)
        runner.run
      end
      
    end # end Options
  end
end
