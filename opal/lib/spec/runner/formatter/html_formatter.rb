module Spec
  
  module Runner
    
    module Formatter
      
      # Formatter used in browser context. Assumes document already contains the
      # required structure. Build the document as tests are run
      # 
      class HtmlFormatter
        
        attr_reader :example_group
        
        attr_reader :example_group_number
        
        def initialize(options)
          @options = options
          @example_group_number = 0
          @example_number = 0
          @header_red = nil
        end
        
        # Results div where to append all results
        # 
        def results_output
          Element[:results]
        end
        
        def example_group_started(example_group)
          @example_group = example_group
          @example_group_red = false
          @example_group_number += 1
          # puts "insert <div class='example_group_#{example_group_number}'>"
          # puts results_output
          @example_group_div = results_output.div :class => "example_group"
          @example_group_dl = @example_group_div.dl
          @example_group_dt = @example_group_dl.dt(example_group.description, :id => "example_group_#{example_group_number}")
        end
        
        def example_started(example)
          @example_number += 1
        end
        
        def example_passed(example)
          # move_progress
          # puts "insert <div class='spec passed'>#{example.description}"
          @example_group_dl.dd(:class => "spec passed").span(example.description, :class => "passed_spec_name")
        end
        
        def example_failed(example, counter, failure)
          @header_red = true
          make_red Element['rspec-header']
          make_red @example_group_dt
          @example_group_red = true
          # puts "a"
          dd = @example_group_dl.dd(:class => "spec failed")
          # puts "b"
          dd.span(example.description, :class => "failed_spec_name")
          # puts "c"
          failure_div = dd.div :class => "failure"
          # puts failure.exception
          failure_div.div(:class => "message").pre(failure.exception.message)
          # puts "e"
          # puts failure.header
        end
        
        def example_pending(example, message)
          make_yellow(Element['rspec-header']) unless @header_red
          make_yellow(@example_group_dt) unless @example_group_red
          @example_group_dl.dd(:class => "spec not_implemented").span("example.description (PENDING: #{message})", :class => "not_implemented_spec_name")
        end
        
        def make_red(element)
          element.css :background => "#C40D0D", :color => "#FFFFFF"
        end
        
        def make_yellow(element)
          element.css :background => "#FAF834", :color => "#000000"
        end
        
      end
    end
  end
end
