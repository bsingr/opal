# 
# render_context.rb
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

module CherryKit
  
  # RenderContext. For now this interacts directly with the DOM. VERY 
  # inefficient, but enough to get us going
  # 
  class RenderContext
        
    def initialize(tag_name)
      @element = Browser::Element.new tag_name
    end
    
    def add_class_name(class_name)
      if @element.class_name == ""
        @element.class_name = class_name
      else
        @element.class_name = [@element.class_name, class_name].join(" ")
      end
    end
    
    def id=(id)
      @element.id = id
      self
    end
    
    def class_name=(class_name)
      @element.class_name = class_name
      self
    end
    
    def <<(string)
      `#{@element}.__element__.innerHTML += #{string};`
    end
    
    def label(&block)
      label_context = RenderContext.new :label
       `#{block}.__fun__(#{label_context});`
      @element << label_context.element
    end
    
    # hash of class names to true/false values. if true, make sure it is set, if
    # false unset it
    # 
    # @param {Hash} class_names to set/unset
    # 
    def set_class_names(class_names)
      current = @element.class_name.split ' '
      # puts "need to set_class_names for #{current.inspect}"
      
      class_names.each do |class_name, flag|
        if current.include? class_name.to_s
          unless flag
            # need to remove class_name from current array
          end
        else
          if flag
            current << class_name
          end
        end
      end
      
      @element.class_name = current.join ' '
    end
    
    def css(styles)
      @element.css styles
    end
    
    def element
      @element
    end
    
  end
end
