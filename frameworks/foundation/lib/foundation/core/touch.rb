# 
# touch.rb
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

module CherryKit
  
  class Touch
    
    attr_accessor :event
    
    attr_accessor :view
    
    attr_writer :window
    
    # Create a touch object from the native touch object, that will most
    # probably be gathered straight from the event which created it
    def self.from_native(native_touch_object)
      `var result = #{allocate};
      result.__touch__ = #{native_touch_object};
      result.__identifier__ = #{native_touch_object}.identifier;
      var target = #{native_touch_object}.target;
      
      while (target) {
        if (!target.id) {
          target = target.parentNode; 
        } else {
          break;
        }
      }
      
      target.style.webkitTransform = "translate3d(0px, 0px, 0px)";
      
      result.__target__ = target;
      
      result.__pageX__ = #{native_touch_object}.pageX;
      result.__pageY__ = #{native_touch_object}.pageY;
            
      return result;`
    end
    
    def identifier
      `return #{self}.__identifier__;`
    end
    
    def view
      return @view if @view
      element = `#{self}.__target__`
      @view = CherryKit::View[`#{element}.id`]
    end
    
    def window      
      @window = view.window
    end
    
    def location_in_client
      return @location_in_client if @location_in_client
      
      @location_in_client = Browser::Point.new `#{self}.__touch__.pageX`, `#{self}.__touch__.pageY`
    end
    
    def location_in_view(view)
      offset = view.render_context.element.element_offset
      client = location_in_client
      
      Browser::Point.new(client.x - offset.x, client.y - offset.y)
    end
    
    def location_in_window(window)
      
    end
  end
end
