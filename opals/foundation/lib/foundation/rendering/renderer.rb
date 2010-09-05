# 
# renderer.rb
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
  
  # Base Renderer class. This is the base class of all renderers. It should be
  # used for rendering views to the DOM. There are two key methods: render()
  # which is used for the initial render, and update() which is used to update
  # a rendering context.
  # 
  class Renderer
    
    # Renderer initializer. The renderer takes a single parameter, view. The
    # view is the owner of the renderer and is used by renderers to reference
    # the view to get updates needed for display, such as the current title etc
    # 
    # @param {CherryKit::View} view renderer owner
    # @param {CherryKit::Theme} theme that this renderer belongs to
    # 
    def initialize(view, theme)
      # puts "in base renderer with view: #{view}"
      @view = view
      @theme = theme
      @class_names = []
    end
    
    def element
      @element
    end
    
    # Core method to render to the given context. Default action is to do
    # nothing. The root theme overrides this for the basic behaviour.
    # 
    # @param {CherryKit::RenderContext} render_context to render into
    # @returns {Renderer} self
    # 
    def render(render_context)
      # do nothing
    end
    
    # Core method for updating the render context. Again, default is to do
    # nothing, but root theme overrides this.
    # 
    # We do not take a param because we interact with the DOM directly. We only
    # use a render context when first making the view, i.e. in render()
    # 
    def update()
      
    end
    
    # Theme attribute.
    # 
    # This method is used to define some theme values that the views might need
    # access to for calculating various proerpties. For example, a slider will
    # need to know how much the track is indented from the boundry of the view,
    # and so this method will allow a simple and easy customization for that
    # property to make theme independant values.
    # 
    # values can either be a hash:
    # 
    #     theme_attribute :control_size,
    #       :small    => 10,
    #       :regular  => 20,
    #       :large    => 30
    # 
    # which will define the following methods:
    # 
    #     def theme_attribute_for_control_size_small
    #       10
    #     end
    # 
    #     def theme_attribute_for_control_size_regular
    #       20
    #     end
    # 
    # or a single value
    #   
    #     theme_attribute :min_size, 100
    # 
    # which will define the following method
    # 
    #     def theme_attribute_for_min_size
    #       100
    #     end
    # 
    # These will be accessed by the views using either
    # 
    #     renderer.theme_attribute_for :control_size, :regular
    # 
    # or..
    # 
    #     renderer.theme_attribute_for :min_size
    # 
    # Any method which you need custom code to calculate values, simply just
    # create a method matching the previous formats so that it will be called
    # instead.
    # 
    def self.theme_attribute(attribute_name, values)
      
    end
    
    # get theme attribute
    def theme_attribute_for(name, second)
      `if (!#{second}) #{second} = #{nil};`
      
      if second
        __send__ "theme_attribute_for_#{name}_#{second}"
      else
        __send__ "theme_attribute_for_#{name}"
      end
    end

  end
end
