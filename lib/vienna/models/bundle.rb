# 
#  base.rb
#  vienna
#  
#  Created by Adam Beynon on 2009-05-20.
#  Copyright 2009 Adam Beynon. All rights reserved.
# 

module Vienna
  
  # Base class for applications and frameworks. Note: this is not used for locales
  # as they require seperate behaviour, and an application and framework can have
  # locales of their own. Both apps and frameworks can also have sub frameworks
  # which they respectively contain. A framework relies on having a root project.
  # 
  # This will be extenede later to also hold bundles: kind of plugin system for 
  # cocoa and vienna.
  class Bundle

    def initialize(bundle_root, parent=nil)
      @bundle_root = bundle_root
      @parent = parent
      @prepared = false
      
      # Linking configuration
      @link_config = {}
      
      # linked files
      @linked_files = []
    end

    def rakefile
      @rakefile ||= Rakefile.new.load!(@bundle_root)
    end
    
    def bundle_root
      @bundle_root
    end
    
    # This looks in the project dir for all locale folders and makes an array
    # of languages that need to be processed during the build stage
    def locales
      @locales ||= Dir.glob(File.join(bundle_root, '*.lproj'))
    end
    
    # Gets a list of all Javascript source files to build. These do not really
    # have to be processed, but out list will be passed on for combining
    def javascript_sources
      @javascript_soruces ||= Dir.glob(File.join(bundle_root, '*.js'))
    end
    
    def objc_sources
      @objc_sources ||= Dir.glob(File.join(bundle_root, '*.{m,c}'))
    end
    
    def xib_sources
      @xib_sources ||= Dir.glob(File.join(bundle_root, '*.xib'))
    end
    
    def plist_sources
      @plist_sources ||= Dir.glob(File.join(bundle_root, '*.plist'))
    end
    
    def prepare!
      # build paths
      FileUtils.mkdir_p(build_prefix)
      FileUtils.mkdir_p(File.join(build_prefix, 'Frameworks'))
      FileUtils.mkdir_p(File.join(build_prefix, 'Resources'))
      FileUtils.mkdir_p(tmp_prefix)
      FileUtils.mkdir_p(File.join(tmp_prefix, project_name))
    end
    
    def is_prepared?
      @prepared
    end
    
    # builds the bundle. Basically compiles each "good" file type, and puts it into the respective
    # tmp directory. These are not combined. link! is VERY different from build!
    # 
    # build! is for each file, link! is for the bundle/framework/app.
    def build!
      prepare! unless is_prepared?
      
      # Objective C Files
      objc_sources.each do |c|
        builder = ObjectiveCParser.new(c, File.join(@parent.tmp_prefix, bundle_name, 'objects', File.basename(c, '.*')) + '.js', @parent)
        builder.build!
        @link_config[File.basename(c, '.m') + '.js'] = builder.link_config
      end
      
      # Javascript files
      javascript_sources.each do |j|
        builder = Vienna::Builder::Javascript.new(j, File.join(@parent.tmp_prefix, bundle_name, 'objects', File.basename(j)), @parent)
        builder.build!
        @link_config[File.basename(j)] = builder.link_config
        builder.link_frameworks.each do |r|
          @parent.required_frameworks << r unless @parent.required_frameworks.include? r
        end
      end
      
      # save link config for the bundle, to speed up compiling (avoids rebuilding everyfile all the time)
      File.open(File.join(@parent.tmp_prefix, bundle_name, 'objects') + '/Linkfile', 'w') do |out|
        YAML.dump(@link_config, out)
      end
      
      # add self to list of built frameworks
      
      # go through all required frameworks..
      @parent.required_frameworks.each do |f|
        
        if !@parent.should_build_framework? f
          puts "Skipping: #{f}"
          next
        end
        
        path = find_framework(f)
        if path
          puts "Found framework named #{f}"
          @parent.add_built_framework f
          framework = Framework.new path, @parent
          framework.build!
        else
          puts "Error: cannot find framework named #{f}"
        end
      end
    end
    
    # link all JS resources into the openFile, which, by name, is open (so just write)
    def link!(openFile)
      all_objects = Dir.glob(File.join(@parent.tmp_prefix, bundle_name, 'objects', '*.js'))
      all_objects.each do |f|
        file = File.new(f)
        t = file.read
        openFile.write t
        file.close
      end
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
    
    def bundle_name
      @project_name ||= File.basename(bundle_root)
    end
    
    def project_SDK
      @project_SDK ||= (rakefile.config_for(build_mode)[:SDK] || 'javascript')
    end
    
    def system_frameworks
      @system_frameworks ||= File.expand_path(File.join(LIBPATH, '..', 'SDKs', project_SDK, 'frameworks'))
    end
    
    def project_frameworks
      @project_frameworks ||= File.expand_path(File.join(bundle_root, 'frameworks'))
    end
    
    def required_frameworks
      @required_frameworks ||= []
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
      name = name.to_s.downcase
      f = Dir.new(system_frameworks)
      f.each do |x|
        if x.downcase == name
          return File.join(system_frameworks, x)
        end
      end
      # else, return nil: cant find framework
      return nil
    end
  end
end