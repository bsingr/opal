# 
# web.rb
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
    
    class Web
      
      attr_reader :project
      
      def initialize(project)
        @project = project
      end
      
      def project_root
        @project.project_root
      end
      
      def project_name
        @project.project_name
      end
      
      def prepare!
        
      end
      
      def build!
        puts "building web platform at: #{project_root}"
        rebuild_index
        rebuild_runtime
      end
      
      # full path to index.html build file
      def index_html_file
        File.join(project_root, 'build', 'web', 'index.html')
      end
      
      # build index.html file.. should we draw this from project? might want it to be
      # a custom file while loading resources? hmm... maybe.
      def rebuild_index
        File.open(index_html_file, "wb") do |f|
          f.puts %{<!DOCTYPE html>}
          f.puts %{<html>}
          f.puts %{ <head>}
          f.puts %{   <title>#{project_name}</title>}
          f.puts %{   <script src="vienna.js" type="text/javascript" charset="utf-8"></script>}
          f.puts %{   <script type="text/javascript" charset="utf-8">}
          f.puts %{     VN_BOOTSTRAP_APPLICATION = "#{project_name}";}
          f.puts %{     VN_BOOTSTRAP_BUNDLES = #{@project.required_bundles.inspect};}
          f.puts %{     VN_APPLICATION_PATH = "#{@project.application_path}";} if @project.application_path
          f.puts %{     VN_VENDOR_PATH = "#{@project.vendor_path}";} if @project.vendor_path
          f.puts %{     #{js_bin_code}}
          f.puts %{   </script>}
          f.puts %{ </head>}
          f.puts %{ <body>}
          f.puts %{   <div id="loading">Loading #{project_name}...</div>}
          f.puts %{ </body>}
          f.puts %{</html>}
        end
      end
      
      # js bin code for project (can be default if no file specified)
      # project_root/bin/project_name.js
      def js_bin_code
        JSMin.minify(open(File.join(project_root, 'bin', project_name) + '.js'))
      end
      
      # build test.html
      # test is a special app that loads all the test suites defined for the application
      # and runs them while giving useful feedback as to which tests failed or passed.
      # This is not built by default, and is only needed for unit testing tasks.
      def rebuild_test
        
      end
      
      # full path to vienna.js file
      def vienna_js_file
        File.join(project_root, 'build', 'web', 'vienna.js')
      end

      # rebuilds vienna.js file
      def rebuild_runtime
        File.open(vienna_js_file, "wb") do |f|
          # hardcoded path.. fix this when moving base runtime around
          sources = File.join(File.dirname(__FILE__), '..', '..', '..', '..', 'browser', 'lib', '**', '*.{js}')
          t = ""
          Dir.glob(sources).each do |s|
            open(s).each { |l| t << l }
          end
          
          # sjould use compiler switch for minifying/not minifying
          # could make it depend on prodiuction/development mode.
          f.puts(t)
          # f.puts(JSMin.minify t)
        end
      end
    end
  end  
end
