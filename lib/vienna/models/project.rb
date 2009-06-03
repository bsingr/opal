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
      @prepared_status = true
      # build paths
      FileUtils.mkdir_p(build_prefix)
      FileUtils.mkdir_p(File.join(build_prefix, 'Frameworks'))
      FileUtils.mkdir_p(File.join(build_prefix, 'Resources'))
      FileUtils.mkdir_p(tmp_prefix)
      FileUtils.mkdir_p(File.join(tmp_prefix, bundle_name, 'objects'))
    end
    
    def build!
      prepare! unless is_prepared?
      puts "Building #{bundle_name}"
      
      frameworks.each do |f|
        f.build!
      end
      
      objc_sources.each do |c|
        ObjectiveCParser.new(c, File.join(tmp_prefix, bundle_name, 'objects', File.basename(c, '.m')) + '.js', self).build!
      end
      
      javascript_sources.each do |j|
        # puts j
      end
      
      all_objects = Dir.glob(File.join(tmp_prefix, bundle_name, 'objects', '*.js'))
      bundle_out = File.new(build_prefix + "/#{bundle_name}.js", 'w')
      
      all_objects.each do |o|
        f = File.new o
        t = f.read
        bundle_out.write t
      end
      
      bundle_out.close
      
    end  
    
    def clean!
      puts "Cleaning project (Not yet implemented)"
    end  
    
    # Returns an array of all the frameworks required by this application. This
    # might, but never should, be nil... so be careful when using and relying on
    # contents
    def frameworks
      return @frameworks if @frameworks
      
      @frameworks = []
      required.each do |f|
        framework_dir = find_framework f
        if framework_dir #and should_build_framework?(f)
          @frameworks << Framework.new(framework_dir, self) 
          add_built_framework(f)
        elsif framework_dir.nil?
          puts "Error: cannot find framework named: #{f}"
        else
          puts "not building: #{f}"
        end
      end
      return @frameworks
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
      @built_frameworks.include? a_framework ? false : true
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
