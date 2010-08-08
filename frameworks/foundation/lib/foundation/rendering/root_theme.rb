# 
# root_theme.rb
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

require "foundation/rendering/theme"

module CherryKit
  
  # The RootTheme is the base theme for all cherry kit and cherry touch 
  # applications. Other themes should probbaly inherit from this theme.
  class RootTheme < Theme
    
    # Return a new view renderer for this theme. The view renderer takes control
    # of the basics, such as setting up class names, setting the element DOM id
    # and setting a basic background color.
    # 
    # @param {CherryKit::View} view the view owner
    # @returns {CherryKit::Renderer} the view renderer
    # 
    def self.view(view)
      RootTheme::View.new view, self
    end
    
    def self.button(view)
      RootTheme::Button.new view, self
    end
    
    def self.control(view)
      RootTheme::Control.new view, self
    end
    
    def self.slider(view)
      RootTheme::Slider.new view, self
    end
    
  end
  
  # RootTheme.register :root_theme
end
