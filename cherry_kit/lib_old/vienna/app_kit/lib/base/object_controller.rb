# 
# object_controller.rb
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
  
  class ObjectController < Controller
    
    def init_with_content content
      @content = content
    end
    
    def content= content
      @content = content
    end
    
    def content
      @content
    end
    
    def selection
      
    end
    
    def selected_objects
      
    end
    
    def automatically_prepares_content= flag
      @automatically_prepares_content = flag
    end
    
    def automatically_prepares_content?
      @automatically_prepares_content
    end
    
    def prepare_content
      
    end
    
    def object_class= a_class
      @object_class = a_class
    end
    
    def object_class
      @object_class
    end
    
    def new_object
      
    end
    
    def add_object obj
      
    end
    
    def remove_object obj

    end
    
    def editable?
      @editable
    end
    
    def editable= flag
      @editable = flag
    end
    
    def add sender
      
    end
    
    def can_add?
      
    end
    
    def remove sender
    
    end
    
    def can_remove?
      
    end
  end
end
