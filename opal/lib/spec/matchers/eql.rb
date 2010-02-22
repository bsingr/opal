module Spec
  
  module Matchers
    
    def self.eql(expected)
      Matcher.new(:eql, expected) do |exp|
        match do |actual|
          actual.eql?(exp)
        end
        
      end
      puts "well.."
    end
  end
end
