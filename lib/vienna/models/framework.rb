# 
#  framework.rb
#  vienna
#  
#  Created by Adam Beynon on 2009-05-19.
#  Copyright 2009 Adam Beynon. All rights reserved.
# 

module Vienna
  
  # A framework is typically seen as a subproject of the main project, and this
  # is really built into the build system. Even when developing frameworks, a
  # main application is usually the major project as a means of testing the 
  # actual frameworks in question. The project will ask each child framework to
  # build itself (which includes any application, as it asks the Vienna frameworks)
  # to build as part of the build process.
  # 
  # A framework has its own rakefiles which it can use to perform custom build
  # tasks and routines.
  class Framework
    
    # initialize a framework. First looks in the project_root/frameworks dir,
    # but if nothing found, then looks in the system frameworks dir. If nothing
    # is found in this dir, then it is deemed that the framework does not exist.
    # i.e. there are only 2 valid locations for frameworks.
    # 
    # Frameworks should also only be included once: that is, by this stage the
    # project should filter out frameworks if they have already been included.
    # 
    # === Param
    #  a_project:: Project object which is the parent
    #  a_name::    Framework name (e.g.) AppKit, in which to look for
    # 
    # Frameworks must be named that of its parent Folder
    def initialize(a_project, a_name)
      @parent_project = a_project
      @name = a_name
    end
    
    def prepare!
      
    end
    
    def is_prepared?
      
    end
    
    def build!
      
    end
  end
end
