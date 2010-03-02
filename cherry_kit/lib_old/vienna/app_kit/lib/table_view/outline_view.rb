# 
# outline_view.rb
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
  
  class OutlineView < TableView
    
    def delegate=(an_object)
      @delegate = an_object
    end
    
    def delegate
      @delegate
    end
    
    def data_source=(a_source)
      @data_source = a_source
    end
    
    def data_source
      @data_source
    end
    
    def outline_table_column=(outline_table_column)
      @outline_table_column = outline_table_column
    end
    
    def outline_table_column
      @outline_table_column
    end
    



    def expandable?
      false
    end
    
    def expand_item(item, expand_children:expand_children)
      
    end
    
    def expand_item(item)
      expand_item(item, expand_children:false)
    end
    
    def collapse_item(item, collapse_children:collapse_children)
      
    end
    
    def collapse_item(item)
      collapse_item(item, collapse_children:false)
    end
    
    def reload_item(item, reload_children:reload_children)
      
    end
    
    def reload_item(item)
      reload_item(item, reload_children:false)
    end
    
    def parent_for_item(item)
      nil
    end
    
    
    
    def item_at_row(row)
      
    end
    
    def row_for_item(item)
      
    end
    
    
    
    def level_for_item(item)
      
    end
    
    def level_for_row(row)
      
    end
    
    def item_expanded?(item)
      
    end
    
    
    def indentation_per_level=(indentation_per_level)
      @indentation_per_level = indentation_per_level
    end
    
    def indentation_per_level
      @indentation_per_level || 16
    end
    
    def indentation_marker_follows_cell=(flag)
      @indentation_marker_follows_cell = flag
    end
    
    def indentation_marker_follows_cell?
      @indentation_marker_follows_cell
    end
    
  end
end
