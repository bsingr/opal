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
  class Framework  < Vienna::Bundle
        
    def prepare!
      @prepared_status = true
      FileUtils.mkdir_p(File.join(@parent.tmp_prefix, bundle_name, 'objects'))
      FileUtils.mkdir_p(File.join(@parent.build_prefix, 'Frameworks', bundle_name))
    end
    
    def build!
      prepare! unless is_prepared?
      
      puts "Building framework: #{bundle_name}"
      
      frameworks.each do |f|
        f.build!
      end
      
      # =======================================================================
      # = Compiling stage - all files actually compiled and copied to tmp dir =
      # =======================================================================
      
      objc_sources.each do |c|
        # puts " - Building file: #{File.basename(c)}"
        builder = ObjectiveCParser.new(c, File.join(@parent.tmp_prefix, bundle_name, 'objects', File.basename(c, '.m')) + '.js', @parent)
        builder.build!
        @link_config[File.basename(c, '.m') + '.js'] = builder.link_config
      end
      
      javascript_sources.each do |j|
        Vienna::Builder::Javascript.new(j, File.join(@parent.tmp_prefix, bundle_name, 'objects', File.basename(j)), @parent).build!
      end
      
      # ======================================================================
      # = Pre - linking all objects and making sure our link config is valid =
      # ======================================================================
      
      File.open(File.join(@parent.tmp_prefix, bundle_name, 'objects') + '/Linkfile', 'w') do |out|
        YAML.dump(@link_config, out)
      end
      
      # ==========================================================================
      # = Linking stage - all object files linked into one file using dependency =
      # ==========================================================================
      
      all_objects = Dir.glob(File.join(@parent.tmp_prefix, bundle_name, 'objects', '*.js'))
      framework_out = File.new(File.join(@parent.build_prefix, 'Frameworks', bundle_name) + "/#{bundle_name}.js", 'w')
      # all_objects.each do |i|
      #         f = File.new(i)
      #         t = f.read
      #         framework_out.write t
      #       end
      
      @link_config.each do |key, value|
        link_object_file(key, framework_out)
      end
      
      framework_out.close
    end
    
    def link_object_file(file, out)
      
      return if @linked_files.include? file
      
      all_objects = Dir.glob(File.join(@parent.tmp_prefix, bundle_name, 'objects', '*.js'))
      object_path = File.join(@parent.tmp_prefix, bundle_name, 'objects')
      
      return unless all_objects.include?(object_path + '/' + file)
      
      
      @linked_files << file
      
      # puts @link_config[file]["dependencies"]
      
      @link_config[file]["dependencies"].each do |d|
        link_object_file(d + '.js', out)
      end
      
      puts "Writing content of #{file}"
      
    end
    
    # Returns an array of all the frameworks required by this application. This
    # might, but never should, be nil... so be careful when using and relying on
    # contents
    def frameworks
      return @frameworks if @frameworks
      
      @frameworks = []
      required.each do |f|
        framework_dir = find_framework f
        if framework_dir #and @parent.should_build_framework?(f)
          @frameworks << Framework.new(framework_dir, @parent) 
          @parent.add_built_framework(f)
        elsif framework_dir.nil?
          puts "Error: cannot find framework named: #{f}"
        end
      end
      return @frameworks
    end
  end
end
