# 
#  project.rb
#  vienna
#  
#  Created by Adam Beynon on 2009-05-02.
#  Copyright 2009 Adam Beynon. All rights reserved.
# 

module Vienna
  
  class Project
    
    attr_accessor :project_root
    
    def initialize(project_root)
      @project_root = project_root
      @cached_objc_files = Hash.new
      
      # require File.join(project_root, 'config')
      
    end
    
    def build!
      m_files = Dir.glob(File.join(%w[** *.m]))
      m_files.each do |m|
        source = File.expand_path(m)
        destination = File.dirname(source) + "/" + File.basename(source, ".m") + ".js"
        p = ObjectiveCParser.new source, destination, self
        p.build!
      end
    end
    
    
    def add_objc_file(file)
      @cached_objc_files.store file.file_path, file
    end
    
    def has_objc_file?(file_path)
      @cached_objc_files.has_key? file_path
    end
    
    def get_objc_file(file_path)
      @cached_objc_files[file_path]
    end
    
  end
  
end