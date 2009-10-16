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
      # puts named_images
      # first check hash of images
      if named_images.has_key? name
        return named_images[name]
      end
      # then try declared sprites
      if sprite_images.has_key? name
        
      end
      # lastly, try and load from a url
      img = image_with_contents_of_url name
      named_images[name] = img
      img
      #    need to add to known images...
    end
    
    # Hash. key - image name, value - Image instance
    def self.named_images
      @@named_images ||= {}
    end
    
    # All defined sprite images. These are stored until they are needed. The
    # hash uses the image name as the key, and an array as the value: containing
    # the 'parent' image at index 0, and it's rect, as an array, at index 2.
    def self.sprite_images
      @@sprite_images ||= {}
    end
    
    def self.define_sprite_image_named name, in_image:image, with_rect:rect
      sprite_images[name] = [image, rect]
    end
    
    # state that we want this resource, so start downloading it IF NOT already
    # done so. also, run the block, as it might use the resource
    # 
    # Also, the app cannot be run until all resources are downloaded/or they
    # fail to download.
    def self.resource name, &block
      img = image_named name
      yield img
      
      # if named_images.has_key? name
        # return named_images[name]
        # yield named_images[name]
      # end
    end
    
    def initialize
      super
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
      @status = :loading
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
      puts 'WAYYY'
    end
    
    def sprite name, rect
      # puts "Making sprite named #{name}"
    end
    
    
    def size= size
      @size = size
    end
    
    def size
      @size
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
  
end

