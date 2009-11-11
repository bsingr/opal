/* 
 * hash.js
 * vienna
 * 
 * Created by Adam Beynon.
 * Copyright 2009 Adam Beynon.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
 var rb_cHash = RClass.define('Hash', rb_cObject) ;

 // RModule.include(cHash, mEnumerable);

rb_cHash.$define_alloc_func(function() {
  return new RHash();
});


rb_define_singleton_method(rb_cHash, "[]", function(self, _cmd) {
  
});

rb_define_singleton_method(rb_cHash, "try_convert", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "initialize", function(self, _cmd) {
  if (arguments.length > 0) {
    self.ifnone = arguments[0] ;
  }  
});

rb_define_method(rb_cHash, "initialize_copy", function(self, _cmd) {
 
});

rb_define_method(rb_cHash, "rehash", function(self, _cmd) {
 
});

rb_define_method(rb_cHash, "to_hash", function(self, _cmd) {
  return self;
});

rb_define_method(rb_cHash, "to_a", function(self, _cmd) {
 
});
  
rb_define_method(rb_cHash, "to_ary", function(self, _cmd) {
 
});

rb_define_method(rb_cHash, "to_s", function(self, _cmd) {
 
});

rb_define_method(rb_cHash, "inspect", function(self, _cmd) {
 
});

rb_define_method(rb_cHash, "==", function(self, _cmd) {
 
});
  
rb_define_method(rb_cHash, "[]", function(self, _cmd, key) {
  if (!self.values.hasOwnProperty(key.toString())) {
    return self.ifnone;
  }
  return self.values[key.toString()];
});

rb_define_method(rb_cHash, "hash", function(self, _cmd) {
 
});

rb_define_method(rb_cHash, "eql?", function(self, _cmd) {
 
});

rb_define_method(rb_cHash, "fetch", function(self, _cmd) {
  
});
  
rb_define_method(rb_cHash, "[]=", function(self, _cmd, key, value) {
  return rb_funcall(self, 'store', key, value);
});

rb_define_method(rb_cHash, "store", function(self, _cmd, key, val) {
  // if we dont have the key, add it to the ordered array so that we can keep
  // the hash ordered.
  if (self.values[key.toString()] === undefined) {
    self.keys.push(key.toString());
  }

  self.values[key.toString()] = val ;
  return val ;
});

rb_define_method(rb_cHash, "default", function(self, _cmd) {
  return self.ifnone;
});

rb_define_method(rb_cHash, "default=", function(self, _cmd, val) {
  return self.ifnone = val;
});

rb_define_method(rb_cHash, "default_proc", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "default_proc=", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "key", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "index", function(self, _cmd) {
  
});
  
rb_define_method(rb_cHash, "size", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "length", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "empty?", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "each_value", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "each_key", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "each_pair", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "each", function(self, _cmd, block) {
  for (var i = 0; i < self.keys.length; i++) {
    block(self.keys[i], self.values[self.keys[i]]);
  }
  return self;
});

rb_define_method(rb_cHash, "keys", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "values", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "values_at", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "shift", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "delete", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "delete_if", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "select", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "reject", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "reject!", function(self, _cmd) {
  
});
  

rb_define_method(rb_cHash, "clear", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "invert", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "update", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "replace", function(self, _cmd) {
  
});
  
rb_define_method(rb_cHash, "merge!", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "merge", function(self, _cmd) {
  
});
  
rb_define_method(rb_cHash, "assoc", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "rassoc", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "include?", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "member?", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "has_key?", function(self, _cmd, key) {
  if (!self.values.hasOwnProperty(key)) {
    return false;
  }
  return true;
});
  
rb_define_method(rb_cHash, "has_value?", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "key?", function(self, _cmd, key) {
  return rb_funcall(self, 'has_key?', key);
});

rb_define_method(rb_cHash, "value?", function(self, _cmd) {
  
});
  
rb_define_method(rb_cHash, "compare_by_identity", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "compare_by_identity?", function(self, _cmd) {
  
});
