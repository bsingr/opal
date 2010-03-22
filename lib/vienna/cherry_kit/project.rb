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
  
  module CherryKit
    
    class Project
      
      attr_reader :project_root, :project_name, :project_title, :build_options
      
      def initialize(project_root)
        @project_root = project_root
        @project_name = File.basename(project_root)
        @project_title = @project_name.split('_').collect { |p| p.capitalize }.join(' ')
        @project_const = @project_name.split('_').collect { |p| p.capitalize }.join('')
        
        unless File.exist? 'config/build.yml'
          puts "Missing config/build.yml file. Sure this is an application dir?"
          exit
        end
        
        @build_options = YAML.load_file('config/build.yml')
        # fix for empty file:
        @build_options ||= {}
      end
      
      def build_dir
        @build_dir ||= @build_options['build_dir'] || File.join(@project_root, 'build')
      end
      
      def vendor_build_dir
        @vendor_build_dir ||= File.join(build_dir, 'vendor')
      end
      
      # Resources build dir. This is gathered from the yml file, or a default is
      # used (build_dir/resources). All images etc are places into the resources
      # build directory. For a rails app, Rails.root/public/images might be more
      # ideal etc.
      # 
      def resources_build_dir
        @resources_build_dir ||= File.join(build_dir, 'resources')
      end
      
      # true/false can be loaded from build.yml file. We might not want to build
      # the html file inside a Rails application. For example, a controller
      # might be setup to handle the html creation with templates.
      # 
      def write_index_html_file?
        true
      end
      
      def build!
        puts "building project! #{build_dir}"
        FileUtils.mkdir_p(build_dir)
        FileUtils.mkdir_p(resources_build_dir)
        # FileUtils.mkdir_p(resources_build_dir)
        
        write_index_html_file if write_index_html_file?
        write_opal_js_file
        # write_main_js_file .. dont do
        write_project_js_file
      end
      
      def index_html_file
        File.join(build_dir, "index.html")
      end
      
      def write_index_html_file
        if File.exist?(File.join(@project_root, 'index.html'))
          File.open(index_html_file, 'w') do |f|
            f.write(File.read(File.join(@project_root, 'index.html')))
          end
        else
          File.open(index_html_file, "w") do |f|
            f.puts %{<!DOCTYPE html>}
            f.puts %{<html>}
            f.puts %{<head>}
            f.puts %{  <meta http-equiv="X-UA-Compatible" content="IE-EmulateIE7" />}
            f.puts %{  <title>#{project_title}</title>}
            f.puts %{  <script src="#{project_name}.js" type="text/javascript"></script>}
            f.puts %{  <script type="text/javascript">}
            # f.puts %{    OPAL_VENDOR_NAMES = ["#{vendor_names.join('","')}"];}
            # f.puts %{    OPAL_APP_NAME = "#{project_name}";}
            f.puts %{  </script>}
            f.puts %{  <style type = "text/css">}
            f.puts %{    body{margin:0; padding:0;}}
            f.puts %{  </style>}
            f.puts %{ </head>}
            f.puts %{<body>}
            f.puts %{</body>}
            f.puts %{</html>}
          end
        end
      end
      
      def opal_js_file
        File.join(build_dir, "opal_cherry_kit.js")
      end
      
      # 
      # @private
      # 
      # In future, dont do this. this will be automatically generated. We only
      # do this here during development.
      # 
      def write_opal_js_file
        File.open(opal_js_file, "w") do |f|
          f.write Vienna::Opal.build_opal_browser(true)
          # we also need to write the bootstrap code for cherry_kit loading
          bootstrap_path = File.join(Vienna::PATH, 'cherry_kit', 'opal', 'bootstrap.js')
          f.write File.read(bootstrap_path)
        end
      end
      
      def main_js_file
        File.join(build_dir, "main.js")
      end
      
      def vendor_names
        ["cherry_kit"]
      end
      
      def write_main_js_file
        File.open(main_js_file, "w") do |f|
          f.puts %{function main() \{}
          f.puts %{var vendor_names = ["#{vendor_names.join('","')}"];}
          f.puts %{var app_name = "#{project_name}";}
          f.puts %{var to_load = [];}
          f.puts %{for (var i = 0; i < vendor_names.length; i++) \{}
          f.puts %{var p = "vendor/" + vendor_names[i] + ".js";}
          f.puts %{opal_gem_load_at_path(p, function() \{to_load.splice(to_load.indexOf(p), 1);\});}
          f.puts %{to_load.push(p);}
          f.puts %{\}}
          f.puts %{opal_gem_load_at_path(app_name + ".js");}
          f.puts %{to_load.push(app_name + ".js", function() \{to_load.splice(to_load.indexOf(app_name + ".js"), 1); \});}
          # f.puts %{r.send(null);}
          # 
          # var r = new XMLHttpRequest();
          # r.open("GET", path, true);
          # r.onreadystatechange = function() {
          #   if (r.readyState == 4) {
          #     rb_eval_raw(r.responseText, path);
          #   }
          # };
          # r.send(null);
          
          
          f.puts %{\};}
          f.puts %{if (window.addEventListener) \{}
          f.puts %{window.addEventListener('load', main, false);}
          f.puts %{\} else \{}
          f.puts %{window.attachEvent('onload', main);}
          f.puts %{\}}
        end
      end
      
      # An array of globs to look for ruby sources
      # 
      # e.g. ["lib/**/*.rb", "platforms/web/**.*.rb"]
      # 
      # These will, in future, be loaded from build.yml
      def all_sources
        sources = @build_options['sources']
        case sources
        when Array
          sources
        when String
          [sources]
        else
          []
        end
      end
      
      def project_js_file
        File.join(build_dir, "#{project_name}.js")
      end
      
      def write_project_js_file
        File.open(project_js_file, "w") do |f|
          # first write opal/browser bits and pieces
          
          Dir.glob(all_sources).each do |src|
            src = File.expand_path(src)
            build_name = /^#{project_root}\/(.*)/.match(src)[1]
            case File.extname(src)
            when ".rb"
              str = Vienna::CherryKit::RubyBuilder.new(src, self, build_name).build!
              f.puts %{opal_define_file("#{build_name}",#{str});}
            when ".js"
              puts "#{src} is a javascript file"
            end
          end
          f.puts %{opal_browser_main("config/environment.rb")}
        end
        # File.open(project_js_file, "w") do |f|
        #           # package marker: opal file version 1.0
        #           f.write %{opal;1.0;}
        #           # directory this gem/bundle is located at : always "" for app dir
        #           f.write %{d0;}
        #           
        #           # all ruby sources - build  and put in "file" marker
        #           Dir.glob(File.join(project_root, ruby_sources)).each do |rb|
        #             name = /^#{project_root}\/(.*)$/.match(rb)[1]
        #             b = RubyBuilder.new(rb, self, name)
        #             c = b.build!
        #             f.write %{f#{name.length};#{name}#{c.length};#{c}}
        #           end
        #           
        #           # all js sources - combine, minify and put in "code" marker
        #         end
      end
      
    end # end Class
  end
end
