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
      
      puts build_prefix
    end
    
    def rakefile
      @rakefile ||= Rakefile.new.load!(@project_root)
    end
    
    # Returns an array of all the frameworks required by this application. This
    # might, but never should, be nil... so be careful when using and relying on
    # contents
    def frameworks
      return @frameworks if @frameworks
      
      the_frameworks = rakefile.config_for(:debug)[:required]
      @frameworks = []
  
      if the_frameworks.class == String
        @frameworks << Framework.new
      elsif the_frameworks.class == Array
        the_frameworks.each do |f|
          @frameworks << f
        end
      end
    end
    
    # This looks in the project dir for all language folders and makes an array
    # of languages that need to be processed during the build stage
    def languages
      
    end
    
    def prepare!
      frameworks()
      languages()
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
    
    
    def build_prefix
      @build_prefix ||= (rakefile.config_for(:debug)[:build_prefix] || 'build')
    end
    
    def tmp_prefix
      @build_prefix ||= (rakefile.config_for(:debug)[:tmp_prefix] || 'build/tmp')
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
