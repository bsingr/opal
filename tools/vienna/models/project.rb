# 
# project.rb
# vienna
# 
# Created by Adam Beynon.
# Copyright 2010 Adam Beynon.
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#

module Vienna
  
  class Project
  
    attr_accessor :project_root
    
    attr_writer :project_name
    
    attr_reader :required_bundles
    
    # Hash. bundle_name => Vienna::Bundle instance. These are only for bundles/gems required
    # by the application. The app itself does not have a bundle. The project class
    # is used for building the bundle
    attr_reader :bundles
    
    # defaults are nil. only do something if these are not nil, i.e. use custom location
    attr_reader :application_path, :vendor_path
  
    def initialize(project_root)
      @project_root = project_root
      @required_bundles = ['vienna']
      @bundles = {}
      
      unless File.exist?(File.join(project_root, 'config', 'environment.rb'))
        abort 'Cannot find base environment file for project'
      end
      
      f = open(File.join(project_root, 'config', 'environment.rb')).map {|l| l.rstrip}.join("\n")
      instance_eval f
      
      # loaded environment.rb file. Now we can build each required gem/bundle.
      @required_bundles.each do |bundle|
        # find bundle
        if bundle == 'vienna'
          # if vienna, then use hardcoded path to vienna bundle
          @bundles['vienna'] = Vienna::GemBundle.new(File.expand_path(File.join(File.dirname(__FILE__), '..', '..', '..', 'lib', 'vienna')))
        else
          # find it in vendor path. if not exist, then error: we can't find it.
          abort "vendor gems currently not supported (#{bundle})"
        end
      end
    end
    
    def project_name
      @project_name ||= File.basename(project_root)
    end
    
    # Setup build directory:
     # 
     # project_root/
     #   build/
     #     tmp         # staging area
     #     web         # html based build
     #     osx         # mac osx compatible build
     #     win32       # win32 compatible build
     #     linux       # linux compatible build
     # 
     # For now, only 'web' is made (plus tmp for staging)
     # 
     def prepare!
       # should we "clean" the build directory?
       FileUtils.mkdir_p(File.join(project_root, 'build', 'tmp'))
       FileUtils.mkdir_p(File.join(project_root, 'build', 'web'))
     end

     def build!
       # build:
       # include ALL files in project_root/app and project_root/config
       # resources/files from other places will be used as necessary.
       # test will only be included for test runs, not default build.
       # lib includes taks etc, so dont include
       # bin are for building executables, not for runtime
       # stylesheets/images are located inside app folder. any images.css
       # outside should be ignored.
       # 
       # also, for web: include platforms/web .. this has extra stuff just
       # for js env that cannot be dynamically loaded at runtime, so make 
       # this part of the build hardcoded.

       # hardcoded web build
       @web_platform = Vienna::Platforms::Web.new(self)
       @web_platform.prepare!
       @web_platform.build!
       
       # hardcoded osx build
       # @osx_platform = Vienna::Platforms::OSX.new(self)
       # @osx_platform.prepare!
       # @osx_platform.build!

     end
    
    # Used for evaling in the environment.rb file
    def application(options={}, &block)
      block.call(self)
    end
    
    # Used for evaling in environemtn.rb file. 
    # Specifies a required gem for the application.
    # 
    # For now, the gem must be in the vendor directory, or an error will be
    # thrown. 'vienna' is the only exception, as this is already added by 
    # default.
    def gem(name, options={})
      @required_bundles.push(name) unless @required_bundles.include?(name)
    end
    
    # Catch require statements. These should not be done until runtime.
    def require(*paths)
      # puts "require capture: #{paths}"
    end
    
    # set where the application bundle should be placed (web only)
    def application_path=(path)
      @application_path = path
    end
    
    # set where bundles should be placed - web only?
    def vendor_path=(path)
      @vendor_path = path
    end
  end
end
