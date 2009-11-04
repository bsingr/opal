# 
# color.rb
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
  
  class Color
    
    def self.color_with_calibrated_white white, alpha:alpha
      
    end
    
    def self.color_with_calibrated_hue hue, saturation:saturation, brightness:brightness, alpha:alpha
      
    end
    
    def self.color_with_calibrated_red red, green:green, blue:blue, alpha:alpha
      
    end
    
    def self.black_color
      self.color_with_calibrated_red 0.0, green:0.0, blue:0.0, alpha:1.0
    end
    
    def self.dark_gray_color
      self.color_with_calibrated_red 0.333, green:0.333, blue:0.333, alpha:1.0
    end
    
    def self.light_gray_color
      self.color_with_calibrated_red 0.667, green:0.667, blue:0.667, alpha:1.0
    end
    
    def self.white_color
      self.color_with_calibrated_red 1.0, green:1.0, blue:1.0, alpha:1.0
    end
    
    def self.gray_color
      self.color_with_calibrated_red 0.5, green:0.5, blue:0.5, alpha:1.0
    end
    
    def self.red_color
      self.color_with_calibrated_red 1.0, green:0.0, blue:0.0, alpha:1.0
    end
    
    def self.green_color
      self.color_with_calibrated_red 0.0, green:1.0, blue:0.0, alpha:1.0
    end
    
    def self.blue_color
      self.color_with_calibrated_red 0.0, green:0.0, blue:1.0, alpha:1.0
    end
    
    def self.cyan_color
      self.color_with_calibrated_red 0.0, green:1.0, blue:1.0, alpha:1.0
    end
    
    def self.yellow_color
      self.color_with_calibrated_red 1.0, green:1.0, blue:0.0, alpha:1.0
    end
    
    def self.magenta_color
      self.color_with_calibrated_red 1.0, green:0.0, blue:1.0, alpha:1.0
    end
    
    def self.orange_color
      self.color_with_calibrated_red 1.0, green:0.5, blue:0.0, alpha:1.0
    end
    
    def self.purple_color
      self.color_with_calibrated_red 0.5, green:0.0, blue:0.5, alpha:1.0
    end
    
    def self.brown_color
      self.color_with_calibrated_red 0.6, green:0.4, blue:0.2, alpha:1.0
    end
    
    def self.clear_color
      self.color_with_calibrated_red 0.0, green:0.0, blue:0.0, alpha:0.0
    end
  end  
end
