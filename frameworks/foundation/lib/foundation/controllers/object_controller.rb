# 
# object_controller.rb
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

require 'foundation/controllers/controller'

module CherryKit
  
  class ObjectController < Controller
    
    expose_binding :editable
    
    expose_binding :content_object
    
    keys_affecting :can_add => [:editable]
    
    keys_affecting :can_insert => [:editable]
    
    keys_affecting :can_remove => [:editable, :selection]
    
    keys_affecting :content_object => [:content]
    
    attr_reader :content
    
    attr_accessor :selection
    
    attr_accessor :object_class
    
    def initialize(content)
      super
      self.content = `#{content} || #{nil}`
      self.editable = true
      self.object_class = Hash
    end
    
    def content=(content)
      # puts "setting content to #{content}"
      unless @content == content
        will_change_attribute :content_object
        _selection_will_change
        @content = content
        did_change_attribute :content_object
        _selection_did_change
      end
      
      content
    end
    
    def _selection_will_change
      will_change_attribute :selection
      @selection.controller_will_change if @selection
    end
    
    def _selection_did_change
      @selection = ControllerSelectionProxy.new(self) unless @selection
      @selection.controller_did_change
      did_change_attribute :selection
    end
    
    def selected_objects
      [@content]
      # []
    end
    
    # Create a new instance of the object_class
    # 
    def new_object
      object_class.new
    end
    
    # Add the given object
    # 
    def add_object(object)
      self.content = object
    end
    
    # An action to add a new object. This simply adds a new instance of our
    # object class.
    # 
    def add(sender)
      add_object new_object
    end
    
    # True/false whether this object controller is able to add an object. This
    # is determined by whether the receiver is editable or not
    # 
    # @returns {true|false}
    # 
    def can_add?
      editable?
    end
    
    def can_remove?
      editable? && selected_objects.length > 0
    end
    
    def editable?
      @editable
    end
    
    def editable=(editable)
      @editable = editable
    end
    
    def automatically_prepares_content?
      @automatically_prepares_content
    end
    
    attr_writer :automatically_prepares_content
    
    # def observe
    
    attr_reader :_observed_keys
    
    def _content_object
      content
    end
    
    def _content_object=(value)
      self.content = value
    end
  end
end
