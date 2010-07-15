# 
#  spec_server.rb
#  vienna
#  
#  Created by Adam Beynon on 2010-03-05.
#  Copyright 2010 Adam Beynon. All rights reserved.
# 

module Vienna
  
  module Opal
    
    # Server for specs
    class SpecServer
      
      attr_reader :env
      
      def initialize
        begin
          require 'rubygems'
          require 'rack'
        rescue
          abort "Need rack to run SpecServer"
        end
        port = 3030
        puts "starting server on port #{port}"
        @paths = {}
        register_paths
        # get_input
        ::Rack::Handler::Mongrel.run self, :Port => 3030
      end
      
      
      def get(path, &block)
        @paths[path] = block
      end
      
      def register_paths
        get '/ajax_console' do
          puts env['QUERY_STRING']
          [200, {"Content-Type" => 'text/plain'}, ""]
        end
      end
      
      def call(env)
        @env = env
        env['REQUEST_PATH'] = "/index.html" if env['REQUEST_PATH'] == "/"
        
        # check first for public files
        if public_file = public_file_for_request_path(env['REQUEST_PATH'])
          return handle_public_file_request(public_file)
        end
        
        # try predefined paths
        if predefined = @paths[env['REQUEST_PATH']]
          # puts "found a predefiend!"
          return predefined.call
        end
        
        [200, {"Content-Type" => 'text/html'}, env['REQUEST_PATH']]
      end
      
      # directory where built specs are stored
      def public_dir
        @public_dir ||= File.join(Dir.getwd, 'opal_spec')
      end
      
      # returns the path for a public dir item if it exists. nil if it does not.
      # Always check public dir for files before trying to do anything else with
      # the root
      def public_file_for_request_path(request_path)
        try = File.expand_path(File.join(public_dir, request_path))
        File.exists?(try) ? try : nil
      end
      
      # Given the actual path, 'path', return the response etc with a 200 status
      # as well as the file content
      def handle_public_file_request(path)
        # puts "handle #{path}"
        [200, {"Content-Type" => ::Rack::Mime.mime_type(File.extname(path), 'text/plain')}, File.read(path)]
      end
    end #end SpecServer
  end
end
