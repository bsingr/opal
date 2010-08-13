# 
# controller.rb
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

require 'foundation/core/bindings'

module CherryKit
  
  class Controller
    
    def initialize
      @editors = []
    end
    
    # Returns whether or not this controller is currently editing content
    # 
    # @returns true or false
    # 
    def editing?
      @editors.length > 0
    end
    
    def commit_editing?
      return true if @editors.length == 0
      
      result = true
      
      @editors.each do |editor|
        unless editor.commit_editing?
          result = false 
        end
      end
      
      result
    end
    
    def discard_editing
      @editors.each do |editor|
        editor.discard_editing
      end
    end
    
    def object_did_begin_editing(editor)
      @editors << editor
    end
    
    def object_did_end_editing(editor)
      @editors.delete editor
    end
    
  end
end
