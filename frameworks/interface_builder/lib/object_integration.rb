# 
# object_integration.rb
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

# Keypaths
IBAttributeKeyPaths
IBToOneRelationshipKeyPaths
IBToManyRelationshipKeyPaths
IBLocalizableStringKeyPaths
IBLocalizableGeometryKeyPaths
IBAdditionalLocalizableKeyPaths

module Vienna
  
  class Object
    
    def ib_default_label
      
    end
    
    def ib_default_image
      
    end
    
    def ib_populate_key_paths(key_paths)
      
    end
    
    def ib_populate_attribute_inspector_classes(classes)
      
    end
    
    def ib_populate_size_inspector_classes(classes)
      
    end
    
    def ib_rect_for_child(child, in_window_controller:controller)
      
    end
    
    def ib_object_at_loaction(window_point, in_window_controller:controller)
      
    end
    
    def ib_default_children
      
    end
    
    def ib_can_remove_children?(objects)
      
    end
    
    def ib_remove_children(objects)
      
    end
    
    def ib_is_child_view_user_movable?(child_view)
      
    end
    
    def ib_is_child_view_user_sizable?(child_view)
      
    end
    
    def ib_is_child_initially_selectable?(child)
      
    end
    
    def ib_awake_in_designable_document(document)
      
    end
    
    def ib_did_add_to_designable_document(document)
      
    end
    
    def ib_did_remove_from_designable_document(document)
      
    end
    
  end
end
