# 
# control.rb
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

require 'foundation/rendering/root_theme/view'

module CherryKit
  
  class RootTheme
    
    class Control < View
      
      # The control sizes for the control_size theme attribute. In most cases
      # these will determine the ideal height for a control, but some controls
      # might use this value for vertical controls (e.g a vertical scroller)
      # 
      theme_attribute :control_size,
        :mini     => 15,
        :small    => 18,
        :regular  => 22,
        :large    => 25
      
      # Initial render
      def render(render_context)
        # view renderer
        super render_context
        # @element = render_context.element
        render_context.set_class_names calculate_class_names
        render_context.add_class_name @view.control_size.to_s
      end
      
      def update
        super
        element.set_class_names calculate_class_names
        # need to compare old control size to current.. incase it chnaged..
      end
      
      # calculate the class names (for render and update) for this control
      def calculate_class_names
        {
          'disabled'    => !@view.enabled?,
          'selected'    => @view.selected?,
          'highlighted' => @view.highlighted?
        }
      end
      
    end # View
  end # RootTheme
end