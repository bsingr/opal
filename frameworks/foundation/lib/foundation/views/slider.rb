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

require 'foundation/views/control'

module CherryKit
  
  class Slider < Control
    
    register_builder :slider, {}
    
    class_names 'ck-slider'
    
    display_attributes :value, :min, :max
    
    attr_accessor :value, :min, :max
    
    def initialize
      super
      # puts "====================================== setting value to 0"
      @value = 0
      @min = 0
      @max = 100
      # puts @value 
    end
    
    def create_renderer(theme)
      theme.slider self
    end
    
    # slider value for the given location (point)
    # 
    def value_for_location(location)
      # 14/7 should be got from the renderer.. each theme/control size may
      # define a different indent
      
      # our width is less 2x the track indent
      width = bounds.width - 14
      # our location is the track indent less than what it actually is
      x = location.x - 7
      
      (x / width) * 100
    end
    
    def start_tracking?(location)
      self.value = value_for_location location
      self.highlighted = true
    end

    def stop_tracking(location)
      self.value = value_for_location location
      self.highlighted = false
    end

    def continue_tracking?(location)
      # puts "value should be #{value_for_location(location)}"
      self.value = value_for_location location
    end
  end
end
