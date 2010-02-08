# 
# cappruby.rb
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

require 'yaml'
require 'fileutils'
require 'rubygems'
# require 'vienna'
require 'vienna'

module CappRuby
  
  ROOTPATH = File.join(File.dirname(__FILE__), '..')
  
  def self.tools(args)
    
    cmd = args.shift
    if cmd.nil? || cmd == "-h" || cmd == '--help'
      print_usage
      exit
    end
    
    case cmd
    when "gen"
      if args.length == 0
        print_usage 
        exit
      end
      
      require_libs
      AppGenerator.new(args).gen!
    when "build"
      
      require_libs
      AppBuilder.new(args).build!
    when "-f"
      puts "update frameworks"
    else
      print_usage
      exit
    end
    
  end
  
  def self.print_usage
    puts "Usage:"
    puts "  - cappruby gen <app_name>       # Generate an application"
    puts "  - cappruby build                # Build the app"
  end
  
  def self.require_libs
    libs = File.join(File.dirname(__FILE__), 'cappruby', '**', '*.rb')
    Dir.glob(libs).each { |f| require f }
    
    vn_libs = File.join(File.dirname(__FILE__), 'vienna', '**', '*.rb')
    Dir.glob(vn_libs).each { |d| require d }
  end
  
end
