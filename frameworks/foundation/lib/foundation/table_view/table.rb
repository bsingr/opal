# 
# table.rb
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

require 'foundation/views/scroll'

module CherryKit
  
  # TableView is based on iOS's table view, rather than Cocoas. Basically,
  # single column much like iOS
  class TableView < ScrollView
    
    class_names 'ck-table-view'
    
    def initialize(layout, style)
      # scrollview initialization
      super layout
      # :plain or :grouped
      @style = :plain
      # default row height - ideal for touch
      @row_height = 44
      # we never want a horizontal scroller - ever
      self.has_horizontal_scroller = false
    end
    
    def data_source=(data_source)
      return if @data_source == data_source
      
      required = [:table_view_number_of_rows_in_section,
                  :table_view_cell_for_row_at_index_path]
      
      required.each do |method|
        unless data_source.respond_to? method
          raise "TableView: delegate does not respond to '#{method}'"
        end
      end

      @data_source = data_source
      
      reload_data
    end
    
    def reload_data
      @reload_all_data = true
      # force a reload
      @number_of_sections = nil
      @number_of_rows_in_section = []
      number_of_sections
      
      puts "our table view has #{number_of_sections} sections"
      
      self.needs_display = true
    end
    
    def update
      super
      _update_table_render
    end
    
    def _update_table_render
      if @reload_all_data
        number_of_sections.times do |section|
          _render_section section
        end
        @reload_all_data = false
      else
        
      end
    end
    
    def _render_section(section)
      puts "need to render section #{section}"
      rows = number_of_rows_in_section(section)
      
      puts "need to render #{rows} row(s)"
      
      rows.times do |row|
        path = IndexPath.new [section, row]
        view = @data_source.table_view_cell_for_row_at_index_path self,  path
        puts "view for #{row} is #{view}"
        
        add_subview(view) unless view.superview == self
      end
    end
    
    # ==============================
    # = Drawing areas of the table =
    # ==============================
    
    def rect_for_section(section)
      # if we have already calculated it, just return it
      return @rect_for_section[section] if @rect_for_section[section]
      # otherwise rect for section is the sections header, plus all the rows
      # within that section, plus the section footer
      rect = Browser::Rect.new 0, 0, 0, 0
      
      rect
    end
    
    def rect_for_row_at_index_path(index_path)
      
    end
    
    def rect_for_header_in_section(section)
      # no headers yet, so default is 0, 0, 0, 0
      Browser::Rect.new 0, 0, 0, 0
    end
    
    def rect_for_footer_in_section(section)
      # default 0, 0, 0, 0 rect as we dont have footers.. yet
      Browser::Rect.new 0, 0, 0, 0
    end
    
    # ==========================
    # = Configuring table view =
    # ==========================
    
    def number_of_sections
      return @number_of_sections if @number_of_sections
      
      # assume data source, not binding (for now)
      if @data_source.respond_to? :number_of_sections_in_table_view
        num = @data_source.number_of_sections_in_table_view self
      else
        num = 1
      end
      
      @number_of_sections = num
    end
    
    # Gets the number of rows in the given section
    # 
    # @param {Number} section number
    # @returns number of rows
    # 
    def number_of_rows_in_section(section)
      @number_of_rows_in_section[section] if @number_of_rows_in_section[section]
      
      rows = @data_source.table_view_number_of_rows_in_section self, section
      
      @number_of_rows_in_section[section] = rows
    end
    
    def dequeue_reusable_cell_with_identifier(identifier)
      
    end
  
  end
end
