# 
# framework.rb
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
  
  # class used for building CappRuby framework
  class FrameworkBuilder
    
    attr_reader :build_dir
    
    def initialize
      @app_root = Dir.getwd
      @build_dir = File.join(Dir.getwd, 'frameworks', 'CappRuby')
    end
    
    def build!
      FileUtils.mkdir_p build_dir
      write_cappruby_j_file
    end
    
    def cappruby_j_file
      File.join(build_dir, 'CappRuby.j')
    end
    
    def write_cappruby_j_file
      File.open cappruby_j_file, 'w' do |f|
        sources = File.join(ROOTPATH, 'framework', '**', '*.js')
        Dir.glob(sources).each do |s|
          i = File.read(s)
          # should really minify
          f.puts i
        end
        
        # now we need to write all .rb files (in opal compatible way)
        rb_sources = File.join(ROOTPATH, 'framework', '**', '*.rb')
        root_framework_path = "#{ROOTPATH}/framework"
        Dir.glob(rb_sources).each do |rb|
          # puts rb
          name = /^#{root_framework_path}(.*)$/.match(rb)[1]
          name = "/Frameworks/CappRuby#{name}"
          # puts name
          b = RubyBuilder.new(rb, self, name)
          c = b.build!
          f.puts %{cappruby_file("#{name}", #{c});}
        end
      end
    end
    
  end
end
