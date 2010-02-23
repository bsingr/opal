module Spec
  
  module Example
    
    module BeforeAndAfterHooks
      
      def self.before_suite_parts
        @before_suite_parts ||= []
      end
      
      def self.after_suite_parts
        @after_suite_parts ||= []
      end
      
      def append_before(scope, &block)
        scope = :each unless scope
        before_parts(scope) << block
      end
      
      alias_method :before, :append_before
      
      def before_each_parts
        @before_each_parts ||= []
      end
      
      def before_all_parts
        @before_all_parts ||= []
      end
      
      def before_suite_parts
        BeforeAndAfterHooks.before_suite_parts
      end
      
      def before_parts(scope)
        case scope
        when :each
          before_each_parts
        when :all
          before_all_parts
        when :suite
          before_suite_parts
        end
      end
      
    end # end BeforeAndAfterHooks
  end
end
