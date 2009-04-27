module Vienna
  
  class Tools
    
    def self.build
      parser = ObjectiveJ.new
      parser.tokenize_file "MyFile.j"
      parser.tokens.each do |first, second|
        #puts "[#{first}, #{second}]"
      end
      parser.parse
      puts parser.result
    end
    
  end
  
end