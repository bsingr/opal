# 
# controller_selection_proxy.rb
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
  
  class ControllerSelectionProxy
    
    def initialize(controller)
      @controller = controller
      @values = {}
      @proxies = []
    end
    
    def controller_will_change
      puts "controller_will_change"
    end
    
    def controller_did_change
      puts "controller_did_change"
    end
    
    def get_attribute(attribute)
      attribute = attribute.to_s
      value = @values[attribute]
      return value if value
      
      values = @controller.selected_objects.get_path attribute
      length = values.length
      
      if length == 0
        value = :no_selection
      elsif length == 1
        value = values[0]
      else
        value = :selected_objects_many
      end
      
      @values[attribute] = value
      
      value
      # puts "values: #{values.inspect}"
    end
  end
end
