# 
#  project.rb
#  vienna
#  
#  Created by Adam Beynon on 2009-05-02.
#  Copyright 2009 Adam Beynon. All rights reserved.
# 

module Vienna
  
  attr_reader :project_root
  
  class Project
    
    def initialize(project_root)
      @project_root = project_root
    end
    
  end
  
end