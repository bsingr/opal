# 
# numeric.rb
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
 
`Number.prototype.$klass = cNumber ;
Number.prototype.$type = VN.NUMBER ;
Number.prototype.$ = RObject.prototype.$;

// VN.include_module(VN.cNumber, VN.mComparable);
RModule.include(cNumber, mComparable);`

class Number
  
  def coerce
    
  end
  
  def +@
    
  end
  
  def -@
    
  end
  
  def <=>
    
  end
  
  def eql?
    
  end
  
  def quo
    
  end
  
  def fdiv
    
  end
  
  def div
    
  end
  
  def divmod
    
  end
  
  def modulo
    
  end
  
  def remainder
    
  end
  
  def abs
    
  end
  
  def magnitude
    
  end
  
  def to_int
    
  end
  
  def real?
    
  end
  
  def integer?
    
  end
  
  def zero?
    
  end
  
  def nonzero?
    
  end
  
  def floor
    
  end
  
  def ceil
    
  end
  
  def round
    
  end
  
  def truncate
    
  end
  
  def step
    
  end
  
  def odd?
    
  end
  
  def even?
    
  end
  
  def upto
    
  end
  
  def downto
    
  end
  
  def times
    
  end
  
  def succ
    
  end
  
  def next
    
  end
  
  def pred
    
  end
  
  def chr
    
  end
  
  def ord
    
  end
  
  def to_i
    
  end
  
  def to_s
    
  end
  
  def +(i)
    `return self + i;`
  end
  
  def -(i)
    `return self - i;`
  end
  
  def *(i)
    `return self * i;`
  end
  # 
  # def /(i)
  #   `return self / i;`
  # end
  
  def %
  
  end
  
  def **
    
  end
  
  def ==(other)
    `return self == other ? true : false;`
  end
  
  def >(other)
    `return self > other;`
  end
  
  def >=(other)
    `return self >= other;`
  end
  
  def <(other)
    `return self < other;`
  end
  
  def <=(other)
    `return self <= other;`
  end
  
  def ~
    
  end
  
  def &(other)
    `return self & other;`
  end
  
  def |(other)
    `return self | other;`
  end
  
  def ^
    
  end
  
  def []
    
  end
  
  def <<(other)
    `return self << other`
  end
  
  def >>
    
  end
  
  def to_f
    
  end
  
  
  
end
