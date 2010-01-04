# 
# font.rb
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
  
  class Font
    
    class << Font
      
      def font_with_name(font_name, size:font_size)
        font_with_name(font_name, size:font_size, is_bold:false)
      end
      
      def font_with_name(font_name, size:font_size, is_bold:is_bold)
        
      end
      
      # presets
      def user_font_of_size(size)
        
      end
      
      def system_font_of_size(size)
        
      end
      
      def bold_system_font_of_size(size)
        self.new('Arial', size, true)
      end
      
      def label_font_of_size(size)
        
      end
      
      def title_bar_font_of_size(size)
        
      end
      
      def menu_font_of_size(size)
        
      end
      
      def menu_bar_font_of_size(size)
        
      end
      
      def message_font_of_size(size)
        
      end
      
      def palette_font_of_size(size)
        
      end
      
      def tool_tips_font_of_size(size)
        
      end
      
      def control_content_font_of_size(size)
        @control_content_font ||= self.new('Arial', size, false)
      end
      
      def system_font_size
        12
      end
      
      def small_system_font_size
        10
      end
      
      def label_font_size
        12
      end
      
      def system_font_size_for_control_size(control_size)
        case control_size
        when :regular
          12
        when :small
          10
        when :mini
          8
        else
          12
        end
      end
    end
    
    def initialize(font_name, size, is_bold)
      @font_name = font_name
      @size = size
      @bold = is_bold
    end
    
    def init_with_coder(coder)
      @font_name = coder.decode_object :name
      @size = coder.decode_int :size
      @bold = coder.decode_bool :bold
    end
    
    def font_name
      @font_name
    end
    
    def size
      @size
    end
    
    def bold?
      @bold
    end
    
    def css_string
      bold_str = @bold ? "bold " : ""
      "#{bold_str} #{@size}px '#{font_name}'"
    end
    
    def set
      
    end
    
    def cssFont
      
    end
    
  end
end
