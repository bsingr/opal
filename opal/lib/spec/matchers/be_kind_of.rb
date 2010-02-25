module Spec
  
  module Matchers
    
    def be_a_kind_of(expected)
      Matcher.new(:be_a_kind_of, expected) do |expected|
        match do |actual|
          actual.kind_of?(expected)
        end
      end
    end
    
    alias_method :be_kind_of, :be_a_kind_of
    
  end # end Matchers
end
