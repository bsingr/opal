# 
#  build.rb
#  vienna
#  
#  Created by Adam Beynon on 2009-05-02.
#  Copyright 2009 Adam Beynon. All rights reserved.
# 

module Vienna
  
  class Tools
  
    # Builds a Vienna app in the current workign directory. Currently doesnt check
    # if it is valid. This will be chnaged in future to check for plist and Rakefile
    # etc...
    def self.build
      # p = Project.new Dir.getwd
      p = Vienna::NewProject.new Dir.getwd
      puts "preparing: #{p.project_root}"
      p.prepare!
      puts "building: #{p.project_name}"
      p.build!
      puts "root file: #{p.root_file}"
      puts "library path: #{p.system_lib_root}"
      
      puts "all frameworks used:"
      puts p.all_frameworks
    end
  
    # Cleans a vienna project working directory. Basically removes the build 
    # directory.
    def self.clean
      p = Project.new Dir.getwd
      p.clean!
    end
  
  end  
end
