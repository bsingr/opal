module Spec
  
  module Runner
    
    class Reporter
      
      attr_reader :options
      
      def initialize(options)
        @options = options
        @options.reporter = self
        @failures = []
        @pending_count = 0
        @example_count = 0
      end
      
      def example_group_started(example_group)
        puts "started example group #{example_group.description.inspect}"
        @example_group = example_group
        formatters.each do |f|
          f.example_group_started(example_group)
        end
      end
      
      def example_started(example)
        puts "example started #{example.description.inspect}"
        formatters.each do |f|
          f.example_started(example)
        end
      end
      
      def example_finished(example, error)
        @example_count += 1
        
        if error.nil?
          example_passed(example)
        # need to check if error is the pending error
        else
          example_failed(example, error)
        end
      end
      
      def example_passed(example)
        puts "example passed #{example.description.inspect}"
        formatters.each do |f|
          f.example_passed(example)
        end
      end
      
      def start(number_of_examples)
        # @start_time = Time.now
        formatters.each do |f|
          f.start(number_of_examples)
        end
      end
      
      def end
        # @end_time = Time.now
      end
      
      def formatters
        @options.formatters
      end
      
    end # end Reporter
  end
end
