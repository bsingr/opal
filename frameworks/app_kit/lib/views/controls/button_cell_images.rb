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
    SWITCH_IMAGES = {
      :blue => {
        :regular => {
          :normal => ThreeStateImage.new(
            Image.image_named('switch_blue_regular_normal'),
            Image.image_named('switch_blue_regular_highlighted'),
            Image.image_named('switch_blue_regular_disabled')),
          
          :alternate => ThreeStateImage.new(
            Image.image_named('switch_blue_regular_alternate'),
            Image.image_named('switch_blue_regular_alternate_highlighted'),
            Image.image_named('switch_blue_regular_alternate_disabled'))
        },
        :small => {
          :normal => ThreeStateImage.new(
            Image.image_named('switch_blue_small_normal'),
            Image.image_named('switch_blue_small_highlighted'),
            Image.image_named('switch_blue_small_disabled')),
          
          :alternate => ThreeStateImage.new(
            Image.image_named('switch_blue_small_alternate'),
            Image.image_named('switch_blue_small_alternate_highlighted'),
            Image.image_named('switch_blue_small_alternate_disabled'))
        },
        :mini => {
          :normal => ThreeStateImage.new(
            Image.image_named('switch_blue_mini_normal'),
            Image.image_named('switch_blue_mini_highlighted'),
            Image.image_named('switch_blue_mini_disabled')),
          
          :alternate => ThreeStateImage.new(
            Image.image_named('switch_blue_mini_alternate'),
            Image.image_named('switch_blue_mini_alternate_highlighted'),
            Image.image_named('switch_blue_mini_alternate_disabled'))
        }
      },
      
      :graphite => {
        :regular => {
          :normal => ThreeStateImage.new(
            Image.image_named('switch_blue_regular_normal'),
            Image.image_named('switch_blue_regular_highlighted'),
            Image.image_named('switch_blue_regular_disabled')),
          
          :alternate => ThreeStateImage.new(
            Image.image_named('switch_blue_regular_alternate'),
            Image.image_named('switch_blue_regular_alternate_highlighted'),
            Image.image_named('switch_blue_regular_alternate_disabled'))
        },
        :small => {
          :normal => ThreeStateImage.new(
            Image.image_named('switch_blue_small_normal'),
            Image.image_named('switch_blue_small_highlighted'),
            Image.image_named('switch_blue_small_disabled')),
          
          :alternate => ThreeStateImage.new(
            Image.image_named('switch_blue_small_alternate'),
            Image.image_named('switch_blue_small_alternate_highlighted'),
            Image.image_named('switch_blue_small_alternate_disabled'))
        },
        :mini => {
          :normal => ThreeStateImage.new(
            Image.image_named('switch_blue_mini_normal'),
            Image.image_named('switch_blue_mini_highlighted'),
            Image.image_named('switch_blue_mini_disabled')),
          
          :alternate => ThreeStateImage.new(
            Image.image_named('switch_blue_mini_alternate'),
            Image.image_named('switch_blue_mini_alternate_highlighted'),
            Image.image_named('switch_blue_mini_alternate_disabled'))
        }
      },
      
      :hud => {
        :regular => {
          :normal => ThreeStateImage.new(
            Image.image_named('switch_blue_regular_normal'),
            Image.image_named('switch_blue_regular_highlighted'),
            Image.image_named('switch_blue_regular_disabled')),
          
          :alternate => ThreeStateImage.new(
            Image.image_named('switch_blue_regular_alternate'),
            Image.image_named('switch_blue_regular_alternate_highlighted'),
            Image.image_named('switch_blue_regular_alternate_disabled'))
        },
        :small => {
          :normal => ThreeStateImage.new(
            Image.image_named('switch_blue_small_normal'),
            Image.image_named('switch_blue_small_highlighted'),
            Image.image_named('switch_blue_small_disabled')),
          
          :alternate => ThreeStateImage.new(
            Image.image_named('switch_blue_small_alternate'),
            Image.image_named('switch_blue_small_alternate_highlighted'),
            Image.image_named('switch_blue_small_alternate_disabled'))
        },
        :mini => {
          :normal => ThreeStateImage.new(
            Image.image_named('switch_blue_mini_normal'),
            Image.image_named('switch_blue_mini_highlighted'),
            Image.image_named('switch_blue_mini_disabled')),
          
          :alternate => ThreeStateImage.new(
            Image.image_named('switch_blue_mini_alternate'),
            Image.image_named('switch_blue_mini_alternate_highlighted'),
            Image.image_named('switch_blue_mini_alternate_disabled'))
        }
      }
    }
  end
end
