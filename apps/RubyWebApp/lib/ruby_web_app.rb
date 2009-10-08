# 
# ruby_web_app.rb
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

require 'base'
require 'browser'
require 'vienna'

module RubyWebApp
  
  VERSION = "0.0.1"
  
  class AppDelegate
    
    def initialize_with bob, john:adam, assign:fors, key:adam
      @adam = 10
      bob(10, 34, @benny)
    end
    
    def will_finish_launching (notification)
      puts 'Application will finish launching!'
      VN::Application
    end
    
    def did_finish_launching (notification)
      puts 'Application did finish launching!!'
    end
  end
end

self.set_value(10, for_key:'bob')
self.set_value 100, for_key:'adam'

# BOB

 # VN::Notification.test

# adam = Object.allocate
# puts adam
# 4 + 2
# puts (4 - 45)
# 
# "bob" + 10
# 
# adam = [12, 14, 15]
# 
# def something
#   
#   return 4
#   
#   return 14 if adam.age
#   return 34, 35
# end
# 
# # VN.self.$('kind_of?', [])
# 
# self.kind_of?
