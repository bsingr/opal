# 
# image.rb
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
  
  class Image
    
    
    # Image Load Statuses
    # -------------------
    # :completed
    # :cancelled
    # :invalid_data
    # :unexpected_eof
    # :read_error
    
    def self.image_named name
      
    end
    
    def init_with_size size
      
    end
    
    def init_with_data data
      
    end
    
    def init_with_contents_of_url url
      
    end
    
    
    def size= size
      @size = size
    end
    
    def size
      @size
    end
    
    def name= name
      @name = name
    end
    
    def name
      @name
    end
    
    def background_color= color
      @background_color = color
    end
    
    def background_color
      @background_color
    end
    
    def draw_at_point point, from_rect:from_rect, operation:op, fraction:delta
      
    end
    
    def draw_in_rect rect, from_rect:from_rect, operation:op, fraction:delta
      
    end
    
    def draw_representation image_rep, in_rect:rect
      
    end
    
    def representations
      @representations
    end
    
    def add_representations image_reps
      
    end
    
    def add_representation image_rep
      
    end
    
    def remove_representation image_rep
      
    end
    
    def valid?
      
    end
    
    def lock_focus
      
    end
    
    def unlock_focus
      
    end
    
    
    # Image Delegates can optionally respond to any of the following methods:
    # 
    # image_did_not_draw sender, in_rect:a_rect
    # 
    # image image, will_load_representation:rep
    # image image, did_load_representation:rep, with_status:status
    def delegate= obj
      @delegate = obj
    end
    
    def delegate
      @delegate
    end
    
    def alignment_rect
      @alignment_rect
    end
    
    def alignment_rect= rect
      @alignment_rect = rect
    end
  end
  
end

