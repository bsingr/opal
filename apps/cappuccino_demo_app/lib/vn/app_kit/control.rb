# 
# control.rb
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

class CPControl < CPView
  
  def to_s
    stringValue
  end

  def to_i
    intValue
  end

  def to_f
    doubleValue
  end
  
  def on_action=(block)
    on_action block
  end
  
  def on_action(&block)
    puts "In on action... my target is:"
    if target
      # already has a target..
    else
      o = Object.new
      o.instance_variable_set("@action_behavior", block)
      self.target = o
      puts o
    end
    # singleton method for action
    def o.perform_action(sender)
      @action_behavior.call
      # puts "Oh :D it works!"
    end
    
    self.action = "perform_action:"
  end
end