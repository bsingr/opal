module Spec
  
  module Example
    
    module BeforeAndAfterHooks
      
      def self.before_suite_parts
        # @before_suite_parts ||= []
      end
      
      def self.after_suite_parts
        # @after_suite_parts ||= []
      end
      
      def append_before(scope, &block)
        puts "wow, in here"
        # scope = :each unless scope
        # before_parts(scope) << block
      end
      
      alias_method :before, :append_before
      
    end # end BeforeAndAfterHooks
  end
end
