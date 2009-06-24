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
      # FileUtils.mkdir_p(File.join(@parent.build_prefix, 'Frameworks', bundle_name))
    end
    
    
    def link_object_file(file, out)
      
      return if @linked_files.include? file
      
      all_objects = Dir.glob(File.join(@parent.tmp_prefix, bundle_name, 'objects', '*.js'))
      object_path = File.join(@parent.tmp_prefix, bundle_name, 'objects')
      
      return unless all_objects.include?(object_path + '/' + file)

      @linked_files << file
      
      # puts @link_config[file]["dependencies"]
      if @link_config[file]
        # has linked files, so include (.m, not .js)
        @link_config[file]["dependencies"].each do |d|
          link_object_file(d + '.js', out)
        end
      end
      
      f = File.new(object_path + "/" + file)
      t = f.read
      out.write t
      # puts "Writing content of #{file}"
      
    end
  end
end
