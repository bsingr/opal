# 
#  build.rb
#  vienna
#  
#  Created by Adam Beynon on 2009-05-02.
#  Copyright 2009 Adam Beynon. All rights reserved.
# 

module Vienna
  
  class Tools
    
    def self.build
      p = Project.new Dir.getwd
      p.prepare!
      p.build!
    end
    
  end
  
end