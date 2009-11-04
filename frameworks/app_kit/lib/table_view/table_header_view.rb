# 
# table_header_view.rb
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
  
  class TableHeaderView < View
    
    def initialize(frame)
      super frame
    end
    
    def class_name
      'vn-table-header-view'
    end
    
    def render(context)
      if context.first_time?
        context.class_name = class_name
        context.first_time = false
      end
      
      children = context.child_nodes
      
      table_columns = @table_view.table_columns
      i = 0
      columns = table_columns.length
      intercell_spacing = @table_view.intercell_spacing
      cell_frame = Rect.new(0, 0, bounds.width, bounds.height)
      
      if children < columns
        (columns - children).times do |i|
          context << "<div></div>"
        end
      end
      
      columns.times do |i|
        column = table_columns[i]
        width = column.width + intercell_spacing.width
        cell_frame.width = width
        
        context.child_node(i) do |column_context|
          if i < children
            column_context.first_time = false
          else
            column_context.first_time = true
          end
          # RenderContext.current_context = column_context
          column_context.frame = cell_frame
          column.header_cell.render_with_frame(cell_frame, in_view:self)
        end

        cell_frame.x += width
      end
    end
    
    def table_view=(table_view)
      @table_view = table_view
    end
    
    def table_view
      @table_view
    end
    
    def dragged_column
      @dragged_column
    end
    
    def dragged_distance
      @dragged_distance
    end
    
    def resized_column
      @resized_column
    end
    
    # Column index
    def header_rect_of_column(column)
      
    end
    
    # Retunrs column index
    def column_at_point(point)
      
    end
  end
end
