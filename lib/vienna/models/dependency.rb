# 
#  dependency.rb
#  vienna
#  
#  Created by Adam Beynon on 2009-05-21.
#  Copyright 2009 Adam Beynon. All rights reserved.
# 

module Vienna
  
  module Models
    
    # Used to represent a class chain of dependencys for framerworks/applications
    # within a project. one instance is kept, by the project, and it maintains a 
    # collection of how frameworks depend on eachother for the linking stage in
    # the __bootstrap stages at runtime. These are automatically pressed into 
    # the index.html files suring compilation, and relies on haveing the :required
    # setting in the framework Rakefile. A lack of one assumes no dependencies.
    class FrameworkDependency
      
    end
    
    # Used per framework, and representes how files require other files, only in 
    # the same framework/application/bundle. These are calculated based on how
    # classes inherit from eachother, and these are then generalised to a per 
    # file basis, so the most dependices from a class in a file results in all
    # objects in that file reaching their optimal peak requirement. Again, one
    # of these objects is needed per bundle.
    # 
    # This is stored in the temp build root for the framework as 
    # FrameworkName.link
    class ObjectDependency
      
    end
  end
end