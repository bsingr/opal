module Spec  
  module Runner
    module Formatter
      class HtmlFormatter
        
        attr_reader :example_group, :example_group_number
        
        def initialize(options)
          @options = options
          @example_group_number = 0
          @example_number = 0
          @header_red = nil
          
          setup_page_dom
        end
        
        ##
        # Get the DOM ready for output
        #
        def setup_page_dom
          content = [
            '<div class="rspec-report">',
              '<div id="rspec-header">',
                '<div id="label">',
                  '<h1>Rspec Code Examples</h1>',
                '<div>',
                
                '<div id="summary">',
                  '<p id="totals">0</p>',
                  '<p id="duration">0</p>',
                '</div>',
              '</div>',
              '<div id="results">',
              '</div>',
            '</div>'
          ].join ''
          
          puts "content is: "
          puts content
        end
        
        def start(number_of_examples)

        end
        
        def end
          @end_time = Time.now
        end
        
        def results_output
          @results_output ||= Browser::Element.from_native(`document.getElementById('results')`)
        end
        
        def example_group_started(example_group)
          @example_group = example_group
          @example_group_red = false
          # @example_group_number += 1
          
          @example_group_div = results_output.div :class_name => "example_group"
          @example_group_dl = @example_group_div.dl
          @example_group_dt = @example_group_dl.dt :content  => example_group.description, :id       => "example_group_#{example_group_number}"
        end
        
        def example_started(example)

        end
        
        def example_failed(example, counter, failure)
          @header_red = true
          @example_group_red = true
          
          dd = @example_group_dl.dd :class_name => "spec failed"
          
          dd.span :content => example.description,
                  :class_name => "failed_spec_name"
          
          failure_div = dd.div :class_name => "failure"
          failure_div.div(:class_name => "message").pre(:content => failure.exception.message)
        end
        
        def example_passed(example)
          @example_group_dl.dd(:class_name => "spec passed").span(:content => example.description, :class_name => "passed_spec_name")
        end
        
        def example_pending(example, message)
          @example_group_dl.dd(:class_name => "spec not_implemented").span(:content => "#{example.description} (PENDING: #{message})", :class_name => "not_implemented_spec_name")
        end
      end
    end
  end
end
