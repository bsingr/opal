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
    
    def class_name
      'vn-text-field'
    end
    
    # Override textfield to take charge of handling events:
    # 
    # 1. mousedown/mouseup - allow the browser to take control so that selecting
    # text etc is not affected, and offers a smooth selection process.
    # 
    # 2. Keydown/keyup etc - override these methods. Check that events do not look
    # like keyequivalents etc, if not: pass them into textfield. If they look like
    # key equivs then we pass them upto App#send_event.
    def setup_display_context
      super
      @display_context.add_event_listener :mousedown do |event|
        `event._vn_allow_event_propagation = true;`
      end
      
      @display_context.add_event_listener :mouseup do |event|
        `event._vn_allow_event_propagation = true;`
      end
    end
    
    # Textfield created inside Div... the border, highlight etc are drawn with three
    # div and their classes, while the actual input is a raw DOM input... it handles
    # all the precise rendering, selection etc for us, so we can leave it to do its 
    # thing.
    # 
    # Extending this, for secure fields, or search fields is simply a case of 
    # swapping the css values (probably).
    def render context
      if context.first_time?
        context << "<div class='left'></div>"
        context << "<div class='middle'></div>"
        context << "<div class='right'></div>"
        context << "<input class='input'></div>"
      end
      
      context.class_name = class_name
    end
    
    
  end
  
end