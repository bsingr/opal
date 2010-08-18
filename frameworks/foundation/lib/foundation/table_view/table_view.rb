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
      # views used for rendering cells. Hash of column => array of views
      @table_column_views = {}
      # default row indexes - none
      @selected_row_indexes = IndexSet.new
      # by default allow no row selection
      @allows_empty_selection = true
      # default single selection only
      @allows_multiple_selection = false
      # keep tabs on what needs drawing or updating
      @dirty_rows = []
      # keep tabs on what columns need drawing/updating
      @dirty_columns = []
      # the methods that data source has implemented
      @data_source_methods = []
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
      @data_source_methods = []
      
      unless @data_source.respond_to? :number_of_rows_in_table_view
        raise "TableView delegate #{@data_source} does not respond to 'number_of_rows_in_table_view'"
      end
      
      unless @data_source.respond_to? :value_for_table_view_at
        raise "TableView delegate #{@data_source} does not respond to 'value_for_table_view_at'"
      end
      
      if @data_source.respond_to? :table_view_write_rows_to_pasteboard
        @data_source_methods << :table_view_write_rows_to_pasteboard
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
    
    def create_renderer(theme)
      theme.table_view self
    end
    
    def update_renderer
      super
      
      _update_render_rows
    end
    
    # Private method. Whenever we redisplay, this method is called to render
    # the rows for the table... if it needs it.
    # 
    # If we do not need to reload all data, then only @dirty_rows will be
    # updated. Typically these are rows that either were selected, or ones that
    # are now selected.
    # 
    def _update_render_rows
      # if everything must be reloaded..
      if @reload_all_data
        # completely re render
        _render_data_views_for
        @reload_all_data = false
      else
        # call this for all new rows.. or, call _update_data_views_for() for 
        # rows that need update (were selected/no longer selected, or their data
        # changed etc)
        _update_data_views_for
      end
    end
    
    def _render_data_views_for(rows, columns)
      @table_columns.each do |column|
        # go through each table unless we should not render it (hidden)
        unless column.hidden?
          puts "need to render #{column}"
          
          @table_column_views[column] = @table_column_views[column] || []
          
          (0).upto(number_of_rows - 1) do |row|
            puts "need to render row #{row}"
            view = _create_data_view_for(row, column)
            frame = _frame_of_data_view_at(row, column)
            view.layout = {
              :left   => frame.x,
              :top    => frame.y,
              :width  => frame.width,
              :height => frame.height
            }
            view.value = _table_data_value_for row, column
            
            view.selected = row_selected? row
            
            puts "view is #{view}"
            
            add_subview(view) unless view.superview == self
            # @table_column_data_views[table_column][row] = view
          end
        end
      end
    end
    
    def _update_data_views_for()
      
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
    
    def row_at_point(point)
      row = (point.y / @row_height).to_i
      
      `if (#{row} >= #{@number_of_rows}) {
        return #{nil};
      }
      return #{row};`
    end
    
    # Gets the data for the row at the given column (by data source, or by
    # bindings)
    def _table_data_value_for(row, column)
      @data_source.value_for_table_view_at row, column
    end
    
    def start_tracking?(location)
      row = row_at_point location
      
      @start_tracking_location = location
      # @start_tracking_time = Time.now
      
      if @allows_empty_selection && row == nil
        select_row_indexes IndexSet.new, false
      end 
      
      # send a note that we are changing selection
      notify :table_view_selection_is_changing
      
      # if we have a row, select it
      if row && !@data_source_methods.include?(:table_view_write_rows_to_pasteboard)
        # puts "need to _update)wutg_selection"
        _update_with_selection_at_row row
      end
    end
    
    def stop_tracking(location)
      puts "stop trackinhg.. tableview"
    end
    
    def continue_tracking?(location)
      row = row_at_point location
    end
    
    # mouse event has caused us to select the given row (mouse is there now)
    def _update_with_selection_at_row(row)
      return unless row
      
      if @allows_multiple_selection
        puts "allows multiple selection!"
        indexes = @selected_row_indexes
        indexes.add_index row
      elsif row < @number_of_rows
        # single selection only, so set our selection indexes to just this row - 
        # only if row exists (< number_of_rows)
        indexes = IndexSet.new row
      else
        puts "deselect all rows!"
      end
      
      # if our selection hasnt actually changed, lets ignore
      return if @selected_row_indexes == indexes
      
      return if !@allows_empty_selection && indexes.count == 0
      
      select_row_indexes indexes, false
    end
    
    def select_row_indexes(indexes, extend_selection)
      if extend_selection
        new_indexes = @selected_row_indexes.dup
        new_indexes.add_indexes indexes
      else
        new_indexes = indexes.dup
      end
      
      self._selected_row_indexes = new_indexes
    end
    
    def _selected_row_indexes=(indexes)
      old_indexes = @selected_row_indexes.dup
      puts "setting indexes #{indexes.length}"
      @selected_row_indexes = indexes
      self.needs_display = true
    end
    
    # Returns whether or not the given row index is selected
    # 
    # @param {Number} index to check
    # @returns {true|false}
    # 
    def row_selected?(index)
      @selected_row_indexes.include? index
      # true
    end
    
  end
end
