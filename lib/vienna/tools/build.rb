module Vienna
  
  class Tools
    
    def self.build
      parser = ObjectiveC.new
      parser.tokenize_file "MyFile.m"
      parser.tokens.each do |first, second|
        puts "[#{first}, #{second}]"
      end
      parser.parse
      puts parser.result
    end
    
  end
  
end