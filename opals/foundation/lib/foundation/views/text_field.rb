# 
# text_field.rb
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
  
  class TextField < Control
    
    register_builder :text_field, {}
    
    class_names 'ck-text-field'
    
    display_attributes :bezel
    
    # Set the bezel style. May be :rounded or :square
    #
    attr_accessor :bezel
    
    def initialize(layout)
      super layout
      @value = ""
      @bezel = :square
    end
    
    def create_renderer(theme)
      theme.text_field self
    end
    
    def key_down(event)
      if event.key == :return
        false
      elsif event.key == :tab
        false
      else
        true
      end
    end
    
    def key_up(event)
      puts "key up event!"
      old_value = self.value
      
      unless old_value == "some old valye...s.s.s"
        
        unless @editing
          @editing = true
        end
        
      end
      
      true
    end
    
    def _string_value=(value)
      
    end
    
  end
end
