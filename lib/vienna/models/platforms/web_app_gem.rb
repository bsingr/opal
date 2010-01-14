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
        # ..
      end
      
      # all ruby sources for app, all gems etc
      def ruby_sources
        vienna_root = File.expand_path(File.join(Vienna::LIBPATH, '..', 'lib'))
        ruby_sources = {}
        # app sources
        @project.build_options['sources'].each do |a|
          Dir.glob(File.join(@project.project_root, a)).each do |s|
            ruby_sources[s] = /^#{@project.project_root}(.*)/.match(s)[1]
          end
        end
        
        # vienna sources
        Dir.glob(File.join(vienna_root, '**', '*.rb')).each do |v|
          ruby_sources[v] = '/vendor/vienna/lib' + /^#{vienna_root}(.*)/.match(v)[1]
        end
          
        ruby_sources
      end
      
      def build!
        
        # puts @project.build_options['sources']
        # pp ruby_sources
        
        File.open(gem_file_path, "wb") do |f|
          # vienna app magic marker
          f.write %{vnapp$1.0$}
          
          # list each of our 'gems' - app doesnt count
          f.write %{g6$vienna14$/vendor/vienna}
          
          # output all of our ruby sources
          ruby_sources.each_pair do |path, name|
            b = Vienna::RubyParser.new(path, project, name)
            s = b.build!
            f.write %{f#{name.length}$#{name}#{s.length}$#{s}}
          end
        end        
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
