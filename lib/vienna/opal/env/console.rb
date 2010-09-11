# 
# console.rb
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
    
    # Used to represent the usual javascript console found in most browsers.
    class Console < Object
      
      def initialize(env)
        super
        self['log'] = proc { |msg| log(msg) }
        self['error'] = proc { |msg| error(msg) }
        self['info'] = proc { |msg| info(msg) }
        self['warn'] = proc { |msg| warn(msg) }
      end
      
      # Log a regular message to the console.
      # 
      # @example
      #   console.log "something"
      # 
      def log(str = "")
        puts str
      end
      
      def error(str = "")
        puts str
      end
      
      def info(str = "")
        puts str
      end
      
      def warn(str = "")
        puts str
      end
    end
  end
end
