# 
# rack.rb
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
  
  class Rack
    
    def initialize(project, tools)
      @tools = tools
      @project = project
      port = 3030
      puts "Starting server on port #{port}."
      ::Rack::Handler::Mongrel.run self, :Port => port
    end
    
    def rebuild!
      puts "Rebuilding project. (#{Time.now})"
      @project.reset!
      @project.prepare!
      @project.build!
    end
    
    def call(env)
      request_path = env['REQUEST_PATH']
      request_path = "/index.html" if request_path == "/"
      
      # If we are accessing index.html, rebuild then deploy.
      if request_path == "/index.html"
        rebuild!
      end
      
      result = File.join(@project.project_root, @project.build_prefix, request_path)
      
      return missing_file(result) unless File.exist?(result)
      
      [200, {"Content-Type" => ::Rack::Mime.mime_type(File.extname(result), 'text/plain')}, File.open(result)]
    end
    
    def missing_file(path)
      [404, {"Content-Type" => ::Rack::Mime.mime_type(File.extname(path), 'text/plain')}, "<html><head><title>404</title></head><p>404: #{path}</p></html>"]
    end
  end
end
