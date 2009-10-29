# 
# range.rb
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

`
VN.$r = function(start, ending, exclusive) {
  return VN$(cRange, 'new', start, ending, exclusive);
}
`


class Range
  
  def initialize(start, ending, exclusive)
    @start = start
    @ending = ending
  end
  
  def initialize_copy
    
  end
  
  def ==(obj)
    
  end
  
  def ===(obj)
    
  end
  
  def eql?(obj)
    
  end
  
  def hash
    
  end
  
  def each(&block)
    `for (var i = #{@start}; i <= #{@ending}; i++) {
      VN$(block, 'call', i);
    }`
    self
  end
  
  def step
    
  end
  
  def begin
    
  end
  
  def end
    
  end
  
  def first
    
  end
  
  def last
    
  end
  
  def min
    
  end
  
  def max
    
  end
  
  def to_s
    
  end
  
  def inspect
    
  end
  
  def exclude_end?
    
  end
  
  def member?
    
  end
  
  def include?
    
  end
  
  def cover?
    
  end
  
end
