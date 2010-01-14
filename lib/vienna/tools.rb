# 
# tools.rb
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
  
  class Tools
    
    attr_accessor :project
    
    # Get the right type of project from the Rakefile. If not set (which it
    # should always be), then default to vienna. Currently, vienna and 
    # cappuccino are the only valid sdks. 'browser' will be added for plain
    # ruby plus some browser extensions.
    # 
    def initialize(tool)      
      self.send tool
    end
    
    def find_project!
      return @project ||= Vienna::Project.new(Dir.getwd)
      
      # old...
      
      return @project if @project
      
      unless File.exist? "Rakefile"
        # no rakefile means we could be in a browser project
        @project = Vienna::BrowserProject.new(Dir.getwd)
        return @project
      end
      
      rakefile = Rakefile.new.load!(Dir.getwd)
      sdk = rakefile.config_for(:debug)[:sdk] || 'vienna'
      
      case sdk
      when 'vienna'
        @project = Vienna::NewProject.new(Dir.getwd)
      when 'cappuccino'
        @project = Vienna::CappuccinoProject.new(Dir.getwd)
      end
      
      @project
    end
  end
end

Vienna.require_all_libs_relative_to(__FILE__)
