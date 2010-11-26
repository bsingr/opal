
module Spec
  module Example
    
    module BeforeAndAfterHooks
      
      def before(scope = :each, &block)
        # `console.log(#{block});`
        # puts "we got a block! #{block}"
        before_parts(scope) << block
      end
      
      # alias_method :append_before, :before
      
      def before_each_parts
        @before_each_parts ||= []
      end
      
      def before_all_parts
        @before_all_parts ||= []
      end
      
      def before_parts(scope)
        case scope
        when :each
          before_each_parts
        when :all
          before_all_parts
        end
      end
      
      
      def after(scope = :each, &block)
        after_parts(scope) << block
      end
      
      def after_each_parts
        @after_each_parts ||= []
      end
      
      def after_all_parts
        @after_all_parts ||= []
      end
      
      def after_parts(scope)
        case scope
        when :each
          after_each_parts
        when :all
          after_all_parts
        end
      end
      
    end
  end
end
