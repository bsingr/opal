
module Spec
  
  module Example
    
    module ExampleGroupMethods
      
      # puts "including before and after hooks"
      include Spec::Example::BeforeAndAfterHooks
      
      def describe group_name, &group_block
        # puts "describing in her instead! #{group_name}"
        # puts group_block.inspect
        subclass group_name, &group_block
      end
      
      def subclass group_name, &group_block
        # @class_count = @class_count || 0
        @class_count ||= 0
        # puts "a"
        # @class_count += 1
        # b = Class.new(self)
        # puts "a.b"
        klass = const_set "Subclass#{@class_count}", Class.new(self)
        # puts "b"
        # puts "setting klass description to"
        # puts group_name
        # `console.log(klass.class_name)`
        # puts "our class:"
        # puts klass.inspect
        # `console.log(#{klass}['$description='](#{klass}, #{nil}, 100))`
        klass.description = group_name
        # puts "c"
        Spec::Example::ExampleGroupFactory.register_example_group klass
        
        # puts "group block is:"
        # puts group_block.inspect
        klass.module_eval(&group_block)
        klass
      end
      
      def it(example_name, &implementation)
        # puts "defining example: #{example_name}"
        example_proxy = Spec::Example::ExampleProxy.new example_name
        example_proxies << example_proxy
        example_implementations[example_proxy] = implementation || pending_implementation
        example_proxy
      end
      
      # alias_method :it, :example
      # alias_method :specify, :example
      
      def description
        @description ||= "PLACEHOLDER DESCRIPTION"
      end
      
      def description=(description)
        # `console.log("AKAKAKAKAKAKAKAKAAA")`
        # puts "setting description to " #{}"#{descrption}"
        # puts description
        # `console.log(#{description})`
        @description = description
        self
      end
      
      def pending_implementation
        proc {
          raise Spec::Example::NotYetImplementedError
        }
      end
      
      def run(run_options)
        # puts "need to run group: #{description}"
        # puts self.description
        examples = examples_to_run run_options
        notify run_options.reporter
        success = true
        before_all_instance_variables = nil
        
        run_before_all run_options
        
        run_examples success, before_all_instance_variables, examples, run_options
        
        run_after_all run_options
      end
      
      def run_examples(success, instance_variables, examples, run_options)
        examples.each do |example|
          puts "running #{example.description}"
          example_group_instance = new example, 
                                       &example_implementations[example]
          
          example_group_instance.execute run_options, instance_variables
        end
      end
      
      def run_before_all(run_options)
        # puts "running before all for #{description}"
        # puts before_all_parts
        
        # for now just run.. worry about scope later
        before_all_parts.each do |part|
          part.call
        end
      end
      
      def run_after_all(run_options)
        after_all_parts.each do |part|
          part.call
        end
      end
      
      def notify(reporter)
       reporter.example_group_started Spec::Example::ExampleGroupProxy.new(self)
      end
      
      def examples_to_run(run_options)
        example_proxies
      end
      
      def example_proxies
        @example_proxies ||= []
      end
      
      def example_implementations
        @example_implementations ||= {}
      end
      
      def example_group_hierarchy
        @example_group_hierarchy ||= Spec::Example::ExampleGroupHierarchy.new self
      end
    end
  end
end
