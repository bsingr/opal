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
    
    bundle = Bundle.bundle_for_class(self)
    
    BEZEL_IMAGES = {
      # The 'default' look. Textured buttons
      :textured_rounded => {
        :regular => {
          :normal => ThreePartImage.new(
              Image.new(bundle.path_for_resource('button/textured_rounded/regular/normal_left.png'), Size.new(6, 24)),
              Image.new(bundle.path_for_resource('button/textured_rounded/regular/normal_middle.png'), Size.new(1, 24)),
              Image.new(bundle.path_for_resource('button/textured_rounded/regular/normal_right.png'), Size.new(6, 24))),
          
          :highlighted => ThreePartImage.new(
              Image.new(bundle.path_for_resource('button/textured_rounded/regular/highlighted_left.png'), Size.new(6, 24)),
              Image.new(bundle.path_for_resource('button/textured_rounded/regular/highlighted_middle.png'), Size.new(1, 24)),
              Image.new(bundle.path_for_resource('button/textured_rounded/regular/highlighted_right.png'), Size.new(6, 24))),
          
          :disabled => ThreePartImage.new(
              Image.new(bundle.path_for_resource('button/textured_rounded/regular/disabled_left.png'), Size.new(6, 24)),
              Image.new(bundle.path_for_resource('button/textured_rounded/regular/disabled_middle.png'), Size.new(1, 24)),
              Image.new(bundle.path_for_resource('button/textured_rounded/regular/disabled_right.png'), Size.new(6, 24)))
        },
        :small => {
          
        },
        :mini => {
          
        }
      },
      
      # 'Push in' buttons
      :rounded => {
        :regular => {
          :normal => ThreePartImage.new(
              Image.new(bundle.path_for_resource('button/rounded/regular/normal_left.png'), Size.new(12, 24)),
              Image.new(bundle.path_for_resource('button/rounded/regular/normal_middle.png'), Size.new(1, 24)),
              Image.new(bundle.path_for_resource('button/rounded/regular/normal_right.png'), Size.new(12, 24))),
          
          :highlighted => ThreePartImage.new(
              Image.new(bundle.path_for_resource('button/rounded/regular/highlighted_left.png'), Size.new(12, 24)),
              Image.new(bundle.path_for_resource('button/rounded/regular/highlighted_middle.png'), Size.new(1, 24)),
              Image.new(bundle.path_for_resource('button/rounded/regular/highlighted_right.png'), Size.new(12, 24))),
          
          :disabled => ThreePartImage.new(
              Image.new(bundle.path_for_resource('button/textured_rounded/regular/disabled_left.png'), Size.new(6, 24)),
              Image.new(bundle.path_for_resource('button/textured_rounded/regular/disabled_middle.png'), Size.new(1, 24)),
              Image.new(bundle.path_for_resource('button/textured_rounded/regular/disabled_right.png'), Size.new(6, 24)))
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
