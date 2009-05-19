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
    
    # Initialize with a string for the root of the project. This is used by all
    # subprojects etc as a reference point
    def initialize(project_root)
      # project root (string)
      @project_root = project_root
      # cached files - saves them being processed more than once (on large builds)
      @cached_objc_files = Hash.new
      # An array of frameworks (sub projects)
      @frameworks = []
      # Language packs (sub projects)
      @languages = []
      # Rakefile for project
      @rakefile = nil
    end
    
    def prepare!
      rake = Rakefile.new
      rake.load! "Rakefile"
    end
    
    def is_prepared?
      
    end
    
    def build!
      m_files = Dir.glob(File.join(%w[** *.m]))
      m_files.each do |m|
        source = File.expand_path(m)
        destination = File.dirname(source) + "/build/" + File.basename(source, ".m") + ".js"
        p = ObjectiveCParser.new source, destination, self
        p.build!
      end
      
      index_html = Vienna::Builder::Html.new(File.join(@project_root, '/index.html'), File.join(@project_root, '/build/index.html'), self)
      index_html.build!
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
