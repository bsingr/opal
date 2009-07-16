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
      @parent = self
      # cached files - saves them being processed more than once (on large builds)
      @cached_objc_files = Hash.new
      # cache built frameworks so we do not have to rebuild them more than once
      @built_frameworks = []
    end
    
    def prepare!
      @prepared_status = true
      # build paths
      FileUtils.mkdir_p(build_prefix)
      FileUtils.mkdir_p(File.join(build_prefix, 'resources'))
      FileUtils.mkdir_p(tmp_prefix)
      FileUtils.mkdir_p(File.join(tmp_prefix, bundle_name, 'objects'))
      FileUtils.mkdir_p(File.join(tmp_prefix, bundle_name, 'resources'))
    end
    
    def clean!
      puts "Cleaning project (Not yet implemented)"
    end
        
    def build!
      super
      
      # link javascript
      f = File.new(File.join(@parent.build_prefix, 'application.js'), 'w')
      link_javascript!(f)
      f.close()
      
      # link stylesheets
      f = File.new(File.join(@parent.build_prefix, 'style.css'), 'w')
      link_css!(f)
      f.close()
      
      # index.html
      o = File.new(File.join(build_prefix, 'index.html'), 'w')
      File.readlines('index.html').map do |f|
        o.write f
      end
      o.close()
    end
    
    
    # Gets the build mode. If not set, defaults to debug
    def build_mode
      @build_mode ||= :debug
    end
    
    # Sets build mode: optional.. defaults to debug if not set
    def build_mode=(build)
      @build_mode = build
    end
    
    def add_built_framework(a_framework)
      @built_frameworks << a_framework
    end
    
    def should_build_framework?(a_framework)
      test = @built_frameworks.include?(a_framework) ? false : true
      # puts test
      return test
    end
    
    # ========================================================================
    # = Caching objective C files to avoid re-parsing headers multiple times =
    # ========================================================================
    
    # add a file to the cache
    def add_objc_file(file)
      @cached_objc_files.store file.file_path, file
    end
    
    # check to see if the file is cached
    def has_objc_file?(file_path)
      @cached_objc_files.has_key? file_path
    end
    
    # return a cached file.
    def get_objc_file(file_path)
      @cached_objc_files[file_path]
    end
    
  end
  
end
