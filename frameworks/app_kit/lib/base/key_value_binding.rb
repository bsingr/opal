# 
# key_Value_binding.rb
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
  
  class Object
    
    def self.expose_binding binding
      
    end
    
    def exposed_bindings
      []
    end
    
    def value_class_for_binding binding
      
    end
    
    def bind binding, to_object:observable, with_key_path:key_path, options:options
      unless exposed_bindings.include? binding
        puts "KVB: '#{binding}' is not exposed on object." 
      end
      
      unless observable && key_path
        puts "KVB: bad path/object for binding '#{binding}' to '#{key_path}'" 
      end
      
      unbind binding
      observable.add_observer self, for_key_path:key_path, options:options, context:binding

      @kvb_info[binding] = {
        :observed_object => observable,
        :observed_key_path => key_path,
        :options => options,
        :key => binding
      }

      set_value_for_binding binding
    end
    
    def observe_value_for_key_path path, of_object:object, change:change, context:context
      if info_for_binding(context)
        puts 'KVB: received notification for chnage of context #{context}'
        set_value_for_binding context
      end
    end
    
    # set the value from the observable's keypath
    def set_value_for_binding binding
      dict = info_for_binding binding
      obj = dict[:observed_object]
      path = dict[:observed_key_path]
      key = dict[:key]
      value = obj.value_for_key_path path
      # do transform?!?!     
      set_value value, for_key:key
    end
    
    # For chnages in views etc, propagate the new value to bound object
    def propagate_binding binding
      
      binding_dict = info_for_binding binding
      return nil unless binding_dict
      
      # transform value?
      obj = dict[:observed_object]
      path = dict[:observed_key_path]
      value = value_for_key(dict[:key])
      
      obj.set_value value, for_key_path:path
    end
        
    def unbind binding
      
    end
    
    def info_for_binding binding
      @kvb_info[binding]
    end
    
    def set_info info, for_binding:binding
      @kvb_info[binding] = info
    end
    
    def option_descriptions_for_binding binding
      
    end
  end
  
  
  
  class Object
    
    def self.set_default_placeholder placeholder, for_marker:marker, with_binding:binding
      
    end
    
    def default_placeholder_for_marker marker, with_binding:binding
      
    end  
  end
  
  
  
  class Object
    
    def object_did_begin_editing editor
      
    end
    
    def object_did_end_editing editor
      
    end
  end
  
  
  
  class Object
    
    def discard_editing
      
    end
    
    def commit_editing?
      
    end
    
    def editor editor, did_commit:did_commit, context_info:context_info
      
    end
    
    def commit_editing_with_delegate delegate, did_commit_selector:did_commit_selector, context_info:context_info
      
    end
  end
  
  BINDING_NAMES = {
    :alignment  => '',
    :alternate_image  => '',
    :alternate_title => '',
    :animate_binding => '',
    :animation_delay => '',
    :argument => '',
    :attributed_string => '',
    :content_array => '',
    :content_array_for_multiple_selection => '',
    :content => '',
    :content_dictionary => '',
    :content_height => '',
    :content_object => '',
    :content_objects => '',
    :content_set => '',
    :content_values => '',
    :content_width => '',
    :critical_value => '',
    :data => '',
    :display_pattern_title => '',
    :display_pattern_value => '',
    :document_edited => '',
    :double_click_argument => '',
    :double_click_target => '',
    :editable => '',
    :enabled => '',
    :excluded_keys => '',
    :filter_predicate => '',
    :font => '',
    :font_bold => '',
    :font_family_name => '',
    :font_italic => '',
    :font_name => '',
    :font_size => '',
    :header_title => '',
    :hidden => '',
    :image => '',
    :included_keys => '',
    :initial_key => '',
    :initial_value => '',
    :is_intermediate => '',
    :label => '',
    :localized_key_dictionary => '',
    :managed_object_context => '',
    :maximum_recents => '',
    :max_value => '',
    :max_width => '',
    :min_value => '',
    :min_width => '',
    :mixed_state_image => '',
    :off_state_image => '',
    :on_state_image => '',
    :predicate => '',
    :recent_searches => '',
    :represented_filename => '',
    :row_height => '',
    :selected_identifier => '',
    :selected_index => '',
    :selected_label => '',
    :selected_object => '',
    :selected_objects => '',
    :selected_tag => '',
    :selected_value => '',
    :selected_values => '',
    :selection_indexes => '',
    :selection_index_paths => '',
    :sort_descriptors => '',
    :target => '',
    :text_color => '',
    :title => '',
    :tool_tip => '',
    :transparent => '',
    :value => '',
    :value_path => '',
    :value_url => '',
    :visible => '',
    :warning_value => '',
    :width => ''
  }

  BINDING_OPTIONS = {
    :allows_editing_multiple_values_selection => '',
    :allows_null_argument => '',
    :always_presents_application_modal_alerts => '',
    :conditionally_sets_editable => '',
    :conditionally_sets_enabled => '',
    :conditionally_sets_hidden => '',
    :continuously_updates_value => '',
    :creates_sort_descriptor => '',
    :deletes_objects_on_remove => '',
    :display_name => '',
    :display_pattern => '',
    :content_placement_tag => '',
    :handles_content_as_compound_value => '',
    :inserts_null_placeholder => '',
    :invokes_separately_with_array_objects => '',
    :multiple_values_placeholder => '',
    :no_selection_placeholder => '',
    :not_applicable_placeholder => '',
    :null_placeholder => '',
    :raises_for_not_applicable_keys => '',
    :predicate_format => '',
    :selector_name => '',
    :selects_all_when_setting_content => '',
    :validates_immediately => '',
    :value_transformer_name => '',
    :value_transformer => ''
  }
end
