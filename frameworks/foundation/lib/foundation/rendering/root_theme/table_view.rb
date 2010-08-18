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

require 'foundation/rendering/root_theme/control'

module CherryKit
  
  module RootTheme
    
    # TableView renderer
    # 
    # rows and columns divs do not hold actual cells, but just the rows and
    # column highlight/selections etc (also grid lines). On each uopdate they
    # are repositioned to be in the right frame. Also, if we have alternating
    # background in our table view, fake rows need to be made to carry on
    # the alternating pattertn past last line. 
    # 
    # Each data cell./view is actually a subview, so it will be positioned
    # by the tableview itself.
    class TableView < Control

      # Initial render
      def render(render_context)
        super render_context
        # array of all rows. index based to row number (instances of Element)
        @row_elements = []
        # array of all column elements
        @column_elements = []
        # inners
        render_rows_and_columns render_context
      end
      
      def render_rows_and_columns(render_context)
        render_context << "<div class='rows'></div><div class='columns'></div>"
      end
      
      def update
        # keep control updated
        super
        # reposition each row/column div.
        update_rows_and_columns
      end
      
      def update_rows_and_columns
        # first do all rows
        old_rows = @row_elements.length
        new_rows = @view.number_of_rows
        delta_rows = new_rows - old_rows

        if delta_rows > 0
          # need to make delta_rows number of extra rows
          delta_rows.times do |row|
            @row_elements << @element.find('.rows').div(:class_name => 'row')
          end
          # @element.find('.rows').div
        elsif delta_rows < 0
          # need to remove (or hide) delta number of rows
          puts "need to remove extra divs?"
        end
        
        @row_elements.each_with_index do |row, index|
          rect = @view.rect_of_row index
          row.css :left => "#{rect.x}px",
                  :top => "#{rect.y}px", 
                  :height => "#{rect.height}px", 
                  :right => "0px"
          
          row.set_class_names 'selected' => @view.row_selected?(index)
        end
      end
      
    end
  end
end
