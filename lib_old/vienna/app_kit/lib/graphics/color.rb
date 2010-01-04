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
      self.new(red, green, blue, alpha)
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
      self.color_with_calibrated_red 255.0, green:255.0, blue:255.0, alpha:1.0
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
    
    
    
    class << Color
      
      def control_shadow_color
        self.color_with_calibrated_red 0.0, green:0.0, blue:0.0, alpha:0.0
      end
      
      def control_dark_shadow_color
        self.color_with_calibrated_red 0.0, green:0.0, blue:0.0, alpha:0.0
      end
      
      def control_color
        self.color_with_calibrated_red 0.0, green:0.0, blue:0.0, alpha:0.0
      end
      
      def control_highlight_color
        self.color_with_calibrated_red 0.0, green:0.0, blue:0.0, alpha:0.0
      end
      
      def control_light_highlight_color
        self.color_with_calibrated_red 0.0, green:0.0, blue:0.0, alpha:0.0
      end
      
      def control_text_color
        self.color_with_calibrated_red 79, green:79, blue:79, alpha:1.0
      end
      
      def control_background_color
        self.color_with_calibrated_red 0.0, green:0.0, blue:0.0, alpha:0.0
      end
      
      def selected_control_color
        self.color_with_calibrated_red 119, green:141, blue:168, alpha:1.0
      end
      
      def secondary_selected_control_color
        self.color_with_calibrated_red 0.0, green:0.0, blue:0.0, alpha:0.0
      end
      
      def selected_control_text_color
        self.color_with_calibrated_red 0.0, green:0.0, blue:0.0, alpha:0.0
      end
      
      def disabled_control_text_color
        self.color_with_calibrated_red 164, green:164, blue:164, alpha:1.0
      end
      
      def text_color
        self.color_with_calibrated_red 0.0, green:0.0, blue:0.0, alpha:0.0
      end
      
      def text_background_color
        self.color_with_calibrated_red 0.0, green:0.0, blue:0.0, alpha:0.0
      end
      
      def selected_text_color
        self.color_with_calibrated_red 0.0, green:0.0, blue:0.0, alpha:0.0
      end
      
      def selected_text_background_color
        self.color_with_calibrated_red 0.0, green:0.0, blue:0.0, alpha:0.0
      end
      
      def grid_color
        self.color_with_calibrated_red 0.0, green:0.0, blue:0.0, alpha:0.0
      end
      
      def keyboard_focus_indicator_color
        self.color_with_calibrated_red 0.0, green:0.0, blue:0.0, alpha:0.0
      end
      
      def window_background_color
        self.color_with_calibrated_red 0.0, green:0.0, blue:0.0, alpha:0.0
      end
      
      def scroll_bar_color
        self.color_with_calibrated_red 0.0, green:0.0, blue:0.0, alpha:0.0
      end
      
      def knob_color
        self.color_with_calibrated_red 0.0, green:0.0, blue:0.0, alpha:0.0
      end
      
      def selected_knob_color
        self.color_with_calibrated_red 0.0, green:0.0, blue:0.0, alpha:0.0
      end
      
      def window_frame_color
        self.color_with_calibrated_red 0.0, green:0.0, blue:0.0, alpha:0.0
      end
      
      def window_frame_text_color
        self.color_with_calibrated_red 0.0, green:0.0, blue:0.0, alpha:0.0
      end
      
      def selected_menu_item_color
        self.color_with_calibrated_red 0.0, green:0.0, blue:0.0, alpha:0.0
      end
      
      def selected_menu_item_text_color
        self.color_with_calibrated_red 0.0, green:0.0, blue:0.0, alpha:0.0
      end
      
      def highlight_color
        self.color_with_calibrated_red 0.0, green:0.0, blue:0.0, alpha:0.0
      end
      
      def shadow_color
        self.color_with_calibrated_red 0.0, green:0.0, blue:0.0, alpha:0.0
      end
      
      def header_color
        self.color_with_calibrated_red 0.0, green:0.0, blue:0.0, alpha:0.0
      end
      
      def header_text_color
        self.color_with_calibrated_red 0.0, green:0.0, blue:0.0, alpha:0.0
      end
      
      def alternate_selected_control_color
        self.color_with_calibrated_red 0.0, green:0.0, blue:0.0, alpha:0.0
      end
      
      def alternarte_selected_control_text_color
        self.color_with_calibrated_red 0.0, green:0.0, blue:0.0, alpha:0.0
      end
      
      def control_alternating_row_background_colors
        self.color_with_calibrated_red 234.0, green:234.0, blue:234.0, alpha:0.0
      end
      
      def color_for_control_tint(control_tint)
        self.color_with_calibrated_red 0.0, green:0.0, blue:0.0, alpha:0.0
      end
      
      def current_control_tint
        
      end
    end
    
    def initialize(r,g,b,a)
      @red = r
      @green = g
      @blue = b
      @alpha = a
    end
    
    def highlight_with_level(val)
      
    end
    
    def shadow_with_level(val)
      
    end
    
    def rgb_string
      "rgb(#{@red},#{@green},#{@blue})"
    end
    
    def rgba_string
      "rgb(#{@red},#{@green},#{@blue},#{@alpha})"
    end
    
    def set
      set_fill
      set_stroke
    end
    
    def set_fill
      ctx = GraphicsContext.current_context.graphics_port
      CGContextSetFillColor(ctx, self)
    end
    
    def set_stroke
      ctx = GraphicsContext.current_context.graphics_port
      CGContextSetStrokeColor(ctx, self)
    end
  end  
end
