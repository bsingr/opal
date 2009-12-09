# 
# object.rb
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

Vienna::Mappings.map :object => VN::Object do
  
  def self.alloc_with_options(options, &block)
    o = self.alloc
    opt = {}
    opt.merge(map_defaults)
    opt.merge(options)
    o.init_with_options opt
    # For all remaining options..
    opt.each do |key, value|
      k = key.to_s
      if @map_constants[key]
        puts "#{key.to_s} is a constant"
        # if we have mapped the constant, use the "proper" Cappuccino value
      else
        # if not, just call the method
        # Fixme: swap this to ruby.
        `rb_funcall(o, 'set' + k.charAt(0).toUpperCase() + k.substr(1) + ':', #{value});`
      end
    end
    # finally, if we were given a block, call it
    if block
      # puts "uielding #{mname}"
      yield o
      # puts o
      # yield o
    end
    # return new instance
    o
  end
  
  def init_with_options(options)
    # by default, do nothing. This is the typical method to override. For example,
    # CPWindow will get the frame from the options, and call initWithContentRect:
    # styleMask: etc.
  end
  
  def self.defaults(defaults)
    @map_defaults = defaults
  end
  
  def self.map_defaults
    @map_defaults || {}
  end
  
  def self.map_constants
    @map_constants
  end
  
  @map_constants = {}
  
  def self.constant(id, hash)
    @map_constants[id] = hash
  end
end
