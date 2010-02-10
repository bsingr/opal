/* 
 * method.js
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

/**
  cappruby method. Similar to objj_method, but takes extra "ruby specific" bits
  and pieces.
*/
function cappruby_method_t(name, imp, types) {
  this.name = name;
  this.method_imp = imp;
  this.types = types;

  // this is set to true if the method is a cappruby method
  this.capprubymethod = true;
  // arity
  this.arity = 0;
};

/**
  global functions. Some methods in ruby can be defined as "global functions".
  These all begin with uppercase lettters, and look like constants. All global
  functions are stored in this table. As an exception for objj, searching for 
  global functions will first search this table, and then, search the global
  namespace. This will allow CoreGraphics, CGRect, CPApplicationMain etc all to
  become available to ruby. Note, with global functions, no "self" property is 
  used. This allows functions from objj to be seemesly used.
*/
rb_global_functions_table = { };

function rb_global_functions_search(id) {
  if (rb_global_functions_table[id]) {
    return rb_global_functions_table[id];
  }
  // if found in window/global, ensure it is a function.
  else if (window[id] && typeof window[id] === 'function') {
    return window[id];
  }
  // not found..
  return nil;
};
 
/**
 Search for the method in klass. Additons to objj search are that it searches
 modules as well, which are attatched to classes via rb_included_modules.
*/
function rb_search_method(klass, id) {
  // console.log("== " + id);
 var m = klass.method_dtable[id];

 if (!m) {
   // this whole loop is to look for included moduels. method_dtable takes care
   // of all inherited methods. Also, by definitoons, look at methods on class
   // before included methods...
   while (klass) {
     if (klass.rb_included_modules) {
       for (var i = 0; i < klass.rb_included_modules.length; i++) {
         // console.log(klass.rb_included_modules[i].name);
         if (m = klass.rb_included_modules[i].method_dtable[id]) {
           // console.log("found");
           break;
         }
       }
       if (m) break;
     }
     klass = klass.super_class;
   }
   // if we found it
   if (m) return m.method_imp;
   return nil;
 }
 // if found straight away..
 return m.method_imp;
};

/**
  If we dont have a .isa property, find out the type of class. We can, for 
  instance, guess its a rect/point/size etc, and add a .isa property to it for
  the future. If all else fails, we assume it to be a regular JSON object. In
  this case, we must return the WrapperJSON class. WrapperJSON does not add a
  .isa property, as this could muck up json properties of the object (e.g. a
  property that shouldnt really exist), so the class is a Wrapper class that can
  interact with any nominal object. CPRect, CPPoint and CPSize .isa properties
  will be added, as they wont affect the nature of these structs.
*/
function rb_find_class_for_obj(obj) {
  if (obj.hasOwnProperty('size') && obj.hasOwnProperty('origin')) {
    obj.isa = cr_cRect;
    return cr_cRect;
  }
  else if (obj.hasOwnProperty('width') && obj.hasOwnProperty('height')) {
    obj.isa = cr_cSize;
    return cr_cSize;
  }
  else if (obj.hasOwnProperty('x') && obj.hasOwnProperty('y')) {
    obj.isa = cr_cPoint;
    return cr_cPoint;
  }
  console.log(obj);
  throw "trying to find class for obj - must be JSON, so use JSONWrapper"
};
