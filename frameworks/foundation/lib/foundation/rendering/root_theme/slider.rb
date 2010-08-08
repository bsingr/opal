# 
# slider.rb
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

require 'foundation/rendering/root_theme/control'

module CherryKit
  
  module RootTheme
    
    class Slider < Control

      # Initial render
      def render(render_context)
        # render super (Control)
        super render_context
        # inners
        render_slider render_context
      end
      
      def render_slider(render_context)
        render_context << ["<span class='inner'>",
          "<span class='left'></span>",
          "<span class='middle'></span>",
          "<span class='right'></span>",
          "<span class='handle' style='left:50%'></span>",
          "</span>"].join("")
      end
      
      def update
        # keep control updated
        super
        # puts "view.value is #{@view.value}"
        @element.find('.handle').css :left  => "#{@view.value}%"
      end
      
      # Our track indent is theme dependant, and it depends on the control size.
      # When calculating the value for a given mouse location, the track indent
      # is required, and used, to calculate a more specific value. If a custom
      # theme indents the track by more (or less) than the following amounts,
      # then redefine this attribute in a subclass (subtheme).
      # 
      theme_attribute :track_indent, 
        :small    => 5,
        :regular  => 7,
        :large    => 9
      
    end
  end
end
