/* 
 * variable.js
 * cappruby
 * 
 * Created by Adam Beynon.
 * Copyright 2010 Adam Beynon.
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

rb_ivar_set = function (obj, id, val) {
  return obj[id] = val;
};

rb_ivar_get = function (obj, id) {
  return obj[id];
};

rb_const_set = function (klass, id, val) {
  klass[id] = val;
};

rb_const_defined = function (klass, id) {
  while (klass) {
    if (klass[id] !== undefined) return true;
    klass = klass.super_class;
  }
  // try window scope..
  if (window[id] !== undefined) return true;
  return false;
};

rb_const_get = function (k, id) {
  var klass = k;
  while (klass) {
    if (klass[id] !== undefined) return klass[id];
    klass = klass.super_class;
  }
  // try parent
  if (k.rb_parent && k.rb_parent[id]) {
    return k.rb_parent[id];
  }
  // try window scope..
  if (window[id] !== undefined) {
    // if we find it, pop it into the rb_cObject scope
    rb_const_set(rb_cObject, id, window[id]);
    return window[id];
  }
  console.log(k);
  throw "cannot find constant " + id;
};
