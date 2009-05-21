# 
#  javascript.rb
#  vienna
#  
#  Created by Adam Beynon on 2009-05-02.
#  Copyright 2009 Adam Beynon. All rights reserved.
# 

Vienna.require_all_libs_relative_to(__FILE__)

module Vienna
  
  module Builder
    
    class Javascript
    
      def initialize(source, dest, project)
        @source = source
        @destination = dest
        @project = project
      end
      
      def build!
        f = File.new(@source)
        t = f.read
        
        o = File.new(@destination, 'w')
        o.write(t)
        o.close
      end
     
    end
  end
end