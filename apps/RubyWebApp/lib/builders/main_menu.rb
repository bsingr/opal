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
        
      Vienna::Button.build :frame => VN::Rect.new(10,10,90,24), :bezel => :rounded do |button|
        win << button
        button.title = 'Normal'
        button.alignment = :left
        button.bind :enabled, to_object:app_delegate, with_key_path:'test_binding', options:nil        
        # button.theme_name = :my_theme
        button.needs_display = true
      end
      
      Vienna::Button.build :frame => VN::Rect.new(10,40,90,24), :bezel => :rounded do |button|
        win << button
        button.title = 'Disabled'
        button.enabled = false
        button.alignment = :center
        # button.theme_name = :my_theme
        button.needs_display = true
      end
      
      Vienna::Button.build :frame => VN::Rect.new(10,70,90,24), :bezel => :rounded do |button|
        win << button
        button.title = 'Right'
        button.enabled = false
        button.alignment = :right
        # button.theme_name = :my_theme
        button.needs_display = true
      end
      
      Vienna::CheckBox.build :frame => VN::Rect.new(10,100,90,24), :bezel => :rounded do |button|
        win << button
        button.title = 'Check'
        button.enabled = true
        
        button.control_size = :small

        button.needs_display = true
      end
    
      Vienna::CheckBox.build :frame => VN::Rect.new(10,130,90,24), :bezel => :rounded do |button|
        win << button
        button.title = 'Checkon'
        button.state = :on
        # button.control_tint = :graphite

        button.needs_display = true
      end
      
      Vienna::CheckBox.build :frame => VN::Rect.new(10,160,90,24), :bezel => :rounded do |button|
        win << button
        button.title = 'Checkon'
        button.state = :on
        button.enabled = false
        # button.control_tint = :graphite

        button.needs_display = true
      end
          
      Vienna::Slider.build :frame => VN::Rect.new(10,190,90,24), :bezel => :rounded do |slider|
        win << slider
        slider.needs_display = true
      end
      # 
      # Vienna::TextField.build :frame => VN::Rect.new(10, 70, 180, 26), :editable => true do |text|
      #   win << text
      #   text.needs_display = true
      # end
      # 
      # Vienna::CheckBox.build :frame => VN::Rect.new(10,100,90,24), :bezel => :rounded do |check|
      #   win << check
      #   check.needs_display = true
      # end    
    end  
  end
end
