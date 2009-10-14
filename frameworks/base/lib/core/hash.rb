# 
# hash.rb
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

`var RHash = function() {
  this.$klass = cHash ;
  this.$type = VN.HASH ;
  this.$keys = [] ;
  this.$values = { } ;
  this.$ifnone = nil ;
  return this;
};

RHash.prototype.$ivar_set = RObject.prototype.$ivar_set;
RHash.prototype.$ivar_get = RObject.prototype.$ivar_get;
RHash.prototype.$call = RObject.prototype.$call;
RHash.prototype.$define_singleton_method = RObject.prototype.$define_singleton_method;
RHash.prototype.$make_metaclass = RObject.prototype.$make_metaclass;

VN.$h = function() {
  var hash = new RHash();
  console.log(hash);
  for (var i = 0; i < arguments.length; i++) {
    VN$(hash, '[]=', arguments[i], arguments[i + 1]);
    i++;
  }
  return hash;
};

var cHash = RClass.define('Hash', cObject) ;

RModule.include(cHash, mEnumerable);

cHash.$define_alloc_func(function() {
  return new RHash();
}); `
 
class Hash
  
  def self.[]
    
  end
  
  def self.try_convert
    
  end
  
  # for now, just set the arg, if exists, as the ifnone for the hash
  def initialize
    `if (arguments.length > 0) {
      self.$ifnone = arguments[0] ;
    } `  
  end
  
  def initialize_copy
    
  end
  
  def rehash
    
  end
  
  def to_hash
    self
  end
  
  def to_a
    `var ary = [];
    for (var i = 0; i < self.$keys.length; i++) {
      ary.push([self.$keys[i], self.$values[self.$keys[i]]]);
    }
    return ary; `
  end
  
  def to_s
    `if (self.$keys.length == 0) return '{...}';
  
    var str = '{' + self.$keys[0].$call('inspect', []) + '=>' + self.$values[self.$keys[0]].$call('inspect', []);
    for (var i = 1; i < self.$keys.length; i++) {
      str += (', ' + self.$keys[i].$call('inspect', []) + '=>' + self.$values[self.$keys[i]].$call('inspect', []))
    }
    str += '}';
    return str;`
  end
  
  def inspect
    to_s
  end
  
  def ==(obj)
    
  end
  
  def [](key)
    `if (!self.$values.hasOwnProperty(key)) {
      return self.$call('default', [key]);
    }
    return self.$values[key] ;`
  end
  
  def hash
    
  end
  
  def eql?
  
  end
  
  def fetch
    
  end
  
  def []=(key, val)
    puts "setting #{val} for #{key}"
    store key, val
  end
  
  def store key, val
    # if we dont have the key, add it to the ordered array so that we can keep
    # the hash ordered.
    `if (self.$values[key] === undefined) {
      self.$keys.push(key);
    }
  
    self.$values[key] = val ;
    return val ;`
  end
  
  def default
    `return self.$ifnone`
  end
  
  def default=(def_obj)
    `self.$ifnone = ifnone;
    return ifnone;`
  end
  
  def default_proc
    
  end
  
  def default_proc=(proc)
    
  end
  
  def key
    
  end
  
  def index
    
  end
  
  def size
    
  end
  
  def length
    size
  end
  
  def empty?
    
  end
  
  def each_value
    
  end
  
  def each_key
    
  end
  
  def each_pair
    
  end
  
  def each
    
  end
  
  def keys
    
  end
  
  def values
    
  end
  
  def values_at
    
  end
  
  def shift
    
  end
  
  def delete
    
  end
  
  def delete_if
    
  end
  
  def select
    
  end
  
  def reject
    
  end
  
  def reject!
    
  end
  
  def clear
    
  end
  
  def invert
    
  end
  
  def update
    
  end
  
  def replace
    
  end
  
  def merge!
  
  end
  
  def merge
    
  end
  
  def assoc
    
  end
  
  def rassoc
    
  end
  
  def flatten
    
  end
  
  def include?(obj)
    
  end
  
  def member?(obj)
    include? obj
  end
  
  def has_key?(key)
    
  end
  
  def has_value?(val)
    
  end
  
  def key?(key)
    has_key? key
  end
  
  def value?(val)
    has_value? val
  end
  
  def compare_by_identity
    
  end
  
  def compare_by_identity?
    
  end
  
end
