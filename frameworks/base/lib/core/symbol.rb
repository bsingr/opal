# 
# symbol.rb
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

# `
# rb_include_module(rb_cSymbol, rb_mComparable);
# rb_undef_alloc_func(rb_cSymbol);
# rb_undef_method(rb_cSymbol.$klass, 'new');
# 
# `

class Symbol
  
  def Symbol.all_symbols
    # return array of all symbols defined
  end
  
  def ==(obj)
    false
  end
  
  def inspect
    ""
  end
  
  def to_s
    ""
  end
  
  def id2name
    ""
  end
  
  def intern
    self
  end
  
  def to_sym
    self
  end
  
  def to_proc
    nil
  end
  
  def succ
    
  end
  
  def next
    succ
  end
  
  
  
  def <=>(obj)
    
  end
  
  def casecmp(obj)
    
  end
  
  def =~(match)
    
  end
  
  
  
  def [](index)
    
  end
  
  def slice
    
  end
  
  def length
    
  end
  
  def size
    
  end
  
  def empty?
    
  end
  
  def match
    
  end
  
  
  
  def upcase
    
  end
  
  def downcase
    
  end
  
  def capitalize
    
  end
  
  def swapcase
    
  end
end
