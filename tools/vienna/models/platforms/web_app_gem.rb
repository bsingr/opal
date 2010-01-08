# 
# web_app_gem.rb
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
  
  module Platforms
    
    # build an application gem/bundle. Cannot be used with a normal lib gem
    class WebAppGem
      
      attr_reader :gem_root, :project
      
      def initialize(gem_root, project)
        @gem_root = gem_root
        @project = project
      end
      
      # full path to the location of the output gem file
      def gem_file_path
        File.expand_path(File.join(@project.project_root, 'build', 'web', @project.project_name) + '.vngem')
      end
      
      def prepare!
        
      end
      
      def build!
        File.open(gem_file_path, "wb") do |f|
          f.write %{vngem$1.0$}
          rb_files_in_gem.each do |rb|
            filename = normalized_name(rb)
            b = Vienna::RubyParser.new(rb, project, filename)
            # s now holds built string (executable code for file)
            s = b.build!
            # puts s
            f.write %{f#{filename.length}$#{filename}#{s.length}$#{s}}
          end
        end
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
        puts "building #{gem_file_path}" 
        
      end
      
      # normalized filename (relative to project root)
      def normalized_name(name)
        name.match(/^#{@project.project_root}(.*)$/)[1]
      end
      
      # returns an array of every .rb file to build
      def rb_files_in_gem
        all_files = []
        search_app = ::File.expand_path(::File.join(@project.project_root, 'app', '**', '*.rb'))
        Dir.glob(search_app).each {|rb| all_files << rb}
        puts "--"
        search_config = ::File.expand_path(::File.join(@project.project_root, 'config', '**', '*.rb'))
        Dir.glob(search_config).each {|rb| all_files << rb}
        all_files
      end
      
    end
  end  
end
