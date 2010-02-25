module Spec
  
  module Matchers
    
    def be_an_instance_of(expected)
      Matcher.new(:be_an_instance_of, expected) do |expected|
        match do |actual|
          actual.instance_of?(expected)
        end
      end
    end
    
  end # end Matchers
end
