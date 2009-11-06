# 
# paragraph_style.rb
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
  
  TEXT_TAB_TYPES = {
    :left               => 0,
    :right              => 1,
    :center             => 2,
    :decimal            => 3
  }
  
  LINE_BREAK_MODES = {
    :word_wrapping      => 0,
    :char_wrapping      => 1,
    :clipping           => 2,
    :truncating_head    => 3,
    :truncating_tail    => 4,
    :truncating_middle  => 5
  }
  
  class ParagraphStyle
    
    def ParagraphStyle.default_paragraph_style
      
    end
    
    def line_spacing
      @line_spacing
    end
    
    def line_spacing=(a_float)
      @line_spacing = a_float
    end
    
    def paragraph_spacing
      @paragraph_spacing
    end
    
    def paragraph_spacing=(a_float)
      @paragraph_spacing = a_float
    end
    
    def alignment
      @alignment
    end
    
    def alignment=(an_alignment)
      @alignment = an_alignment
    end
    
    def head_indent
      @head_indent
    end
    
    def head_indent=(a_float)
      @head_indent = a_float
    end
    
    def tail_indent
      @tail_indent
    end
    
    def tail_indent=(a_float)
      @tail_indent = a_float
    end
    
    def first_line_head_indent
      @first_line_head_indent
    end
    
    def first_line_head_indent=(a_float)
      @first_line_head_indent = a_float
    end
    
    def tab_stops
      
    end
    
    def minimum_line_height
      
    end
    
    def maximum_line_height
      
    end
    
    def line_break_mode
      
    end
    
    def header_level
      
    end
  end
end
