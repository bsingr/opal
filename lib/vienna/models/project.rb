# 
#  project.rb
#  vienna
#  
#  Created by Adam Beynon on 2009-05-02.
#  Copyright 2009 Adam Beynon. All rights reserved.
# 

module Vienna
  
  class Project < Vienna::Bundle
    
    attr_accessor :project_root
    
    # Initialize with a string for the root of the project. This is used by all
    # subprojects etc as a reference point
    def initialize(project_root)
      super
      # cached files - saves them being processed more than once (on large builds)
      @cached_objc_files = Hash.new
      # cache built frameworks so we do not have to rebuild them more than once
      @built_frameworks = []
    end
    
    def prepare!
      # build paths
      FileUtils.mkdir_p(build_prefix)
      FileUtils.mkdir_p(File.join(build_prefix, 'Frameworks'))
      FileUtils.mkdir_p(File.join(build_prefix, 'Resources'))
      FileUtils.mkdir_p(tmp_prefix)
      FileUtils.mkdir_p(File.join(tmp_prefix, bundle_root))
    end
    
    def build!
      prepare! unless is_prepared?
      puts "Building #{bundle_root}"
      
      frameworks.each do |f|
        f.build!
      end
      
    end    
        
    # Gets the build mode. If not set, defaults to debug
    def build_mode
      @build_mode ||= :debug
    end
    
    # Sets build mode: optional.. defaults to debug if not set
    def build_mode=(build)
      @build_mode = build
    end
    
    def add_framework(a_framework)
      @built_frameworks << a_framework
    end
    
    def has_framework?(a_framework)
      @built_frameworks.include? a_framework
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
