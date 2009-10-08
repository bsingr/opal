# 
# view.rb
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
  
  # Auto resixzing masks
  # ====================
  # :none   
  # :width
  # :height
  # :min_x 
  # :min_y 
  # :max_x 
  # :max_y 
  
  # Border masks
  # ============
  # :none
  # :line
  # :bezel
  # :groove
  
  
  class View
    
    def initialize(frame)
      
    end
    
    def window
      
    end
    
    def superview
      
    end
    
    def subviews
      
    end
    
    def descendant_of?(a_view)
      
    end
    
    def ancestor_shared_with_view(a_view)
      
    end
    
    def opaque_ancestor
      
    end
    
    def hidden=(flag)
      
    end
    
    def hidden?
      
    end
    
    def hidden_or_has_hidden_ancestor?
      
    end
    
    def view_did_hide
      
    end
    
    def view_did_unhide
      
    end
    
    def subviews=(new_subviews)
      
    end
    
    def add_subview(a_view)
      
    end
    
    def <<(a_view)
      add_subview a_view
    end
    
    def add_subview(a_view, positioned:place, relative_to:other_view)
      
    end
    
  end
end