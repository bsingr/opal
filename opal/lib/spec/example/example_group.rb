module Spec
  
  module Example
    
    class ExampleGroup
      extend Spec::Example::ExampleGroupMethods
      include Spec::Example::ExampleMethods
      # FIXME: shouldnt need this here. Object.extend isnt behaving.
      extend Spec::Example::BeforeAndAfterHooks
    end
  end
end
