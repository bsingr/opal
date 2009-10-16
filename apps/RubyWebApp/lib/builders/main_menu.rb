# 
# main_menu.rb
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
module RubyWebApp
  
  Vienna::Builder.new :main_menu do |b|
    
    app_delegate = RubyWebApp::AppController.new
    
    # main_menu = VN::Window.build :frame => VN::Rect.new(0, 0, 100, 100), :title => 100 do |win|
    #       puts "built window!"
    #       puts win
    #       my_button = Vienna::Button.new(Vienna::Rect.new(100, 100, 100, 100))
    #         win << my_button
    #         my_button.needs_display = true
    #       # win.add_subview Vienna::Button.build :style => :bezel, :target => app_delegate, :action =>'button_clicked' do |button|
    #         # app_delegate.my_button = button
    #       # end
    #     end
       
         # Set app's delegate to our appdelegate class
         VN::App.delegate = app_delegate
       
    # some outlets..
    # app_delegate.window = main_window
  end
end

# def main
#   app_delegate = RubyWebApp::AppDelegate.new
#   
#   Vienna::App.delegate = app_delegate
#   
#   Vienna::App.run
#   my_win = Vienna::Window.new(Vienna::Rect.new(100, 100, 100, 100), [])
#   my_button = Vienna::Button.new(Vienna::Rect.new(100, 100, 100, 100))
#   my_win << my_button
#   my_button.needs_display = true
#   # puts 'done'
#   # puts my_button
#   
#   
#   tracking_area = VN::TrackingArea.tracking_area_with_rect nil, options:nil, owner:nil, user_info:nil
#   my_button.add_tracking_area tracking_area
#   
#   # puts '=================================='
#   
#   temp = RubyWebApp::TempObserver.new
#   app_delegate.add_observer temp, for_key_path:'adam', options:nil, context:nil
#   # puts 'setting value to 10...'
#   # app_delegate.adam = 10
# end
