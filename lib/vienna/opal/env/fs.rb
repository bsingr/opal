# 
# fs.rb
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

require File.join(File.dirname(__FILE__), 'object')

module Opal
  
  class Environment
    
    # File system access. The browser build of opal has simple methods of FS
    # access/dir access simply to support require(), Dir.glob() and File.join().
    # Server side opal aims to offer much of what Ruby offers.. reading and 
    # writing, etc. FS plays an intermediate role betweeen opal and the ruby
    # runtime.
    class FS < Object
      
      def initialize(env)
        super
        # a hash of required files - filename => true????? er,, why not array?
        @required_files = {}
        self['require'] = require
        self['getwd'] = getwd
        
        setup_load_paths
      end
      
      # Set up load paths.. basically add all our opals into the load path
      def setup_load_paths
        @load_paths = []
        %w{spec}.each do |opal|
          @load_paths << File.join(OPALS_PATH, opal, 'lib')
        end
        # current dir is also in the load path..
        @load_paths << Dir.getwd
      end
      
      def getwd
        proc do
          Dir.getwd
        end
      end
      
      # Require function from opal
      def require
        proc do |path|
          # puts "need to require: #{path}"
          file_path = nil
          @load_paths.each do |load_path|
            proposed = File.join load_path, path
            # puts "trying: #{proposed}"
            if File.exist? "#{proposed}.rb"
              file_path = "#{proposed}.rb"
              break
            end
          end
          return @environment.load_required_file file_path if file_path
          false
        end
      end
    end
  end
end
