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
      end
      
      def build_dir
        @build_dir ||= File.join(@project_root, 'build', 'debug')
      end
      
      def vendor_build_dir
        @vendor_build_dir ||= File.join(build_dir, 'vendor')
      end
      
      def resources_build_dir
        @resources_build_dir ||= File.join(build_dir, 'resources')
      end
      
      # true/false can be loaded from build.yml file
      def write_index_html_file?
        true
      end
      
      def build!
        FileUtils.mkdir_p(build_dir)
        FileUtils.mkdir_p(resources_build_dir)
        FileUtils.mkdir_p(resources_build_dir)
        
        write_index_html_file if write_index_html_file?
        write_opal_js_file
        # write_main_js_file
        write_project_js_file
      end
      
      def index_html_file
        File.join(build_dir, "index.html")
      end
      
      def write_index_html_file
        File.open(index_html_file, "w") do |f|
          f.puts %{<!DOCTYPE html>}
          f.puts %{<html>}
          f.puts %{<head>}
          f.puts %{  <meta http-equiv="X-UA-Compatible" content="IE-EmulateIE7" />}
          f.puts %{  <title>#{project_title}</title>}
          f.puts %{  <script src="opal.js" type="text/javascript"></script>}
          f.puts %{  <script type="text/javascript">}
          f.puts %{    OPAL_VENDOR_NAMES = ["#{vendor_names.join('","')}"];}
          f.puts %{    OPAL_APP_NAME = "#{project_name}";}
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
      
      def opal_js_file
        File.join(build_dir, "opal.js")
      end
      
      # In future, dont do this. this will be automatically generated. We only
      # do this here during development.
      def write_opal_js_file
        runtime_path = File.join(Vienna::PATH, 'opal', 'runtime', 'core')
        
        File.open(opal_js_file, "w") do |f|
          Dir.glob(File.join(runtime_path, '**', '*.js')).each do |js|
            f.write JSMin.minify(File.read(js))
          end
          
          bootstrap = File.join(Vienna::PATH, 'cherry_kit', 'platforms', 'opal', 'bootstrap.js')
          
          f.write JSMin.minify(File.read(bootstrap))
          
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
      def ruby_sources
        ["app/**/*.rb"]
      end
      
      def project_js_file
        File.join(build_dir, "#{project_name}.js")
      end
      
      def write_project_js_file
        File.open(project_js_file, "w") do |f|
          # package marker: opal file version 1.0
          f.write %{opal;1.0;}
          # directory this gem/bundle is located at : always "" for app dir
          f.write %{d0;}
          
          # all ruby sources - build  and put in "file" marker
          Dir.glob(File.join(project_root, ruby_sources)).each do |rb|
            name = /^#{project_root}\/(.*)$/.match(rb)[1]
            b = RubyBuilder.new(rb, self, name)
            c = b.build!
            f.write %{f#{name.length};#{name}#{c.length};#{c}}
          end
          
          # all js sources - combine, minify and put in "code" marker
        end
      end
      
    end
  end
end
