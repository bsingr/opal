# 
# image.rb
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
  
  class Image
    
    
    # Image Load Statuses
    # -------------------
    # :loading
    # :completed
    # :cancelled
    # :invalid_data
    # :unexpected_eof
    # :read_error
    
    def self.image_named name
      name = name.to_s
      # puts named_images
      # first check hash of images
      if named_images.has_key? name
        return named_images[name]
      end
      # then try declared sprites
      if sprite_images.has_key? name
        
      end
      
      url = "images/#{name}.png"
      
      if name == 'controls'
        image_name = "#{name}.png"
        `if(vn_resource_stack.hasOwnProperty(#{image_name})) {`
          url = `vn_resource_stack[#{image_name}]`
        `}`
      end
      
      # lastly, try and load from a url
      # img = image_with_contents_of_url 'images/' + name + '.png'
      img = image_with_contents_of_url "images/#{name}.png"
      named_images[name] = img
      img
      #    need to add to known images...
    end
    
    # Hash. key - image name, value - Image instance
    def self.named_images
      @named_images ||= {}
    end
    
    # All defined sprite images. These are stored until they are needed. The
    # hash uses the image name as the key, and an array as the value: containing
    # the 'parent' image at index 0, and it's rect, as an array, at index 2.
    def self.sprite_images
      @sprite_images ||= {}
    end
    
    # def self.define_sprite_image_named name, in_image:image, with_rect:rect
    #   sprite_images[name] = [image, rect]
    # end
    
    # state that we want this resource, so start downloading it IF NOT already
    # done so. also, run the block, as it might use the resource
    # 
    # Also, the app cannot be run until all resources are downloaded/or they
    # fail to download.
    def self.resource name, &block
      img = image_named name
      yield img
    end
    
    def self.sprite name, rect
      # puts 'self.sprite'
      img = image_named name
      obj = self.new
      obj.image = img.image
      obj.filename = img.filename
      obj.add_representation :normal, rect:rect      
      # obj.size = Size.new(rect[2], rect[3])
      # obj.sprite_origin = Point.new(rect[0], rect[1])
      obj
    end
    
    
    def self.sprite image, normal:normal, gray_mask:gray_mask, disabled:disabled
      # puts 'self.sprite:normal:gray_mask:disabled: #{image}'
      img = image_named image
      obj = self.new
      obj.image = img.image
      obj.filename = img.filename
      obj.add_representation :normal, rect:normal
      obj.add_representation :gray_mask, rect:gray_mask
      obj.add_representation :disabled, rect:disabled
      obj
    end
    
    
    
    # Sprite cell masks to add any representations in block into the image
    def self.sprite_cell_masks name, &block
      # puts 'self.sprite_cell_masks'
      img = image_named name
      obj = self.new
      obj.image = img.image
      obj.filename = img.filename
      yield obj
      obj
    end
    
    def add_representation type, rect:array_rect
      @representations[type] = array_rect
      if type == :normal
        @size = Size.new(array_rect[2], array_rect[3])
      end
    end
    
    # def add_representation_rect array_rect
    #   unless @representations.has_key? :regular
    #     @representations[:regular] = {}
    #   end
    #   @representations[:normal] = array_rect
    # end
    
    def initialize
      super
      @representations = {}
    end
    
    def init_with_size size
      
    end
    
    def init_with_data data
      
    end
    
    def self.image_with_contents_of_url url
      obj = allocate
      obj.init_with_contents_of_url url
      obj
    end
    
    def init_with_contents_of_url url
      initialize
      # puts 'needs image named #{url}'
      @filename = url
      # @status = :loading
      @image = nil
      load
    end
    
    def status
      @status
    end
    
    def load
      return if @status == :loading || @status == :completed
      # if bob == 10 || bob == 23
      
      # end
      
      @status = :loading
      
      `self.$i_s('@image', new Image());
      
      #{@image}.onload = function() {
        #{self._image_did_load}
      };
      
      #{@image}.onerror = function() {
        #{self._image_did_error}
      };
      
      #{@image}.onabort = function() {
        #{self._image_did_error}
      };
      
      #{@image}.src = #{@filename};
      `
    end
    
    def _image_did_error
      @status = :read_error
      
      if @delegate && @delegate.respond_to? (:image_did_error)
        @delegate.image_did_error self
      end
    end
    
    def _image_did_load
      @size =  Size.new(`#{@image}.width`, `#{@image}.height`)
      # puts 'SETTING size to '
    end
    
    def sprite name, rect
      # puts "Making sprite named #{name}"
      self
    end
    
    def image
      @image
    end
    
    def image= img
      @image = img
    end
    
    def filename= name
      @filename = name
    end
    
    def filename
      @filename
    end
    
    def sprite_origin= point
      @sprite_origin = point
    end
    
    def size= size
      @size = size
    end
    
    def size
      # if not loaded, set size to 0x0
      @size || Size.new(0,0)
    end
    
    def name= name
      @name = name
    end
    
    def name
      @name
    end
    
    def background_color= color
      @background_color = color
    end
    
    def background_color
      @background_color
    end
    
    def draw_at_point point, from_rect:from_rect, operation:op, fraction:delta
      
    end
    
    def draw_in_rect rect, from_rect:from_rect, operation:op, fraction:delta
      
    end
    
    def render_in_rect rect, enabled:enabled, gray_mask:gray_mask
      ctx = RenderContext.current_context
      ctx.css :display => :block, :background_image => "url('#{filename}')"
      ctx.css :width => "#{rect.width}px", :height => "#{rect.height}px"
      ctx.css :left => "#{rect.x}px", :top => "#{rect.y}px"
      
      rep = gray_mask ? @representations[:gray_mask] : @representations[:normal]
      rep = @representations[:disabled] unless enabled
      ctx.css :background_position =>"-#{rep[0]}px -#{rep[1]}px"
    end
    
    def render_in_rect rect
      render_in_rect rect, enabled:true, gray_mask:false
    end
    
    def draw_representation image_rep, in_rect:rect
      
    end
    
    def representations
      @representations
    end
    
    def add_representations image_reps
      
    end
    
    def add_representation image_rep
      
    end
    
    def remove_representation image_rep
      
    end
    
    def valid?
      
    end
    
    def lock_focus
      
    end
    
    def unlock_focus
      
    end
    
    
    # Image Delegates can optionally respond to any of the following methods:
    # 
    # image_did_not_draw sender, in_rect:a_rect
    # 
    # image image, will_load_representation:rep
    # image image, did_load_representation:rep, with_status:status
    def delegate= obj
      @delegate = obj
    end
    
    def delegate
      @delegate
    end
    
    def alignment_rect
      @alignment_rect
    end
    
    def alignment_rect= rect
      @alignment_rect = rect
    end
  end
  
  
  class ThreePartImage
    
    def initialize(parts, vertical)
      # if orientation is null, assume :horizontal. :vertical/:horizonal are the only valid values here
    end
  end
  
  class NinePartImage
    
    def initialize(parts)
      
    end
  end
  
end

