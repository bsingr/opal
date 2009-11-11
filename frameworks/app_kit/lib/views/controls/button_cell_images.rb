# 
# button_cell_images.rb
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
  
  class ButtonCell < Cell
    
    adam = ThreePartImage.new()
    
    BEZEL_IMAGES = {
      # The 'default' look. Textured buttons
      :round_textured => {
        :regular => {
          :normal => ThreePartImage.new(
              Image.image_named('button_bezel_normal_regular_left'),
              Image.image_named('button_bezel_normal_regular_middle'),
              Image.image_named('button_bezel_normal_regular_right')),
          
          :highlighted => ThreePartImage.new(
              Image.image_named('button_bezel_highlighted_regular_left'),
              Image.image_named('button_bezel_highlighted_regular_middle'),
              Image.image_named('button_bezel_highlighted_regular_right')),
          
          :disabled => ThreePartImage.new(
              Image.image_named('button_bezel_disabled_regular_left'),
              Image.image_named('button_bezel_disabled_regular_middle'),
              Image.image_named('button_bezel_disabled_regular_right'))
        },
        :small => {
          
        },
        :mini => {
          
        }
      },
      
      # 'Push in' buttons
      :push => {
        :regular => {
          
        },
        :small => {
          
        },
        :mini => {
          
        }
      }
    }
    
    # Switch Images - default blue control tint
    SWITCH_IMAGE_REGULAR = Image.sprite :controls, normal:[0, 0, 15, 16], gray_mask:[0, 17, 15, 16], disabled:[0, 34, 15, 16]
    SWITCH_HIGHLIGHTED_IMAGE_REGULAR = Image.sprite :controls, normal:[16, 0, 15, 16], gray_mask:[16, 17, 15, 16], disabled:[16, 34, 15, 16]
    
    SWITCH_IMAGE_SMALL = Image.sprite :controls, normal:[0, 51, 12, 13], gray_mask:[0, 65, 12, 13], disabled:[0, 79, 12, 13]
    SWITCH_HIGHLIGHTED_IMAGE_SMALL = Image.sprite :controls, normal:[13, 51, 12, 13], gray_mask:[13, 65, 12, 13], disabled:[13, 79, 12, 13]
    
    SWITCH_IMAGE_MINI = Image.sprite :controls, normal:[0, 93, 10, 11], gray_mask:[0, 105, 10, 11], disabled:[0, 117, 10, 11]
    SWITCH_HIGHLIGHTED_IMAGE_MINI = Image.sprite :controls, normal:[11, 93, 10, 11], gray_mask:[11, 105, 10, 11], disabled:[11, 117, 10, 11]
    
    # Switch Images - graphite control tint
    SWITCH_IMAGE_REGULAR_GRAPHITE = Image.sprite :controls, normal:[0, 129, 15, 16], gray_mask:[0, 146, 15, 16], disabled:[0, 163, 15, 16]
    SWITCH_HIGHLIGHTED_IMAGE_REGULAR_GRAPHITE = Image.sprite :controls, normal:[16, 129, 15, 16], gray_mask:[16, 146, 15, 16], disabled:[16, 163, 15, 16]
    
    SWITCH_IMAGE_SMALL_GRAPHITE = Image.sprite :controls, normal:[0, 180, 12, 13], gray_mask:[0, 194, 12, 13], disabled:[0, 208, 12, 13]
    SWITCH_HIGHLIGHTED_IMAGE_SMALL_GRAPHITE = Image.sprite :controls, normal:[13, 180, 12, 13], gray_mask:[13, 194, 12, 13], disabled:[13, 208, 12, 13]
    
    SWITCH_IMAGE_MINI_GRAPHITE = Image.sprite :controls, normal:[0, 222, 10, 11], gray_mask:[0, 234, 10, 11], disabled:[0, 246, 10, 11]
    SWITCH_HIGHLIGHTED_IMAGE_MINI_GRAPHITE = Image.sprite :controls, normal:[11, 222, 10, 11], gray_mask:[11, 234, 10, 11], disabled:[11, 246, 10, 11] 
  end
end
