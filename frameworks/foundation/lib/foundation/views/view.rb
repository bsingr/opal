# 
# view.rb
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

require 'foundation/core/responder'
require 'foundation/core/builder'

module CherryKit
  
  class View < Responder
    
    def initialize(frame)
      # initialize
    end
    
    # Return the theme name to use for the view. In all systems, root_theme is
    # used as the default. To use another theme, set the theme_name property for
    # the window when created so that all subviews will inherit that theme.
    # 
    # @returns {Symbol} theme name
    # 
    def theme_name
      :root_theme
    end
    
    # Returns the receivers container view
    # 
    # @returns [View] containing view
    # 
    def superview
      @superview
    end
    
    def render_context
      @render_context
    end
    
    def create_render_context
      return @render_context if @render_context
      
      render_context = RenderContext.new tag_name      
      render_with_render_context render_context
      
      @render_context = render_context
    end
    
    def render_with_render_context(render_context)
      __update_renderer
      
      @view_renderer.render render_context
      
      # if we have set renderer.. might not always be set (root view etc)
      if @renderer
        @renderer.render render_context
      end
    end
    
    # Update the renderer. We assume we have our render context, so we just need
    # to make sure we have our actual renderer available (usually from a theme)
    def __update_renderer
      if @view_renderer
        puts "need to call on renderer to update"
      else
        __create_renderer
      end
    end
    
    # create the renderer - private method that calls actual create_renderer
    def __create_renderer
      # find the right theme
      theme = Theme.find_theme theme_name
      
      unless theme
        raise "Cannot find theme named #{theme_name}"
      end
      
      # every view will have a view_renderer that handles the basics
      @view_renderer = theme.view self
      # the renderer for our custom view. Our renderer might be nil. The base
      # view for example does not create a renderer, so do not always assume
      # that one will exist
      @renderer = create_renderer theme

    end
    
    # create the renderer just for this view. By default this implementation is
    # empty, but this should be overridden to create the necessary rendererer
    # from the given theme for your view.
    # 
    # @param {CherryKit::Theme} theme to create renderer from
    # @returns {CherryKit::Renderer} renderer
    # 
    def create_renderer(theme)
      # do nothing by default
    end
    
    def update_renderer
      # do we actually need this?
    end
    
    # Root element tag_name used for building the responder context. Should be a
    # Symbol. Default is <tt>:div</tt>
    # 
    # @returns {Symbol} tag name
    # 
    def tag_name
      :div
    end
    
    # Default class name for views. Override this method
    def class_names
      ['ck-view']
    end
    
  end
end
