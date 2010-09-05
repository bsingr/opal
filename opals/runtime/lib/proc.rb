# 
# proc.rb
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

class Proc
  
  def to_proc
    self
  end
  
  def call
    `if (#{self}.__lambda__) {
      try {
        return #{self}.apply(#{self}.__self__, []);
      }
      catch (e) {
        // first try and catch a break (from the lambda proc)
        if (e.__keyword__ == 'break') {
          //console.log("break!");
          return e.opal_value;
        }
        
        // look for next statements
        if (e.__keyword__ == 'next') {
          return e.opal_value;
        }
        
        // next try and catch return error statement (simply return it)
        if (e.__keyword__ == 'return') {
          return e.opal_value;
        }
        
        // redo - simply recall block?
        if (e.__keyword__ == 'redo') {
          return arguments.callee.apply(#{self});
        }
        
        // worst case, rethrow error
        throw e;
      }
    }
    else {
      //throw "cannot .call for non lambda block.. yet"
      return #{self}.apply(#{self}.__self__);
    }`
  end
end
