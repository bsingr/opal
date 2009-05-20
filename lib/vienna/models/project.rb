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
      
      puts objc_sources
    end
    
    def rakefile
      @rakefile ||= Rakefile.new.load!(@project_root)
    end
    
    # Returns an array of all the frameworks required by this application. This
    # might, but never should, be nil... so be careful when using and relying on
    # contents
    def frameworks
      return @frameworks if @frameworks
      
      @frameworks = []
      required.each do |f|
        framework_dir = find_framework f
        if framework_dir
          @frameworks << Framework.new(@project_root, framework_dir)
        else
          puts "Error: cannot find framework named: #{f}"
        end
      end
      return @frameworks
    end
    
    # This looks in the project dir for all locale folders and makes an array
    # of languages that need to be processed during the build stage
    def locales
      @locales ||= Dir.glob(File.join(project_root, '**/*.lproj'))
    end
    
    # Gets a list of all Javascript source files to build. These do not really
    # have to be processed, but out list will be passed on for combining
    def javascript_sources
      @javascript_soruces ||= Dir.glob(File.join(project_root, '**/*.js'))
    end
    
    def objc_sources
      @objc_sources ||= Dir.glob(File.join(project_root, '**/*.{m,c}'))
    end
    
    def prepare!
      FileUtils.mkdir_p(build_prefix)
      FileUtils.mkdir_p(tmp_prefix)
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
      @build_prefix ||= (rakefile.config_for(build_mode)[:build_prefix] || 'build')
    end
    
    def tmp_prefix
      @tmp_prefix ||= (rakefile.config_for(build_mode)[:tmp_prefix] || 'build/tmp')
    end
    
    def copyright_notice
      @copyright_notice ||= (rakefile.config_for(build_mode)[:copyright_notice] || '')
    end
    
    def user_name
      @user_name ||= (rakefile.config_for(build_mode)[:user_name] || 'Your Name')
    end
    
    def organization_name
      @organization_name ||= (rakefile.config_for(build_mode)[:organization_name] || 'My Company')
    end
    
    def required
      return @required_frameworks if @required_frameworks
      
      r = rakefile.config_for(build_mode)[:required]
      if r.class == Array
        return r
      elsif r.class == String or r.class == Symbol
        return [r.to_s]
      end
      
      return []
    end
    
    # Gets the build mode. If not set, defaults to debug
    def build_mode
      @build_mode ||= :debug
    end
    
    # Sets build mode: optional.. defaults to debug if not set
    def build_mode=(build)
      @build_mode = build
    end
    
    
    def find_framework(name)
      # normalize string
      name = name.to_s.downcase!
      system_frameworks = File.join(LIBPATH, '..', 'frameworks')
      f = Dir.new(system_frameworks)
      f.each do |x|
        if x.downcase == name
          return File.join(system_frameworks, x)
        end
      end
      
      # else, return nil: cant find framework
      return nil
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
