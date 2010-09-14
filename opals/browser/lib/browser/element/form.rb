# 
# form.rb
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


class Element
  # @group Dealing with Forms and Input Elements
  
  # Disables the receiver. The status of this property can be checked with
  # either {#enabled?} or {#disabled?}.
  # 
  # @return [Element] returns self
  def disable
    `#{self}.__element__.disabled = true;`
    self
  end
  
  # Enables the receiver. The status of this property can be checked with
  # either {#enabled?} or {#disabled?}.
  # 
  # @return [Element] returns self
  def enable
    `#{self}.__element__.disabled = false;`
    self
  end
  
  # Enables or disables the receiver as appropriate. This is a generic method
  # to achieve the functionality of {#disable} and {#enable}.
  # 
  # @return [Element] returns self
  def enabled=(flag)
    flag ? enable : disable
  end
  
  # Returns `true` if the receiver is enabled, `false` otherwise.
  # 
  # @return [Boolean]
  def enabled?
    `return #{self}.__element__.disabled ? #{false} : #{true};`
  end
  
  # Returns `true` if the receiver is disabled, `false` otherwise.
  # 
  # @return [Boolean]
  def disabled?
    `return #{self}.__element__.disabled ? #{true} : #{false};`
  end
  
  # Gives the receiver keyboard focus, and then returns the receiver.
  # 
  # @return [Element] returns receiver
  def focus
    `#{self}.__element__.focus();`
    self
  end
  
  # Selects all the text in the receiver, and then returns `self`.
  # 
  # @return [Element] returns receiver
  def select
    `#{self}.__element__.select();`
    self
  end
  
  # @endgroup
end
