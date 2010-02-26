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
        # puts "started example group #{example_group.description.inspect}"
        @example_group = example_group
        formatters.each do |f|
          f.example_group_started(example_group)
        end
      end
      
      def example_started(example)
        # puts "example started #{example.description.inspect}"
        formatters.each do |f|
          f.example_started(example)
        end
      end
      
      def example_finished(example, error)
        @example_count += 1
        # puts "error is #{error.inspect}"
        # puts error
        if error.nil?
          example_passed(example)
        # need to check if error is the pending error
        elsif Spec::Example::ExamplePendingError === error
          example_pending(example, error.message)
        else
          # puts "comparing #{error} to #{Spec::Example::ExamplePendingError}"
          example_failed(example, error)
        end
      end
      
      def example_passed(example)
        # puts "example passed #{example.description.inspect}"
        formatters.each do |f|
          f.example_passed(example)
        end
      end
      
      def example_failed(example, error)
        failure = Failure.new(@example_group.description, example.description, error)
        @failures << failure
        formatters.each do |f|
          f.example_failed(example, @failures.length, failure)
        end
      end
      
      def example_pending(example, message)
        @pending_count += 1
        formatters.each do |f|
          f.example_pending(example, message)
        end
      end
      
      def start(number_of_examples)
        @start_time = Time.now
        # formatters.each do |f|
          # f.start(number_of_examples)
        # end
      end
      
      def end
        @end_time = Time.now
      end
      
      def dump
        time_taken = (@end_time - @start_time) / 1000
        puts "Finished in #{time_taken} seconds"
      end
      
      def formatters
        @options.formatters
      end
      
      
      class Failure
        
        attr_reader :exception
        
        def initialize(group_description, example_description, exception)
          @example_name = "#{group_description} #{example_description}"
          @exception = exception
        end
        
        def header
          if expectation_not_met?
            "#{@example_name} FAILED"
          else
            "#{@exception.class.name} in #{@example_name}"
          end
        end
        
        def expectation_not_met?
          true
        end
        
      end # end Failure
      
    end # end Reporter
  end
end
