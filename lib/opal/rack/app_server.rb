# 
# app_server.rb
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

require 'pp'

module Vienna
  
  # App server for any opal project (single project)
  class AppServer
    
    attr_accessor :project
    
    def initialize(project)
      # we need rack
      begin
        require 'rack'
      rescue LoadError
        require 'rubygems'
        require 'rack'
      end
      
      @project = project
      
      # hash of paths => procs to return their result
      @paths = {}
      
      # we need to reload/rebuild our project!
      path '/', '/index.html' do
        # we need to rebuild, so do that
        rebuild!
        # simply return /index.html from the project_dir (once built)
        file '/index.html'
      end
      
      # lets just return something to avoid missing file error
      path '/favicon.ico' do
        [200, {"Content-Type" => ::Rack::Mime.mime_type(File.extname('/favicon.ico'), 'text/plain')}, ""]
      end
      
      port = 3030
      puts "Starting server on port #{port}"
      ::Rack::Handler::Mongrel.run self, :Port => port
    end
    
    # Rebuild our project
    def rebuild!
      @project.build!
    end
    
    # Project root/path
    def project_root
      @project_root ||= @project.project_root
    end
    
    # We map the full given path to the given action. Whenever a request for the
    # given path is received, we run the given action and return the result.
    # 
    # @param {String} path to resource - can take multiple strings
    # @param {Proc} action to run and respond with
    # 
    def path(*path, &action)
      path.each do |path|
        # puts "need to map path: #{path}"
        @paths[path] = action
      end
    end
    
    # Returns the content of the file, or method missing if it does not exist
    def file(local_path)
      path = File.join(project_root, local_path)
      
      if File.exist? path
        [200, {"Content-Type" => ::Rack::Mime.mime_type(File.extname(path), 'text/plain')}, File.read(path)]
      else
        raise "file doest exist: #{path}"
      end
    end
    
    def call(env)
      # @env = env
      # pp env
      request_path = env['REQUEST_PATH']
      
      puts "accessing #{request_path}"
      
      action = @paths[request_path]
      
      if action
        # puts "we have an action! #{request_path}"
        action.call
      else
        file request_path
      end      
    end
  end
end
