# 
# application.rb
# cherry_kit
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

require File.join(File.dirname(__FILE__), 'responder')

module CherryKit
  
  class Application < Responder
    
    attr_accessor :name
    
    attr_reader :windows
    
    attr_reader :delegate
    
    def initialize
      @windows = []
      @delegate = nil
    end
    
    def self.shared_application
      if @shared_application
        puts "returning shared application"
        @shared_application
      else
        puts "creating new application"
        @shared_application = new
        @shared_application
      end
    end
    
    # This will begin the application running so that we start receving and
    # sending events from the platform
    def run!
      # puts "running"
      if @delegate.respond_to?(:application_will_finish_launching)
        @delegate.application_will_finish_launching(nil)
      end
    end
    
    # Set the application delegate
    def delegate=(obj)
      @delegate = obj
    end
    
  end
end

module Kernel
  
  def application(options, &block)
    # CKApp - shorter name for accessing app object
    Object.const_set('CKApp', CherryKit::Application.shared_application)
    puts "1"
    CKApp.name = options[:name]
    puts 2
    yield CKApp
    puts 3
    CKApp.run!
    puts 4
  end
  
end
