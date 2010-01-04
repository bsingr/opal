# 
# document.rb
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

module InterfaceBuilder
  
  class Document < VN::Document
    
    def self.document_for_object(object)
      
    end
    
    def objects
      
    end
    
    def top_level_objects
      
    end
    
    def children_of_object(object)
      
    end
    
    def parent_of_object(object)
      
    end

    def add_object(object, to_parent:parent)
      
    end
    
    def remove_object(object)
      
    end
    
    def move_object(object, to_parent:parent)
      
    end
    
    def set_metadata(value, for_key:key, of_object:object)
      
    end
    
    def metadata_for_key(key, of_object:object)
      
    end
    
    def document_image_named(name)
      
    end
    
    def name_for_document_image(image)
      
    end
    
    def connect_outlet(outlet_name, of_source_object:source, to_destination_object:destination)
      
    end
    
    def connect_action(selector_name, of_source_object:source, to_destination_object:destination)
      
    end
    
    def connect_binding(binding_name, of_source_object:source, to_destination_object:destination, key_path:key_path, options:options)
      
    end
  end
end