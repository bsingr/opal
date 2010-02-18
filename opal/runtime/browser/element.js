// 
//  element.js
//  vienna
//  
//  Created by Adam Beynon on 2010-02-18.
//  Copyright 2010 Adam Beynon. All rights reserved.
// 

var opal_cElement;

function opal_element_wrap(wrap) {
  var o = new RObject();
  o.klass = opal_cElement;
  FL_SET(o, T_OBJECT);
  o.native = wrap;
  return o;
};


function opal_element_s_find(cls, str) {
  var el;
  // First case: empty string, nil, or nothing is passed: return el as it is.
  if (!str || str === nil) return el;
  
  // Second case: a symbol is passed to the method. If :body or :document, then
  // return these relevant items, if not, then simply return doc.getElementById
  // for the symbol string value
  if (str.klass === rb_cSymbol) {
    str = str.ptr;
    
    if (str == "body") {
      el = opal_element_wrap(document.body)
    }
    else if (str == "document") {
      el = opal_oDocument;
    }
    else {
      var native = document.getElementById(str);
      if (native) el = opal_element_wrap(native);
    }
    return el;
  }
  
  throw "unknown Element#find type"
  
  // return opal_element_wrap(document.getElementById(str));
};

function opal_element_s_body(el) {
  return opal_element_wrap(document.body);
};

function opal_element_on_click(el) {
  var _ = opal_block; opal_block = nil;
  if (_ === nil) throw "Element#on_click no block given."
  
  var func = function(evt) { return _(evt); };
  var native = el.native;
  
  if (native.addEventListener) {
    native.addEventListener('click', func, false);
  }
  else {
    native.attachEvent('onclick', func);
  }
};

/**
  Element#css(styles)
  
  Usage:
    // lookup current background color
    element.css :background_color
    => "blue"
    
    // Set given properties for element. Returns self.
    element.css :background_color => "green"
    => element
*/
function opal_element_css(el, styles) {
  // return self when no style
  if (!styles) return el;
  
  var native = el.native;
  
  if (styles.klass === rb_cHash) {
    var style = native.style || native;
    for (var i = 0; i < styles.keys.length; i++) {
      var key = styles.keys[i], val = styles.dict[key];
      if (key.klass == rb_cSymbol) key = key.ptr;
      // need to camelcase name : background_color => backgroundColor.
      console.log("setting " + val + " for " + key);
    }
  }
  else {
    console.log("we are getting individual property");
  }
};

/*
  Element#has_class?('foo')
*/
function opal_element_has_class_q(elm, name) {
  
};

function opal_element_empty(el) {
  var native = el.native;
  while (native.firstChild) { native.removeChild(native.firstChild); }
  return el;
};

function Init_Browser_Element() {
  opal_cElement = rb_define_class("Element", rb_cObject);
  
  rb_define_singleton_method(opal_cElement, "[]", opal_element_s_find, 1);
  rb_define_singleton_method(opal_cElement, "find", opal_element_s_find, 1);
  rb_define_singleton_method(opal_cElement, "body", opal_element_s_body, 1);
  
  rb_define_method(opal_cElement, "on_click", opal_element_on_click, 0);
  rb_define_method(opal_cElement, "empty", opal_element_empty, 0);
  
  rb_define_method(opal_cElement, "css", opal_element_css, 0);
  rb_define_method(opal_cElement, "style", opal_element_css, 0);
  
  rb_define_method(opal_cElement, "has_class?", opal_element_has_class_q, 1);
};
