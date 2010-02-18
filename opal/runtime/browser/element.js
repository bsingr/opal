// 
//  element.js
//  vienna
//  
//  Created by Adam Beynon on 2010-02-18.
//  Copyright 2010 Adam Beynon. All rights reserved.
// 

/*
  Element class
  =============
  
  This class represents a DOM element, or elements. Although instances can be
  treated as if they were individual elements, groups of elements can also be
  references. For example, searching which yields multiple results will give an
  Element instance representing all results. Any actions taken on that Element
  class will infact effect all elements stored. Native elements are stored in
  an array, which is essentially .each()'d each time an action/method call is
  dealt with.
*/
var opal_cElement;

/*
  Return an Element instance which wraps the given native element
*/
function opal_element_wrap(native_element) {
  var o = new RObject();
  o.klass = opal_cElement;
  FL_SET(o, T_OBJECT);
  o.iv_tbl.native = native_element;
  return o;
};

function opal_element_s_find(cls, str) {
  console.log("need to find: " + str);
  return opal_element_wrap(document.getElementById(str));
};

function opal_element_s_body(el) {
  return opal_element_wrap(document.body);
};

function opal_element_on_click(el) {
  var _ = opal_block; opal_block = nil;
  if (_ === nil) throw "Element#on_click no block given."
  
  var func = function(evt) { return _(evt); };
  var native = el.iv_tbl.native;
  
  if (native.addEventListener) {
    native.addEventListener('click', func, false);
  }
  else {
    native.attachEvent('onclick', func);
  }
};

/*
  Element#has_class?('foo')
*/
function opal_element_has_class_q(elm, name) {
  
};

function opal_element_empty(el) {
  var native = el.iv_tbl.native;
  while (native.firstChild) { native.removeChild(native.firstChild); }
};

function Init_Browser_Element() {
  opal_cElement = rb_define_class("Element", rb_cObject);
  
  rb_define_singleton_method(opal_cElement, "[]", opal_element_s_find, 1);
  rb_define_singleton_method(opal_cElement, "find", opal_element_s_find, 1);
  rb_define_singleton_method(opal_cElement, "body", opal_element_s_body, 1);
  
  rb_define_method(opal_cElement, "on_click", opal_element_on_click, 0);
  rb_define_method(opal_cElement, "empty", opal_element_empty, 0);
  
  rb_define_method(opal_cElement, "has_class?", opal_element_has_class_q, 1);
};
