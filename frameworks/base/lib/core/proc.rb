# 
# proc.rb
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
Function.prototype.$klass = cProc
Function.prototype.$type = VN.PROC;
`

class Proc
  
  def self.new
  
  end
  
  def call
    # puts "calling this..."
    return `self.apply(self, [arguments[2]]);`
  end
  
  def []
    
  end
  
  def ===
    
  end
  
  def yield
    
  end
  
  def to_proc
    
  end
  
  def arity
    
  end
  
  def clone
    
  end
  
  def dup
    
  end
  
  def ==
    
  end
  
  def eql?
    
  end
  
  def hash
    
  end
  
  def to_s
    
  end
  
  def lambda?
    
  end
  
  def binding
    
  end
  
  def curry
    
  end
  
  def source_location
    
  end
  
end
