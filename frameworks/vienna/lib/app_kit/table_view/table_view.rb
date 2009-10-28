# 
# table_view.rb
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
  
  class TableView < Control
    
    def initialize frame
      super frame
      
      @row_height = 17.0
      @intercell_spacing = Size.new(3.0, 2.0)
      @number_of_rows = -1
      @table_columns = []
    end
    
    # Required
    #   number_of_rows_in_table_view(table_view)
    #   table_view(table_view, object_value_for_table_column:table_column, row:row)
    # 
    # Optional - Editing
    #   table_view(table_view, set_object_value:object, for_table_column:table_column, row:row)
    # 
    # Optional - Sorting
    #   table_view(table_view, sort_descriptors_did_change:old_descriptors)
    # 
    # Optional - Drag and drop
    #   table_view(table_view, write_rows_with_indexes:row_indexes, to_pasteboard:pasteboard)
    #   table_view(table_view, validate_drop:info, proposed_row:row, proposed_drop_operation:drop_operation)
    #   table_view(table_view, accept_drop:info, row:row, drop_operation:drop_operation)
    #   table_view(table_view, names_of_promised_files_dropped_at_destination:drop_destination, for_dragged_rows_with_indexes:index_set)
    # 
    def data_source= a_source
      @data_source = a_source
    end
    
    def data_source
      @data_source
    end
    
    # 
    # Setup required cells for drawing (do not actually draw here)
    #   table_view(table_view, will_display_cell:cell, for_table_column:table_column, row:row)
    # 
    # Return boolean whether the tableview can allow editing of the cell at row column
    #   table_view(table_view, should_edit_table_column:table_column, row:row)
    # 
    #   selection_should_change_in_table_view?(table_view)
    # 
    def delegate= a_delegate
      @delegate
    end
    
    def delegate
      @delegate
    end
    
    def header_view= header_view
      @header_view = header_view
    end
    
    def header_view
      @header_view
    end
    
    def corner_view= corner_view
      @corner_view = corner_view
    end
    
    def corner_view
      @corner_view
    end
    
    def allows_column_reordering= flag
      @allows_column_reordering = flag
    end
    
    def allows_column_reordering?
      @allows_column_reordering
    end

    
    def allows_column_resizing= flag
      @allows_column_resizing = flag
    end
    
    def allows_column_resizing?
      @allows_column_resizing
    end
    
    def column_autoresizing_style= style
      @column_autoresizing_style = style
    end
    
    def column_autoresizing_style
      @column_autoresizing_style
    end
    
    def grid_style_mask= grid_type
      @grid_style_mask = grid_type
    end
    
    def grid_style_mask
      @grid_style_mask
    end
    
    def intercell_spacing= size
      @intercell_spacing = size
    end
    
    def intercell_spacing
      @intercell_spacing
    end
    
    
    def uses_alternating_row_background_colors= flag
      @uses_alternating_row_background_colors = flag
    end 
    
    def uses_alternating_row_background_colors?
      @uses_alternating_row_background_colors
    end
    
    def background_color= color
      @background_color = color
    end
    
    def background_color
      @background_color
    end

    def grid_color= color
      @grid_color = color
    end
    
    def grid_color
      @grid_color
    end
    
    def row_height= height
      @row_height = height
    end
    
    def row_height
      @row_height
    end
    
    def note_height_of_rows_with_indexes_changed index_set
      
    end

    def table_columns
      @table_columns
    end
    
    def number_of_columns
      @table_columns.length
    end
    
    def number_of_rows
      if @number_of_rows < 0
        if @data_source
          if @data_source.respond_to?(:number_of_rows_in_table_view)
            @number_of_rows = @data_source.number_of_rows_in_table_view(self)
          else
            puts 'ERROR: @data_source does not respond to #number_of_rows_in_table_view'
            @number_of_rows = 0
          end
        else
          @number_of_rows = 0
        end
      end
      
      @number_of_rows
    end
    
    def add_table_column(table_column)
      @table_columns << table_column
      table_column.table_view = self
      reload_data
    end
    
    def remove_table_column table_column
      
    end
    
    def move_column old_index, to_column:new_index
      
    end
    
    def column_with_identifier
      
    end
    
    def table_column_with_identifier
      
    end
    
    def tile
      
    end
    
    def size_to_fit
      
    end
    
    def size_last_column_to_fit
      
    end
    
    def scroll_row_to_visible row
      
    end
    
    def scroll_column_to_visible column
      
    end
    
    def reload_data
      note_number_of_rows_changed    
      self.needs_display = true
    end
    
    def note_number_of_rows_changed
      @number_of_rows = -1
  
      rows = self.number_of_rows
      size = Size.new(@frame.width, @frame.height)

      if rows > 0
        size.width = rect_of_row(0).width
      end

      if @table_columns.length > 0
        size.height = rect_of_column(0).height
      end
      # self.frame_size = size
    end
    
    # Complete render (every row, every cell)
    def render(context)
      _synchronize_render_context_with_data(context)
      render_background_in_clip_rect(@bounds, context)
    end
    
    # this method makes sure that there are enough rows and columns for rendering.
    # In raw terms, each row is contained within a DIV. Each column has a DIV inside
    # every row. Looking like this:
    # 
    # -------------------------------------------------------------------------
    # ------------  --------------  --------------  --------------  -----------
    # | r0 c0    |  | r0 c1      |  | r0 c2      |  | r0 c3      |  | r0 c4   |
    # ------------  --------------  --------------  --------------  -----------
    # -------------------------------------------------------------------------
    # 
    # -------------------------------------------------------------------------
    # ------------  --------------  --------------  --------------  -----------
    # | r1 c0    |  | r1 c1      |  | r1 c2      |  | r1 c3      |  | r1 c4   |
    # ------------  --------------  --------------  --------------  -----------
    # -------------------------------------------------------------------------
    # 
    # This process involves checking the number of child elements in the render
    # context, and if it is equal to the current number of rows, then that is
    # fine. If it is less, then we need to add more divs to make the number equal
    # and, if it is more, then we need to remove these extra divs. The same
    # process is then repeated for columns per row. This is likely to change less
    # often than row numbers changing
    def _synchronize_render_context_with_data(context)
      children = context.child_nodes
      rows = number_of_rows

      if children < rows
        # we need to add extra rows!
        # first, make sure current rows are right size
        children.times do |i|
          rect = rect_of_row(i)
          context.child_node i { |elem| elem.css :width => "#{rect.width}px" }
        end
        # 'extra' rows
        (rows - children).times do |i|
          rect = rect_of_row(children + i)
          context << "<div style='top:#{rect.y}px;left:#{rect.x}px;width:#{rect.width}px;height:#{rect.height}px;'></div>"
        end
      elsif rows < children
        # we need to remove surplus rows
      else
        children.times do |i|
          rect = rect_of_row(i)
          context.child_node(i) { |elem| elem.css :width => "#{rect.width}px" }
        end
      end
    end
    
    # need to remove this second param
    def render_background_in_clip_rect(clip_rect, context)
      # puts "Rendering background in"
      # puts clip_rect
    end
    
    def render_row row, clip_rect:clip_rect
      
    end

    
    
    
    def reload_data_for_row_indexes(row_indexes, column_indexes:column_indexes)
      
    end
    
    def edited_column
      
    end
    
    def edited_row
      
    end
    
    def clicked_column
      
    end
    
    def clicked_row
      
    end
    
    def double_action= selector
      @double_action = selector
    end
    
    def double_action
      @double_action
    end

    def sort_descriptors= array
      @sort_descriptors = array
    end
    
    def sort_descriptors
      @sort_descriptors
    end
    
    def set_indicator_image an_image, in_table_column:table_column
      
    end
    
    def indicator_image_in_table_column table_column
      
    end
    
    def highlighted_table_column= table_column
      @highlighted_table_column = table_column
    end
    
    def highlighted_table_column
      @highlighted_table_column
    end

    def vertical_motion_can_begin_drag= flag
      @vertical_motion_can_begin_drag = flag
    end
    
    def vertical_motion_can_begin_drag
      @vertical_motion_can_begin_drag
    end
    
    def can_drag_rows_with_indexes row_indexes, at_point:mouse_down_point
      
    end
    
    def drag_image_for_rows_with_indexes drag_rows, table_columns:table_columns, event:drag_event, offset:drag_image_offset
      
    end
    
    def set_dragging_source_operation_mask mask, for_local:is_local
      
    end
    
    def set_drop_row row, drop_operation:drop_operation
      
    end
    
    def allows_multiple_selection= flag
      @allows_multiple_selection = flag
    end
    
    def allows_multiple_selection?
      @allows_multiple_selection
    end
    
    def allows_empty_selection= flag
      @allows_empty_selection = flag
    end
    
    def allows_empty_selection?
      @allows_empty_selection
    end
    
    def allows_column_selection= flag
      @allows_column_selection = flag
    end
    
    def allows_column_selection?
      @allows_column_selection
    end
    
    def select_all sender
      
    end
    
    def deselect_all sender
      
    end
    
    def select_column_indexes indexes, by_extending_selection:extend_flag
      
    end
    
    def select_row_indexes indexes, by_extending_selection:extend_flag
      
    end
    
    def selected_column_indexes
      @selected_column_indexes
    end
    
    def selected_row_indexes
      @selected_row_indexes
    end
    
    def deselect_column column
      
    end
    
    def deselect_row row
      
    end
    
    def selected_column
      
    end
    
    def selected_row
      
    end
    
    def column_selected? column
      
    end
    
    def row_selected? row
      
    end
    
    def number_of_selected_columns
      
    end
    
    def number_of_selected_rows
      
    end
    
    
    def allows_type_select?
      @allows_type_select
    end
    
    def allows_type_select= value
      @allows_type_select = value
    end
    
    
    def selection_highlight_style= style
      @selection_highlight_style = style
    end
    
    def selection_highlight_style
      @selection_highlight_style
    end
    
    
    def dragging_destination_feedback_style= style
      @dragging_destination_feedback_style = style
    end
    
    def dragging_destination_feedback_style
      @dragging_destination_feedback_style
    end
    
    # Calculates the full rect of the specified column number
    def rect_of_column(column)
      result = Rect.new(0,0,0,0)
      return result if column < 0 || column >= @table_columns.length
      
      rows = number_of_rows
      i = 0
      
      `for (i = 0; i < column; i++) {`
        result.x += @table_columns[i].width + @intercell_spacing.width
      `}`
      
      `for (i = 0; i < rows; i++) {`
        result.height += @row_height + @intercell_spacing.height
      `}`
      
      result
    end
    
    # Calculates the full rect of the specified row
    def rect_of_row(row)
      result = Rect.new(0, 0, 0, 0)
      return result if row < 0 || row >= self.number_of_rows
      
      i = 0
      `for (i = 0; i < row; i++) {`
        result.y += @row_height + @intercell_spacing.height
      `}`
      
      
      column = @table_columns.length
      `for (i = 0; i < column; i++) {`
        result.width += @table_columns[i].width + @intercell_spacing.width
      `}`
      
      result.height = @row_height + @intercell_spacing.height
      result
    end
    
    def column_indexes_in_rect rect
      
    end
    
    def rows_in_rect rect
      
    end
    
    def column_at_point point
      
    end
    
    def row_at_point point
      
    end
    
    def frame_of_cell_at_column column, row:row
      
    end
    
    def prepared_cell_at_column column, row:row
      
    end
    
    
    
    def text_should_begin_editing? text_obj
      
    end
    
    def text_should_end_editing? text_obj
      
    end
    
    def text_did_begin_editing notification
      
    end
    
    def text_did_end_editing notification
      
    end
    
    def text_did_change notification
      
    end
    
    
    
    def autosave_name= name
      @autosave_name
    end
    
    def autosave_name
      @autosave_name
    end
    
    def autosave_table_columns= save
      @autosave_table_columns
    end
    
    def autosave_table_columns?
      @autosave_table_columns
    end
    
    
    
    def should_focus_cell cell, at_column:column, row:row
      
    end
    
    def focused_column
      @focused_column
    end
    
    def focused_column= column
      @focused_column = column
    end
    
    def perform_click_on_cell_at_column column, row:row
      
    end
    
    
    
    
    def edit_column column, row:row, with_event:the_event, select:select
      
    end
    
    def draw_row row, clip_rect:clip_rect
      
    end
    
    def highlight_selection_in_clip_rect clip_rect
      
    end
    
    def draw_grid_in_clip_rect clip_rect
      
    end
    
    def draw_background_in_clip_rect clip_rect
      
    end
  end
end
