# 
# range.rb
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

class Range
  
  def self.new(start, ending, exclusive)
    `if (!#{exclusive}) {
      #{exclusive} = #{false};
    }`
    `return #{self}.R(#{start}, #{ending}, #{exclusive}.r);`
  end
  
  def length
    `return #{self}.__end__ - #{self}.__start__;`
  end
  
  def begin
    `return #{self}.__start__;`
  end
  
  def end
    `return #{self}.__end__;`
  end
  
  def cover?(val)
    include? val
  end
  
  def include?(val)
    `return (#{self}.__start__ <= #{val} && #{val} <= #{self}.__real_end__) ? #{true} : #{false};`
  end
  
  def exclude_end?
    `return #{self}.__exclusive__ ? #{true} : #{false};`
  end
end
