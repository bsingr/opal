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

module Vienna
  
  DOCUMENT_CHANGE_TYPES = {
    :done                 => 0,
    :undone               => 1,
    :cleared              => 2,
    :redone               => 5,
    :read_other_contents  => 3,
    :autosaved            => 4
  }
  
  SAVE_OPERATION_TYPES = {
    :save_operation       => 0,
    :save_as_operation    => 1,
    :save_to_operation    => 2,
    :autosave_operation   => 3
  }
  
  class Document
    
    def initialize
      super
    end
    
    def init_with_type(type_name, error:out_error)
      initialize
    end
    
    def init_with_contents_of_url(absolute_url, of_type:type_name, error:out_error)
      
    end
    
    
    
    def file_type=(type_name)
      @file_type = type_name
    end
    
    def file_type
      @file_type
    end
    
    
    def file_url=(absolute_url)
      @file_url = absolute_url
    end
    
    def file_url
      @file_url
    end
    
    
    def file_modification_date=(modification_date)
      @file_modification_date = modification_date
    end
    
    def modification_date
      @modification_date
    end
    
    
    def revert_document_to_saved(sender)
      
    end
    
    def revert_to_contents_of_url(absolute_url, of_type:type_name, error:out_error)
      
    end
    
    
    def read_from_url(absolute_url, of_type:type_name, error:out_error)
      
    end
    
    def read_from_file_wrapper(file_wrapper, of_type:type_name, error:out_error)
      
    end
    
    def read_from_data(data, of_type:type_name, error:out_error)
      
    end
    
    
    def write_to_url(absolute_url, of_type:type_name, error:out_error)
      
    end
    
    def file_wrapper_of_type(type_name, error:out_error)
      
    end
    
    def data_of_type(type_name, error:out_error)
      
    end
    
    
    
    def save_document(sender)
      
    end
    
    def save_document_as(sender)
      
    end
    
    def save_document_to(sender)
      
    end
    
    def document(document, did_save:did_save_successfully, context_info:context_info)
      
    end
    
    
    def save_document_with_delegate(delegate, did_save_selector:did_save_selector, context_info:context_info)
      
    end
    
    def document(document, did_save:did_save_successfully, context_info:context_info)
      
    end
    
    def run_modal_save_panel_for_save_operation(save_operation, delegate:delegate, did_save_selector:did_save_selector, context_info:context_info)
      
    end
    
    def should_run_save_panel_with_accessory_view?
      true
    end
    
    def prepare_save_panel(save_panel)
      
    end
    
    def can_close_document_with_delegate(delegate, should_close_selector:should_close_selector, context_info:context_info)
      
    end
    
    def close
      
    end
    
    
    
    def document_edited?
      
    end
    
    def update_change_count(change)
      
    end
    
    def undo_manager=(undo_manager)
      @undo_manager = undo_manager
    end
    
    def undo_manager
      @undo_manager
    end
  end
end
