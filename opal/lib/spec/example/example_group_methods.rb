module Spec
  
  module Example
    
    module ExampleGroupMethods
      
      include Spec::Example::BeforeAndAfterHooks
      
      def self.matcher_class
        @matcher_class
      end
      
      def self.matcher_class=(matcher_class)
        @matcher_class = matcher_class
      end
      
      def self.build_description_from(*args)
        "description text"
      end
            
      # make describe metod available
      # 
      def describe(*args, &group_block)
        subclass(*args, &group_block)
      end
      
      alias_method :context, :describe
      
      def example(*args, &implementation)
        example_proxy = Spec::Example::ExampleProxy.new(*args)
        # puts "doing this #{args}"
        example_proxies << example_proxy
        example_implementations[example_proxy] = implementation || pending_implementation
        example_proxy
      end
      
      alias_method :it, :example
      alias_method :specify, :example
      
      # Default implementation if no block is given
      # 
      def pending_implementation
        Proc.new { raise(Spec::Example::NotYetImplementedError) } 
      end
      
      # Run this class' examples
      # 
      def run(run_options)
        examples = examples_to_run(run_options)
        notify(run_options.reporter)
        success = true
        before_all_instance_variables = nil
        run_examples(success, before_all_instance_variables, examples, run_options)
      end
      
      def set_description(*args)
        # should be @description_args
        @description = args.first
        self
      end
      
      def notify(reporter)
      reporter.example_group_started(Spec::Example::ExampleGroupProxy.new(self))
      end
      
      def description
        @description ||= "PLACEHOLDER DESCRIPTION"
      end
      
      def examples_to_run(run_options)
        example_proxies
      end
      
      def run_examples(success, instance_variables, examples, run_options)
        examples.each do |example|
          # puts example
          # puts example_implementations[example]
          example_group_instance = new(example, &example_implementations[example])
          example_group_instance.execute(run_options, instance_variables)
          # puts(new(example,&# example_implementations[example]))
        end
      end
      
      # Create the subclass for describe context
      # 
      def subclass(*args, &group_block)
        @class_count ||= 0
        @class_count += 1
        klass = const_set("Subclass#{@class_count}", Class.new(self))
        klass.set_description(*args)
        # puts klass
        Spec::Example::ExampleGroupFactory.register_example_group(klass)
        klass.module_eval(&group_block)
        klass
      end
      
      def example_proxies
        @example_proxies ||= []
      end
      
      def example_implementations
        @example_implementations ||= {}
      end
      
    end #end ExampleGroupMethods
  end
end
