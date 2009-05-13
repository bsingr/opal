# 
#  objective_c_ouput.rb
#  vienna
#  
#  Created by Adam Beynon on 2009-05-13.
#  Copyright 2009 Adam Beynon. All rights reserved.
# 

module Vienna
  
  class ObjectiveCParser
    
    def output_to_file(file)
      f = File.new(file, 'w')
      @implementation_definitions.each do |i|
        output_implementation(f, i)
      end
  	  f.close
    end
    
  end
  
end