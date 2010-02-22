module Spec
  
  module Runner
    
    class ExampleGroupRunner
      
      def initialize(options)
        @options = options
      end
      
      # Load files.
      # 
      def load_files(files)
        puts files
      end
      
      # Do actual run
      # 
      def run
        example_groups.each do |group|
          group.run(@options)
        end
      end
      
      # Get all example groups for this runner
      # 
      def example_groups
        @options.example_groups
      end
    end
  end
end

