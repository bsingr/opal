/* 
 * array.js
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

var rb_cArray = cArray;
Array.prototype.$klass = rb_cArray
Array.prototype.$type = T_ARRAY;

RModule.include(rb_cArray, mEnumerable);

rb_cArray.$define_alloc_func(function() {
  return new Array();
});

rb_cArray.$def_s('[]', function() {
  
});

rb_cArray.$def_s('try_convert', function() {
  
});

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(item, i) {
    i || (i = 0);
    var len = this.length;
    if (i < 0) i = len + i;
    for (; i < len; i++)
      if (this[i] === item) return i;
      return -1;
  };
}


rb_define_method(rb_cArray, 'initialize', function(self, _cmd) {
  var len = arguments.length;
  for (var i = 2; i < len; i++) {
    self.push(arguments[i]);
  }
});

rb_define_method(rb_cArray, 'initialize_copy', function(self, _cmd) {
  
});

rb_define_method(rb_cArray, 'to_s', function(self, _cmd) {
  if (self.length == 0) return '[]';
  var str = '[';
  for (var i = 0; i < (self.length - 1); i++) {
    str += (self[i].$('inspect', []) + ', ');
  }
  str += (self[self.length - 1].$('inspect', []) + ']');
  return str ;
});

rb_define_method(rb_cArray, 'inspect', function(self, _cmd) {
  return rb_funcall(self, 'to_s');
});

rb_define_method(rb_cArray, 'to_a', function(self, _cmd) {
  return self;
});

rb_define_method(rb_cArray, 'to_ary', function(self, _cmd) {
  return self;
});

rb_define_method(rb_cArray, '==', function(self, _cmd, ary) {
  if (ary == self) return true;
  if (ary.$type != VN.ARRAY) {
    if (rb_funcall(ary, 'respond_to?', 'to_a')) {
      return false;
    }
  }
  if (self.length != ary.length) return false ;
  return true;
});

rb_define_method(rb_cArray, 'eql?', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'hash', function(self, _cmd) {

});

rb_define_method(rb_cArray, '[]', function(self, _cmd, idx) {
  return self[idx];
});

rb_define_method(rb_cArray, '[]=', function(self, _cmd, idx, value) {
  return self[idx] = value;
});

rb_define_method(rb_cArray, 'at', function(self, _cmd, index) {
  return self[index];
});

rb_define_method(rb_cArray, 'fetch', function(self, _cmd, index, def) {
  return self[index];
});

rb_define_method(rb_cArray, 'first', function(self, _cmd) {
  return self[0];
});

rb_define_method(rb_cArray, 'last', function(self, _cmd) {
  return self[self.length - 1];
});

rb_define_method(rb_cArray, 'concat', function(self, _cmd) {

});

rb_define_method(rb_cArray, '<<', function(self, _cmd, obj) {
  return self.push(obj);
});

rb_define_method(rb_cArray, 'push', function(self, _cmd, obj) {
  return self.push(obj);
});

rb_define_method(rb_cArray, 'pop', function(self, _cmd) {
  return self.pop();
});

rb_define_method(rb_cArray, 'shift', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'unshift', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'insert', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'each', function(self, _cmd, block) {
  for (var i = 0; i < self.length; i++) {
    block(self[i]);
  }
  return self;
});


rb_define_method(rb_cArray, 'each_index', function(self, _cmd) {

});  

rb_define_method(rb_cArray, 'reverse_each', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'length', function(self, _cmd) {
  return self.length;
});

rb_define_method(rb_cArray, 'size', function(self, _cmd) {
  return self.length;
});

rb_define_method(rb_cArray, 'empty?', function(self, _cmd) {
  return (self.length == 0) ? true : false;
});

rb_define_method(rb_cArray, 'find_index', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'rindex', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'index', function(self, _cmd, obj) {
  var idx = self.indexOf(obj);
  return (idx == -1) ? idx : nil;
});

rb_define_method(rb_cArray, 'join', function(self, _cmd, sep) {
  return self.join(sep);
});

rb_define_method(rb_cArray, 'reverse', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'reverse!', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'sort', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'sort!', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'collect', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'collect!', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'map', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'map!', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'select', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'values_at', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'delete', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'delete_at', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'delete_if', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'reject', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'reject!', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'zip', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'trnaspose', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'replace', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'clear', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'fill', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'include?', function(self, _cmd, obj) {
  return (self.indexOf(obj) == -1) ? false : true;
});

rb_define_method(rb_cArray, '<=>', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'slice', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'slice!', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'assoc', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'rassoc', function(self, _cmd) {

});

rb_define_method(rb_cArray, '+', function(self, _cmd) {

});

rb_define_method(rb_cArray, '*', function(self, _cmd) {

});

rb_define_method(rb_cArray, '-', function(self, _cmd) {

});

rb_define_method(rb_cArray, '&', function(self, _cmd) {

});

rb_define_method(rb_cArray, '|', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'uniq', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'uniq!', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'compact', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'compact!', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'flatten', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'flatten!', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'count', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'shuffle', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'shuffle!', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'sample', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'cycle', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'permutation', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'combination', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'product', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'take', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'take_while', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'drop', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'drop_while', function(self, _cmd) {

});
