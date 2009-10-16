# 
# control.rb
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

  class Control < View
    
    # cell_reader <- automatically return cell's value
    # cell_writer <- automatically set cell's value
    # combination of the above
    
    # display_properties :enabled, :selected, :state
    
    def initialize frame
      # puts 'control calling super'
      super frame
      # puts '_in control_'
      @cell = self.class.cell_class.new
    end
    
    def self.cell_class= cell_class
      # @@cell_class = cell_class
    end
    
    def self.cell_class
      @@cell_class ||= Vienna::Cell
    end
    
    def draw_rect rect
      puts 'drawing rect from control'
      @cell.draw_with_frame @bounds, in_view:self
    end
        
    def size_to_fit
        
    end
    
    def calc_size
      
    end
    
    def cell
      
    end
    
    def cell=(a_cell)
      
    end
    
    def selected_cell
      
    end
    
    def target
      
    end
    
    def target=(obj)
      
    end
    
    def action
      
    end
    
    def action=(selector)
      
    end
    
    def tag
      
    end
    
    def tag=(tag)
      
    end
    
    def selected_tag
      
    end
    
    def ignores_multi_click=(flag)
      
    end
    
    def ignores_multi_click?
      
    end
    
    def send_action_on mask
      
    end
    
    def continuous?
      
    end
    
    def continuous=(flag)
      
    end
    
    def enabled?
      
    end
    
    def enabled=(flag)
      
    end
    
    def alignment
      
    end
    
    # Valid alignments
    # :left, :right, :center, :justified, :natural
    # 
    def alignment=(mode)
      
    end
    
    def font
      
    end
    
    def font=(font)
      
    end
    
    def formatter=(new_formatter)
      
    end
    
    def formatter
      
    end
    
    def object_value=(obj)
      
    end
    
    def string_value=(obj)
      
    end
    
    # Alias for string value
    def text=(text)
      string_value = text
    end
    
    
    def int_value=(val)
      
    end
    
    def float_value=(val)
      
    end
    
    def double_value=(val)
      
    end
    
    def object_value
      
    end
    
    def string_value
      
    end
    
    def to_s
      string_value
    end
    
    def int_value
      
    end
    
    def to_i
      int_value
    end
    
    def float_value
      
    end
    
    def to_f
      float_value
    end
    
    def double_value
      
    end
    
    def needs_display
      
    end
    
    def update_cell cell
      
    end
    
    def update_cell_inside cell
      
    end
    
    def draw_cell_inside cell
      
    end
    
    def draw_cell cell
      
    end
    
    def select_cell cell
      
    end
    
    def send_action action, to:target
      
    end
    
    def take_int_value_from sender
      
    end
    
    def take_float_value_from sender
      
    end
    
    def take_double_value_from sender
      
    end
    
    def take_object_value_from sender
      
    end
    
    def take_string_value_from sender
      
    end
    
    def current_editor
      
    end
    
    def abort_editing
      
    end
    
    def validate_editing
      
    end
    
    def mouse_down the_event
      
    end
    
  end
end
