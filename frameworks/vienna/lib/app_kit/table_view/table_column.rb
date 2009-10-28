# 
# table_column.rb
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
  
  class TableColumn
    
    def initialize(identifier)
      self.identifier = identifier
      # @header_cell = TableHeaderCell.new("")
      @data_cell = TextFieldCell.new("")
      # 'nice' default width
      @width = 100
    end
    
    def identifier=(identifier)
      @identifier = identifier
    end
    
    def identifier
      @identifier
    end
    
    def table_view=(table_view)
      @table_view = table_view
    end
    
    def table_view
      @table_view
    end
    
    def width=(width)
      @width
    end
    
    def width
      @width
    end
    
    def min_width=(min_width)
      @min_width = min_width
    end
    
    def min_width
      @min_width
    end
    
    def max_width=(max_width)
      @max_width = max_width
    end
    
    def max_width
      @max_width
    end
    
    def header_cell=(cell)
      @header_cell = cell
    end
    
    def header_cell
      @header_cell
    end
    
    def data_cell
      @data_cell
    end
    
    def data_cell=(data_cell)
      @data_cell = data_cell
    end
    
    def data_cell_for_row
      @data_cell_for_row
    end
    
    def editable=(flag)
      @editable
    end
    
    def editable?
      @editable
    end
    
    def size_to_fit
      
    end
    
    def sort_descriptor_prototype=(sort_descriptor)
      @sort_descriptor_prototype = sort_descriptor
    end
    
    def sort_descriptor_prototype
      @sort_descriptor_prototype
    end
    
    def resizing_mask=(resizing_mask)
      @resizing_mask = resizing_mask
    end
    
    def resizing_mask
      @resizing_mask
    end
    
    def header_tool_tip=(string)
      @header_tool_tip = string
    end
    
    def header_tool_tip
      @heder_tool_tip
    end
    
    def hidden?
      @hidden
    end
    
    def hidden=(flag)
      @hidden = flag
    end    
  end  
end
