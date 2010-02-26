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
        # puts "preparing"
        prepare
        # puts "doing each"
        example_groups.each do |group|
          # puts "an each"
          # puts group
          group.run(@options)
        end
        # puts "finishing"
        finish
      end
      
      # Get all example groups for this runner
      # 
      def example_groups
        @options.example_groups
      end
      
      def prepare
        reporter.start(number_of_examples)
      end
      
      def finish
        reporter.send('end')
        reporter.dump
      end
      
      def reporter
        @options.reporter
      end
      
      def number_of_examples
        0
      end
    end
  end
end

