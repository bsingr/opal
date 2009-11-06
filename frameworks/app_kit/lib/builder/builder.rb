# 
# builder.rb
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
  
  class Builder
    
    attr_accessor :owner
    
    BUILDERS = {}
    
    def initialize name, &block
      
      @name = name
      @builder = block
      @top_level_objects = []
      BUILDERS[name] = self
    end
    
    def self.build name, options, &block
      # puts "Should build: #{name}"
      builder = BUILDERS[name]
      puts builder
      builder.build! options, block
    end
    
    # Actually build the UI etc.
    # options should contains the owner etc and top level objects
    def build! options, &block
      # puts "Building UI: #{@name}"
      @builder.call self
      # puts "Options:"
      # puts options
      yield self
    end
    
    # Any object added to the builder instance this way will be added to the list
    # of 'top level objects'. This is an array that might be useful for refereing
    # objects created during the build
    def top obj
      @top_level_objects << obj
    end
    
    # The 'files' owner. Placeholder similar to FileOwner inside XIBs
    def owner
      @owner
    end
    
    # used for setting the menu. if this is set durong loading the menu, then this
    # menu is used to set the main meny for VN::Application
    def menu= a_menu
      
    end
    
  end
end
