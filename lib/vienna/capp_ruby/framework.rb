# 
# framework.rb
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
  
  module CappRuby
    
    class Framework
      
      attr_reader :framework_root, :framework_name, :framework_title
      
      def initialize(framework_root, project)
        @project = project
        @framework_root = framework_root
        @framework_name = File.basename @framework_root
        @framework_title = @framework_name.split('_').collect { |p| p.capitalize }.join(' ')
        @framework_const = @framework_name.split('_').collect { |p| p.capitalize }.join('')
      end
      
      def build_dir
        @build_dir ||= File.join(@project.build_dir, 'Frameworks', @framework_const)
      end
      
      def build!
        FileUtils.mkdir_p build_dir
        FileUtils.mkdir_p File.join(build_dir, "W3C.environment")
        write_info_plist_file
        write_main_j_file
        
        File.symlink(File.join(@framework_root, 'resources'), File.join(build_dir, 'Resources')) unless File.exist? File.join(build_dir, 'Resources')
      end
      
      def main_j_file
        File.join(build_dir, "W3C.environment", "#{@framework_const}.sj")
      end
      
      def write_main_j_file
        File.open(main_j_file, 'w') do |f|
          f.write %{@STATIC;1.0;p;#{@framework_const.length + 2};#{@framework_const}.j}
          # all js code goes into the frameowrk_const.j file (it doesnt exist)
          code = ""
          Dir.glob(File.join(@framework_root, 'lib', '**', '*.js')) do |j|
            code << JSMin.minify(File.read(j))
          end
          f.write %{c;#{code.length};#{code}}
          
          rb_sources = File.join(framework_root, 'lib', '**', '*.rb')
          Dir.glob(rb_sources).each do |rb|
            name = /^#{framework_root}\/(.*)$/.match(rb)[1]
            b_name = "Frameworks/#{@framework_const}/#{name}"
            b = RubyBuilder.new(rb, self, b_name)
            c = b.build!
            # c= "yadablada"
            # f.write %{cappruby_file("#{name}", #{c});}
            f.write %{p;#{name.length};#{name}c;#{c.length};#{c}}
          end
        end
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
        	f.puts %{  <key>CPBundleName</key>}
        	f.puts %{  <string>#{@framework_const}</string>}
        	f.puts %{  <key>CPBundlePackageType</key>}
        	f.puts %{  <string>FMWK</string>}
          f.puts %{  <key>CPBundleExecutable</key>}
          f.puts %{  <string>#{@framework_const}.sj</string>}
          f.puts %{  <key>CPBundleEnvironments</key>}
          f.puts %{  <array><string>W3C</string></array>}
          f.puts %{  <key>CPBundleReplacedFiles</key>}
          f.puts %{  <dict>}
          f.puts %{  <key>W3C</key>}
          f.puts %{  <array>}
          f.puts %{  <string>#{@framework_const}.j</string>}
          f.puts %{  </array>}
          f.puts %{  </dict>}
          f.puts %{</dict>}
          f.puts %{</plist>}
        end
      end
      
    end
  end  
end
