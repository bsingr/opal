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
    end
    
    # ==========================
    # = Configuring table view =
    # ==========================
    
    def dequeue_reusable_cell_with_identifier(identifier)
      
    end
  
  end
end
