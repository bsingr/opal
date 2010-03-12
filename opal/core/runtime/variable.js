/* 
 * variable.js
 * opal
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


function rb_ivar_set(obj, id, val) {
  obj.iv_tbl[id] = val;
  return val;
};

function rb_ivar_get(obj, id) {
  if (obj.iv_tbl.hasOwnProperty(id)) {
    return obj.iv_tbl[id];
  }
  return nil;
}

function rb_const_set(k, id, val) {
  return rb_mod_av_set(k, id, val, true);
}

function rb_mod_av_set(k, id, val, isconst) {
  return k.iv_tbl[id] = val;
}

function rb_const_set(k, id, val) {
  return k.iv_tbl[id] = val;
}

function rb_const_get(k, id) {
  // console.log(id);
  // console.log(k);
  // console.log("a");
  var v, t = k;
  while (t) {
    // console.log(t.iv_tbl.__classid__);
    // console.log(t);
    if (v = t.iv_tbl[id]) return v;
    t = t.sup;
  }
  // now try parent instead..
  t = k.parent;
  while (t) {
    if (v = t.iv_tbl[id]) return v;
    t = t.parent;
  }
  console.log("raising name error for " + id);
  rb_raise(rb_eNameError, "uninitialized constant " + id + " in " + k.iv_tbl.__classid__);
  return nil;
}

function rb_const_get_full(k, id) {
  var v, t = k;
  while (t) {
    if (v = t.iv_tbl[id]) return v;
    t = t.sup;
  }
  // now try parent instead..
  t = k.parent;
  while (t) {
    if (v = t.iv_tbl[id]) return v;
    t = t.parent;
  }
  console.log("raising name error for " + id);
  throw "NameError: uninitialized constant " + id + " in " + k.name
  return nil;
}

function rb_const_defined(k, id) {
  var v, t = k;
  while (t) {
    if (v = t.iv_tbl[id]) return true;
    t = t.sup;
  }
  return false;
}

function rb_const_defined_full(k, id) {
  var v, t = k;
  while (t) {
    if (v = t.iv_tbl[id]) return true;
    t = t.sup;
  }
  // now try parent instead..
  t = k.parent;
  while (t) {
    if (v = t.iv_tbl[id]) return true;
    t = t.parent;
  }
  return false;
}

function rb_const_defined_at(k, id) {
  return (k.iv_tbl[id]) ? true : false;
}

function rb_const_get_at(k, id) {
  return (k.iv_tbl[id]) ? k.iv_tbl[id] : nil;
}
