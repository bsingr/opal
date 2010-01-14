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
    FileUtils.mkdir_p(File.join(@parent.tmp_prefix, bundle_name, 'resources'))
    # FileUtils.mkdir_p(File.join(@parent.build_prefix, 'Frameworks', bundle_name))
  end
  end
end
