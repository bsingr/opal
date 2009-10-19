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
  
  Vienna::Builder.new :main_menu do |builder|
    
    app_delegate = RubyWebApp::AppController.new
    VN::App.delegate = app_delegate
    
    Vienna::Window.build :frame => VN::Rect.new(100, 100, 400, 400), :title => 'My Window!' do |win|
        
      my_button = Vienna::Button.build :frame => VN::Rect.new(10,10,90,24), :bezel => :rounded
      win << my_button
      my_button.needs_display = true
      
      my_slider = Vienna::Slider.build :frame => VN::Rect.new(10,50,90,24), :bezel => :rounded
      win << my_slider
      my_slider.needs_display = true
      
      my_text_field = Vienna::TextField.build :frame => VN::Rect.new(10, 70, 180, 32)
      win << my_text_field
      my_text_field.needs_display = true
      
      my_check = Vienna::CheckBox.build :frame => VN::Rect.new(10,100,90,24), :bezel => :rounded
      win << my_check
      my_check.needs_display = true
    
    end  
  end
end
