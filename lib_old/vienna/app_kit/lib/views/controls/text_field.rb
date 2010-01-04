# 
# text_field.rb
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
  
  class TextField < Control
    
    def initialize frame
      super frame
      @editable = true
      @selectable = true
    end
    
    def self.cell_class
      TextFieldCell
    end
    
    def class_name
      'vn-text-field'
    end
    
    # def display_mode
      # :draw
    # end
    
    def resign_first_responder?
      puts 'resign first responder....'
      true
    end
    
    def become_first_responder?
      puts 'becoming first responder!!'
      App.current_event.allows_propagation = true
      true
    end
    
    def mouse_down the_event
      App.current_event.allows_propagation = true
      puts "mouse down in text field"
    end
    
    
    
    def background_color= color
      @background_color = color
    end
    
    def background_color
      @background_color
    end
    
    def draws_background= flag
      @draws_background = flag
    end
    
    def draws_background?
      @draws_background
    end
    
    def text_color= color
      @text_color = color
    end
    
    def text_color
      @text_color
    end
    
    def bordered?
      @bordered
    end
    
    def bordered= flag
      @bordered = flag
    end
    
    def bezeled?
      @bezeled
    end
    
    def bezeled= flag
      @bezeled = flag
    end
    
    def editable?
      @editable
    end
    
    def editable= flag
      @editable = flag
    end
    
    def selectable?
      @selectable
    end
    
    def selectable= flag
      @selectable = flag
    end
    
    def select_text sender
      
    end
    
    def delegate
      @delegate
    end
    
    def delegate= an_obj
      @delegate = an_obj
    end
    
    def text_should_begin_editing? text_object
      true
    end
    
    def text_should_end_editing? text_object
      true
    end
    
    def text_did_begin_editing notification
      
    end
    
    def text_did_end_editing notification
      
    end
    
    def text_did_change notification
      
    end
    
    # def accepts_first_responder
      # 
    # end
    
    def bezel_style= stlye
      @bezel_style = style
    end
    
    def bezel_style
      @bezel_style
    end
    
    
    
  end
  
end

