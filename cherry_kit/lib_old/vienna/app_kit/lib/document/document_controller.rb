# 
# document_controller.rb
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
  
  class DocumentController
    
    def DocumentController.shared_document_controller
      @shared_document_controller ||= self.new()
    end
    
    def initialize
      # 0 = dont autosave (for now)
      @autosaving_delay = 0
      @documents = []
      @document_types = Bundle.main_bundle.info_dictionary['document_types']
    end
    
    def documents
      @documents
    end
    
    def current_document
      App.main_window.window_controller.document
    end
    
    def current_directory
      puts "self #{_cmd} not implemented."
    end
    
    def document_for_url(absolute_url)
      
    end
    
    def document_for_window(window)
      window.window_controller.document
    end
    
    def add_document(document)
      @documents << document
    end
    
    def remove_document(document)
      @documents.delete(document)
    end
    
    def new_document(sender)
      type = @document_types[0]['type_name']
    end
    
    def open_untitled_document_and_display(display_document, error:out_error)
      doc = make_untitled_document_of_type(default_type, error:nil)
      
      add_document(doc) unless doc.nil?
      doc.make_window_controllers
      
      doc.show_windows if display_document
      doc
    end
    
    def make_untitled_document_of_type(type_name, error:out_error)
      doc_class = document_class_for_type(type_name)
      doc = doc_class.new(type_name, out_error)
      
      unless doc
        puts "Error creating document of type #{type_name}"
        # present_error(out_error)
      end
      
      doc
    end
    
    def open_document(sender)
      
    end
    
    def urls_from_running_open_panel
      
    end
    
    def run_modal_open_panel(open_panel, for_types:types)
      
    end
    
    def open_document_with_contents_of_url(absolute_url, display:display_document, error:out_error)
      
    end
    
    def make_document_with_contents_of_url(absolute_url, of_type:type_name, error:out_error)
      
    end
    
    def autosaving_delay=(autosaving_delay)
      @autosaving_delay = autosaving_delay
    end
    
    def autosaving_delay
      @autosaving_delay
    end
    
    def save_all_documents(sender)
      
    end
    
    def has_edited_documents?
      false
    end
    
    def review_unsaved_documents_with_alert_title(title, cancellable:cancellable, delegate:delegate, did_review_all_selector:did_review_all_selector, context_info:context_info)
      
    end
    
    def close_all_documents_with_delegate(delegate, did_close_all_selector:did_close_all_selector, context_info:context_info)
      
    end
    
    def present_error(error, modal_for_window:window, delegate:delegate, did_present_selector:did_present_selector, context_info:context_info)
      
    end
    
    def present_error?(error)
      
    end
    
    def will_present_error(error)
      
    end
    
    def maximum_recent_document_count
      
    end
    
    def clear_recent_documents(sender)
      
    end
    
    def note_new_recent_document(document)
      
    end
    
    def note_new_recent_document_url(absolute_url)
      
    end
    
    def recent_document_urls
      
    end
    
    
    
    def default_type
      return nil if @document_types.length == 0
      @document_types[0]['type_name']
    end
    
    def type_for_contents_of_url(in_absolute_url, error:out_error)
      
    end
    
    def document_class_names
      
    end
    
    def document_class_for_type(type_name)
      
    end
    
    def display_name_for_type(type_name)
      
    end
    
    def validate_user_interface_item?(an_item)
      
    end
  end
end
