# 
# ruby_project.rb
# vienna
# 
# Created by Adam Beynon.
# Copyright 2009 Adam Beynon.
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
  
  attr_accessor :project_root
  
  class RubyProject
    
    def initialize(project_root)
      @project_root = File.expand_path(project_root)
    end
    
    def rakefile
      @rakefile ||= Rakefile.new.load!(@project_root)      
    end
    
    def project_name
      @project_name ||= File.basename(project_root)
    end
    
    def project_root
      @project_root
    end
    
    def prepare!
      FileUtils.mkdir_p(build_prefix)
      FileUtils.mkdir_p(tmp_prefix)
    end
    
    def build!
      # puts 'building'
    end
    
    def build_prefix
      @build_prefix ||= (rakefile.config_for(build_mode)[:build_prefix] || 'build')
    end
    
    def tmp_prefix
      @tmp_prefix ||= (rakefile.config_for(build_mode)[:tmp_prefix] || 'build/tmp')
    end
    
    def build_mode
      @build_mode ||= :debug
    end
    
  end
end