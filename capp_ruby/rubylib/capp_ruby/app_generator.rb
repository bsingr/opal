# 
# application_generator.rb
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
  
  class AppGenerator
    
    def initialize(args)
      @app_name = args[0]
      @app_title = (@app_name.split('_').collect { |p| p.capitalize }).join ' '
      @app_root = File.join(Dir.getwd, @app_name)
      
      if File.exists? @app_root
        puts "#{@app_name} already exists. Choose a different path"
        exit
      end
    end
    
    # all source files
    def source_files
      File.join(CappRuby::ROOTPATH, 'gen', 'app')
    end
    
    # do generate
    def gen!
      puts "Generating project: '#{@app_title}' in '#{@app_name}'"
      FileUtils.mkdir_p @app_root

      Dir.glob(File.join(source_files, '**', '*')) do |f|
        relative = f[source_files.length..-1]
        if File.directory? f
          FileUtils.mkdir_p File.join(@app_root, relative)
        else
          File.open(File.join(@app_root, relative), 'w') do |o|
            t = File.read f
            t.gsub!(/__APPLICATION_NAME__/, @app_name)
            t.gsub!(/__APPLICATION_TITLE__/, @app_title)
            o.write t
          end
        end
      end
      
      puts "Generating capp frameworks (might take a few secs)"
      gen_capp_frameworks
    end
    
    # capp frameworks
    def gen_capp_frameworks
      if %x{which capp} == ""
        puts "Capp is not installed. Required for frameworks. Generating anyway."
      else
        %x{capp gen #{@app_name} -f}
      end
    end
    
  end
end
