# 
# application.rb
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

require 'capp_ruby'

# to get nice mappings/builder names
include CappRuby

class AppController
    
  def applicationWillFinishLaunching(notification)
    main_window
    CPApp.mainMenu = application_menu
    CPMenu.menuBarVisible = true    
    
    panel = CappRuby::HUDPanel.alloc.initWithContentRect CPRectMake(300,200,400,200), styleMask:1
    
    # panel = CappRuby::HUDPanel.alloc.initWithContentRect CPRectMake(300,200,400,200), styleMask:1
    panel.movableByWindowBackground = true
    panel.orderFront self
  end
  
  def applicationDidFinishLaunching(notification)
    # a = AppController.new(10, 20, 30)
    # puts a
    # r = CPURLRequest.requestWithURL "http://twitter.com/status/user_timeline/macruby.json?count=10"
    
    # c = CPJSONPConnection.connectionWithRequest r, 
                                       # callback:"callback", 
                                       # delegate:self
  end
  
  def connection c, didReceiveData:data
    puts data
  end
  
  def on_show_about_window
    window :title => "About Application", :style => [:hud, :closable]
  end
  
  def on_new
    puts "wow"
  end
  
  # return or build the main window
  def main_window
    @main_window ||= window :title => "Main Window", :style => :bridge do |win|
      # A button example - using origin will trigger sizeToFit:
      button :title => "First Button", :frame => [100,100,80,24] do |btn|
        btn.on_action { puts "Wow, button was clicked" }
        btn.on?
        win << btn
      end
      # A simple slider (doesnt send actions..)
      slider :min => 0, :max => 1000, :value => 900 do |slider|
        win << slider
      end
      
      # a_view = AnimatedView.alloc.initWithFrame CPRectMake(500,0,500,500)
      # a_view.backgroundColor = CPColor[:blue]
      # win << a_view
      
      win << check_box(:frame => [300, 200, 80, 24])
      
      win << text_field(:frame => [400, 200, 80,29])
      win << label(:frame => [400, 300, 80,29])
      
      table = CPTableView.alloc.initWithFrame CGRectMake(400, 100, 300, 200)
      win << table
      
    end
  end
  
  def application_menu
    @application_menu ||= menu do |main|
      main.submenu :file do |file|
        file.item :new, :key => "n"
        file.item :open, :key => "o"
        file.item :save, :key => "s"
        file.separator
        file.item :show_about_window
      end
      main.submenu :edit do |edit|
        edit.item :copy, :key => "c"
        edit.item :cut, :key => "x"
        edit.item :paste, :key => "v"
      end
    end
  end
  
end

# Require all other files.
Dir.glob(File.join(File.dirname(__FILE__), '**', '*.rb')).each { |f| require f }
