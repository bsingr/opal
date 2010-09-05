# 
# responder.rb
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
  
  # Should not be directly instantiated. Subclasses of CherryKit::Responder can
  # become part of the responder chain (for events etc)
  # 
  class Responder
    
    # Getter/setter for the next_responder in the responder chain
    attr_accessor :next_responder
    
    def first_responder?
      false
    end
    
    # Returns true if the receiver can become the first responder, false
    # otherwise. Default implementation always returns false.
    # 
    # @returns {true|false}
    # 
    def accepts_first_responder?
      false
    end
    
    # ========================
    # = Mouse event handling =
    # ========================
    
    def mouse_down(event)
      @next_responder.mouse_down event
    end
    
    # ========================
    # = Touch event handling =
    # ========================
    
    
    # Informs the receiver that one or more touches occured within the view
    # or window.
    # 
    # @param {Array} touches array of Touch instances representing the event
    # @param {Event} event encapsulating all the given touch events
    # 
    def touches_began(touches, event)
      puts "in responder with touches_began!"
    end
    
    def touches_ended(touches, event)
      
    end
    
    def touches_moved(touches, event)
      
    end
    
    def touched_cancelled(touches, event)
      
    end
  end
end
