# 
# table_view.rb
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

require 'foundation/views/control'

module CherryKit
  
  class TableView < Control
    
    class_names 'ck-table-view'
    
    
    def initialize(layout)
      super layout
      # default row height..get from theme?
      @row_height = 23
      @table_columns = []
      # views used for table columns themselves
      @table_column_views = {}
      # views used for rendering cells. Hash of column => array of views
      @table_column_data_views = {}
    end
    
    # add table column
    def <<(column)
      @table_columns << column
      column.table_view = self
      self.needs_display = true
    end
    
    def remove_table_column(column)
      return unless column.table_view == self
    end
    
    # set all columns in one go
    # 
    # @param {Array} columns
    # 
    def table_columns=(columns)
      columns.each do |column|
        self << column
      end
    end
    
    def data_source=(data_source)
      return if @data_source == data_source
      
      @data_source = data_source
      
      unless @data_source.respond_to? :number_of_rows_in_table_view
        raise "TableView delegate #{@data_source} does not respond to 'number_of_rows_in_table_view'"
      end
      
      unless @data_source.respond_to? :value_for_table_view_at
        raise "TableView delegate #{@data_source} does not respond to 'value_for_table_view_at'"
      end
      reload_data
    end
    
    def reload_data
      @reload_all_data = true
      note_number_of_rows_changed
      self.needs_display = true
    end
    
    def note_number_of_rows_changed
      @number_of_rows = nil
      @number_of_rows = number_of_rows
      
      # puts "no rows: #{@number_of_rows}"
      self.needs_display = true
    end
    
    def number_of_rows
      return @number_of_rows if @number_of_rows
      
      # data source for now
      if @data_source
        return @data_source.number_of_rows_in_table_view self
      end
      
      0
    end
    
    def update_renderer
      super
      
      _render_columns
    end
    
    # Private method. Whenever we redisplay, this method is called to render
    # the columns (and each row within) for the table... if it needs it.
    # 
    # Each column will have its own render context.
    # 
    def _render_columns
      # if everything must be reloaded..
      if @reload_all_data
        # completely re render (need to remove each column)
        @reload_all_data = false
      end
      
      _render_data_views_for
    end
    
    def _render_data_views_for(rows, columns)
      @table_columns.each do |table_column|
        # go through each table unless we should not render it (hidden)
        unless table_column.hidden?
          puts "need to render #{table_column}"
          
          @table_column_data_views[table_column] =  @table_column_data_views[table_column] || []
          
          (0).upto(number_of_rows - 1) do |row|
            puts "need to render row #{row}"
            view = _create_data_view_for(row, table_column)
            frame = _frame_of_data_view_at(row, table_column)
            view.layout = {
              :left   => frame.x,
              :top    => frame.y,
              :width  => frame.width,
              :height => frame.height
            }
            view.value = _table_data_value_for row, table_column
            puts "view is #{view}"
            
            add_subview(view) unless view.superview == self
            # @table_column_data_views[table_column][row] = view
          end
        end
      end
    end
    
    def _create_data_view_for(row, column)
      column._create_data_view_for_row row
    end
    
    def _frame_of_data_view_at(row, column)
      row_rect = rect_of_row row
      column_rect = rect_of_column column
      
      Rect.new column_rect.x, row_rect.y, column_rect.width, row_rect.height
    end
    
    def rect_of_row(row)
      Rect.new(0, row * @row_height, 200, @row_height)
    end
    
    def rect_of_column(column)
      Rect.new(@table_columns.index(column) * 100, 0, 100, 200)
    end
    
    # Gets the data for the row at the given column (by data source, or by
    # bindings)
    def _table_data_value_for(row, column)
      @data_source.value_for_table_view_at row, column
    end
    
    def start_tracking?(location)
      puts "start tracking.. tableview"
    end
    
    def stop_tracking(location)
      puts "stop trackinhg.. tableview"
    end
    
    def continue_tracking?(location)
      puts "continue tracking.. tableview"
    end
    
  end
end
