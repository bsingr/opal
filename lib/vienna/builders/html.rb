# 
#  html.rb
#  vienna
#  
#  Created by Adam Beynon on 2009-05-19.
#  Copyright 2009 Adam Beynon. All rights reserved.
# 

module Vienna
  
  module Builder
    
    class Html
      
      def initialize(source, dest, project)
        @source = source
        @destination = dest
        @project = project
      end
      
      def build!
        f = File.new(@source)
        t = f.read
        o = File.new(@destination, 'w')
        o.write t
      end
    end
    
  end
  
end