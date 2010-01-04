# 
# json_object.rb
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

# A JSONObject is used to sit above a raw JSON oobject in the browser. As it
# inherits from BasicObject, only 6 methods are actually present in the class.
# This allows us to override every method, so that calls like obj.name will
# call method_missing, so we use this as a cheap hack to access the name
# property on the current JSON content. When accessing a JSON property, if
# the result is another Object in js, then a new instance of  JSONObject will
# be returned to wrap it. Arrays are simply mapped back to arrays, Strings to
# strings and numbers to numbers. True/False/nil/null all work as expected.
# The very few "extra" methods defined on this class are for detecting object
# and proeperty types, and are named so that they are unlikely to clash with
# well formatted json names (they usually have a trailing '?').
# 
# call-seq:
# 
#   # assume data = { name: "Adam", address: { number: 10, postcode: "SA32HB" }};
#   a = JSONObject.new(data)
#   puts a.address.postcode
# 
class JSONObject < BasicObject
  
  def self.new(obj)
    # avoid current objj method to call alloc.init. this will be fixed.
    o = alloc
    o.initialize(obj)
    o
  end
  
  def initialize(obj)
    @obj = obj
  end
  
  def has_key?(key)
    `return #{@obj}.hasOwnProperty(#{key});`
  end
  
  # Hash access to elements. This is useful in the rare case when a method
  # of BasicObject/JSONObject clashes with a property
  def [](key)
    
  end
  
  # Preferred way of setting element values. Using o.prop = 10 syntax is
  # more costly, as the name must be regexp'd etc to get to the element
  # name itself.
  def []=(key, value)
    
  end
  
  # called when accessing a property
  def method_missing(id)
    `return #{@obj}[id];`
  end
  
  # this will convert the object into an actual Ruby hash, with keys as the
  # keys etc. These will be strings, not symbols. This calls to_hash recursively
  # on all children if they are objects so that the entire object tree is
  # rubified. If you are using the same JS object over and over, it will be
  # optimal to use a native ruby object instead of relying on this classes'
  # approach
  def to_hash
    { }
  end
end



class Array
  
  # A nice time saver. Use this when accessing JSONObjects contained in an array, 
  # and each obj will be transformed into a JSONObject within the block.
  # 
  # call-seq:
  # 
  #   var js_data = { data: [{ name: "Ben" }, { name: "Tom" }, { name: "Charles" }]}
  #   ...
  #   assume we get json object reference into ruby (URL request etc)
  #   ...
  # 
  #   o = JSONObject.new(js_data)
  #   o.data.each_json do |j|
  #     puts j.name
  #   end
  # 
  #   => "Ben"
  #   => "Tom"
  #   => "Charles"
  # 
  # Note:
  #   Conversion only takes place for JSObject. Instances of Arrays, Strings, Numbers
  #   etc are simply returned. The type of each object can be checked by using its
  #   kind_of? or is_a? method.
  # 
  def each_json
    # This should really be moved to a .j file. Inline javascript is messy
    # FIXME: currently assumes every obj is a object. need to check types.
    `
    var i, k;
    for (i = 0; i < self.length; i++) {
      k = self[i];
      rb_yield(arguments, #{JSONObject.new(k)});
    }
    `
    self
  end
end