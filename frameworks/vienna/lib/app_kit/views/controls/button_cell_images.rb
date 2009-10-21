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
    
    # Switch Images - default graphite control tint
    SWITCH_IMAGE_REGULAR = Image.sprite_cell_masks :controls do |s|
      s.add_representation :normal, rect:[0, 357, 16, 16]
      s.add_representation :gray_mask, rect:[0, 357, 16, 16]
      s.add_representation :disabled, rect:[0, 357, 16, 16]
    end
    
    SWITCH_IMAGE_SMALL = Image.sprite_cell_masks :controls do |s|
      s.add_representation :normal, rect:[0, 357, 16, 16]
      s.add_representation :gray_mask, rect:[0, 357, 16, 16]
      s.add_representation :disabled, rect:[0, 357, 16, 16]
    end
    
    SWITCH_IMAGE_MINI = Image.sprite_cell_masks :controls do |s|
      s.add_representation :normal, rect:[0, 357, 16, 16]
      s.add_representation :gray_mask, rect:[0, 357, 16, 16]
      s.add_representation :disabled, rect:[0, 357, 16, 16]
    end
    
    SWITCH_HIGHLIGHTED_IMAGE_REGULAR = Image.sprite_cell_masks :controls do |s|
      s.add_representation :normal, rect:[16, 357, 16, 16]
      s.add_representation :gray_mask, rect:[16, 357, 16, 16]
      s.add_representation :disabled, rect:[16, 357, 16, 16]
    end
    
    SWITCH_HIGHLIGHTED_IMAGE_SMALL = Image.sprite_cell_masks :controls do |s|
      s.add_representation :normal, rect:[16, 357, 16, 16]
      s.add_representation :gray_mask, rect:[16, 357, 16, 16]
      s.add_representation :disabled, rect:[16, 357, 16, 16]
    end
    
    SWITCH_HIGHLIGHTED_IMAGE_MINI = Image.sprite_cell_masks :controls do |s|
      s.add_representation :normal, rect:[16, 357, 16, 16]
      s.add_representation :gray_mask, rect:[16, 357, 16, 16]
      s.add_representation :disabled, rect:[16, 357, 16, 16]
    end
    
    # Switch Images - blue control tint
    SWITCH_IMAGE_REGULAR_BLUE = SWITCH_IMAGE_REGULAR
    SWITCH_IMAGE_SMALL_BLUE = SWITCH_IMAGE_SMALL
    SWITCH_IMAGE_MINI_BLUE = SWITCH_IMAGE_MINI

    SWITCH_HIGHLIGHTED_IMAGE_REGULAR_BLUE = Image.sprite_cell_masks :controls do |s|
      s.add_representation :normal, rect:[16, 357, 16, 16]
      s.add_representation :gray_mask, rect:[16, 357, 16, 16]
      s.add_representation :disabled, rect:[16, 357, 16, 16]
    end
    
    SWITCH_HIGHLIGHTED_IMAGE_SMALL_BLUE = Image.sprite_cell_masks :controls do |s|
      s.add_representation :normal, rect:[16, 357, 16, 16]
      s.add_representation :gray_mask, rect:[16, 357, 16, 16]
      s.add_representation :disabled, rect:[16, 357, 16, 16]
    end
    
    SWITCH_HIGHLIGHTED_IMAGE_MINI_BLUE = Image.sprite_cell_masks :controls do |s|
      s.add_representation :normal, rect:[16, 357, 16, 16]
      s.add_representation :gray_mask, rect:[16, 357, 16, 16]
      s.add_representation :disabled, rect:[16, 357, 16, 16]
    end
    
    # Switch images - HUD control tint
    SWITCH_IMAGE_REGULAR_HUD = Image.sprite_cell_masks :controls do |s|
      s.add_representation :normal, rect:[0, 357, 16, 16]
      s.add_representation :gray_mask, rect:[0, 357, 16, 16]
      s.add_representation :disabled, rect:[0, 357, 16, 16]
    end
    
    SWITCH_IMAGE_SMALL_HUD = Image.sprite_cell_masks :controls do |s|
      s.add_representation :normal, rect:[0, 357, 16, 16]
      s.add_representation :gray_mask, rect:[0, 357, 16, 16]
      s.add_representation :disabled, rect:[0, 357, 16, 16]
    end
    
    SWITCH_IMAGE_MINI_HUD = Image.sprite_cell_masks :controls do |s|
      s.add_representation :normal, rect:[0, 357, 16, 16]
      s.add_representation :gray_mask, rect:[0, 357, 16, 16]
      s.add_representation :disabled, rect:[0, 357, 16, 16]
    end
    
    SWITCH_HIGHLIGHTED_IMAGE_REGULAR_HUD = Image.sprite_cell_masks :controls do |s|
      s.add_representation :normal, rect:[16, 357, 16, 16]
      s.add_representation :gray_mask, rect:[16, 357, 16, 16]
      s.add_representation :disabled, rect:[16, 357, 16, 16]
    end
    
    SWITCH_HIGHLIGHTED_IMAGE_SMALL_HUD = Image.sprite_cell_masks :controls do |s|
      s.add_representation :normal, rect:[16, 357, 16, 16]
      s.add_representation :gray_mask, rect:[16, 357, 16, 16]
      s.add_representation :disabled, rect:[16, 357, 16, 16]
    end
    
    SWITCH_HIGHLIGHTED_IMAGE_MINI_HUD = Image.sprite_cell_masks :controls do |s|
      s.add_representation :normal, rect:[16, 357, 16, 16]
      s.add_representation :gray_mask, rect:[16, 357, 16, 16]
      s.add_representation :disabled, rect:[16, 357, 16, 16]
    end
    
  end
  
end