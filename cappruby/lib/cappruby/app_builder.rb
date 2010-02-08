# 
# app_builder.rb
# cappruby
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

module CappRuby
  
  class AppBuilder
    
    attr_reader :app_root, :app_name, :app_title, :build_options
    
    def initialize(args)
      @app_root = Dir.getwd
      @app_name = File.basename(@app_root)
      @app_title = (@app_name.split('_').collect { |p| p.capitalize }).join ' '
      
      unless File.exist? 'config/build.yml'
        puts "Missing config/build.yml file. Sure this is an application dir?"
        exit
      end
      
      @build_options = YAML.load_file('config/build.yml')
    end
    
    def build_dir
      @build_dir ||= File.join(@app_root, 'build')
    end
    
    def build!
      # also rebuild CappRuby framework (for now)
      FrameworkBuilder.new.build!
      FileUtils.mkdir_p build_dir
      write_info_plist_file
      write_main_j_file
      write_index_html_file
    
      File.symlink(File.join(@app_root, 'Frameworks'), File.join(build_dir, 'Frameworks')) unless File.exist? File.join(build_dir, 'Frameworks')
      
      File.symlink(File.join(@app_root, 'Resources'), File.join(build_dir, 'Resources')) unless File.exist? File.join(build_dir, 'Resources')
    end
    
    def info_plist_file
      File.join(build_dir, 'Info.plist')
    end
    
    def write_info_plist_file
      File.open(info_plist_file, 'w') do |f|
        f.puts %{<?xml version="1.0" encoding="UTF-8"?>}
        f.puts %{<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">}
        f.puts %{<plist version="1.0">}
        f.puts %{<dict>}
        f.puts %{  <key>CPApplicationDelegateClass</key>}
      	f.puts %{  <string>AppController</string>}
      	f.puts %{  <key>CPBundleName</key>}
      	f.puts %{  <string>#{app_name}</string>}
      	f.puts %{  <key>CPPrincipalClass</key>}
      	f.puts %{  <string>CPApplication</string>}
        f.puts %{</dict>}
        f.puts %{</plist>}
      end
    end
    
    def main_j_file
      File.join(build_dir, 'main.j')
    end
    
    def write_main_j_file
      File.open(main_j_file, 'w') do |f|
        f.puts %{@import <Foundation/Foundation.j>}
        f.puts %{@import <AppKit/AppKit.j>}
        f.puts %{@import <CappRuby/CappRuby.j>}
        
        f.puts %{function main(args, namedArgs) \{}
        f.puts %{cappruby_main("/lib/application.rb", args, namedArgs);}
        f.puts %{\};}
        
        # now we need to write all .rb files (in opal compatible way)
        rb_sources = File.join(app_root, 'lib', '**', '*.rb')
        Dir.glob(rb_sources).each do |rb|
          name = /^#{app_root}(.*)$/.match(rb)[1]
          b = RubyBuilder.new(rb, self, name)
          c = b.build!
          f.puts %{cappruby_file("#{name}", #{c});}
        end
      end
    end
    
    def index_html_file
      File.join(build_dir, 'index.html')
    end
    
    def write_index_html_file
      File.open(index_html_file, 'w') do |f|
        f.puts %{<?xml version="1.0" encoding="UTF-8"?>}
        f.puts %{<!DOCTYPE html
            PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
            "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">}
        f.puts %{<html xmlns = "http://www.w3.org/1999/xhtml" xml:lang = "en" lang = "en">}
        f.puts %{<head>}
        f.puts %{<meta http-equiv="X-UA-Compatible" content="IE-EmulateIE7" />}
        f.puts %{<title>#{app_title}</title>}
        f.puts %{<script type="text/javascript">}
        f.puts %{OBJJ_MAIN_FILE = "main.j"}
        f.puts %{</script>}
        f.puts %{<script src = "Frameworks/Objective-J/Objective-J.js" type = "text/javascript"></script>}
        f.puts %{<style type = "text/css">}
        f.puts %{body{margin:0; padding:0;}}
        f.puts %{</style>}
        f.puts %{</head>}
        f.puts %{<body>}
        f.puts %{</body>}
        f.puts %{</html>}
      end
    end
  end
end
