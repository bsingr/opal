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
  
  # By default include vienna, so we can access View etc by their name, rather than
  # by VN::View etc... more convience when dealing with points, rect etc, but also,
  # by including the module, the lookup time is MUCH quicker, than having to first
  # reference Vienna, then to reference View.
  
  # include Vienna
  
  VERSION = "0.0.1"
  
  class AppDelegate
        
    def initialize
      @adam = 10
    end
    
    def will_finish_launching (notification)
      puts 'Application will finish launching!'
      VN::Application
    end
    
    def did_finish_launching (notification)
      puts 'Application did finish launching!!'
    end
    
    def adam=(obj)
      
    end
    
    def other_object=(now)
      puts now
    end
  end
  
  class TempObserver
    
    def observe_value_for_key_path path, of_object:object, change:change, context:context
      puts 'holy macaranieieejjcjcjkjkjnjnwkejndwjednjwej'
      puts "old value is #{change[:old]}"
      puts "new value is #{change[:new]}"
    end
    
  end
  
end

def main
  app_delegate = RubyWebApp::AppDelegate.new
  
  Vienna::App.delegate = app_delegate
  
  Vienna::App.run
  my_win = Vienna::Window.new(Vienna::Rect.new(100, 100, 100, 100), [])
  my_button = Vienna::Button.new(Vienna::Rect.new(100, 100, 100, 100))
  my_win << my_button
  my_button.needs_display = true
  puts 'done'
  puts my_button
  
  
  tracking_area = VN::TrackingArea.tracking_area_with_rect nil, options:nil, owner:nil, user_info:nil
  my_button.add_tracking_area tracking_area
  
  puts '=================================='
  
  temp = RubyWebApp::TempObserver.new
  app_delegate.add_observer temp, for_key_path:'adam', options:nil, context:nil
  puts 'setting value to 10...'
  app_delegate.adam = 10
end
