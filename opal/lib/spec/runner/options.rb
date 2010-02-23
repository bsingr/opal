module Spec
  
  module Runner
    
    class Options
      
      attr_reader :example_groups
      
      attr_accessor :reporter
      
      def initialize
        @example_groups = []
        @reporter = Reporter.new(self)
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
      
      def formatters
        []
      end
      
    end # end Options
  end
end
