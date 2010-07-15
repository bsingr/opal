# 
# browser_project.rb
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

# puts "models.."

module Vienna
  
  class BrowserProject
    
    attr_reader :project_root
    
    def initialize(project_root)
      puts "initializing project root - #{project_root}"
      @project_root = project_root
    end
    
    # Creates a vienna.js file in the project root, or simply updates the existing
    # one. This is useful for updating the runtime when a new version of vienna.gem
    # is available. The server can use this to update the runtime between changes
    # without having to recompile. Just call this on each request to index.html to
    # make relevant chnages.
    # 
    # Note: the runtime includes the core lib (named base), AND the browser lib. 
    # Having the user require this lib seems silly, as it is the main benefit of
    # having a browser sdk. So include both.
    def create_or_update_runtime
      r = Vienna::BrowserRuntime.new(self)
      r.build!(File.join(Dir.getwd, runtime_filename))
    end
    
    # option incase in future we can dynamically name the runtime file, for now, it
    # simply returns vienna.js
    def runtime_filename
      'vienna.js'
    end
  end
end
