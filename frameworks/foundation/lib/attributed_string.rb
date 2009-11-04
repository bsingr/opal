# 
# attributed_string.rb
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
  
  class AttributedString
    
    def initialize str, attributes
      # attributes can be nil
      @string = str
    end
    
    def string
      
    end
    
    def attributes_at_index location, effective_range:range
      
    end
    
    
    
    def length
      
    end
    
    
    def attribute attr_name, at_index:location, effective_range:range
      
    end
    
    def attributed_substring_from_range range
      
    end
    
    
    def attributes_at_index location, longest_effective_range:range, in_range:range_limit
      
    end
    
    def attribute attr_name, at_index:location, longest_effective_range:range, in_range:range_limit
      
    end
    
    
    def equal_to_attribted_sring? other
      false
    end
    
    
    def replace_characters_in_range range, with_string:str
      
    end
    
    def set_attributes attrs, range:range
      
    end
    
    
    def add_attribute name, value:valye, range:range
      
    end
    
    def add_attributes attrs, range:range
      
    end
    
    def remove_attribute name, range:range
      
    end
    
    
    def replace_characters_in_range range, with_attributed_string:attr_string
      
    end
    
    def insert_attributed_string attr_string, at_index:loc
      
    end
    
    def append_attributed_string attr_string
      
    end
    
    def delete_characters_in_range range
      
    end
    
    def set_attributed_string attr_string
      
    end
    
    
    def begin_editing
      
    end
    
    def end_editing
      
    end
  end
end
