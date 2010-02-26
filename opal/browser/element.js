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

/*
  Element[:my_div]
  Element.find[:my_div]
  
  Search the dom for the element with the given name, identifier etc.
  
  If a block is given, then it is instance eval'd so that self within the block
  becomes the found element. If no block is given, then the element is simply
  returned.
  
  Usage:
    
    Element[:my_div] do
      # add a div with the title "My Info" as well as the class properties
      div "My Info", :class => "my_title_div"
    end
    
    a = Element.find(:my_div)
    a.div "My Info", :class => "my_title_div"
*/
function opal_element_s_find(cls, id, _, str) {
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
      // console.log("trying " + str);
      var native = document.getElementById(str);
      // console.log(native);
      if (native) el = opal_element_wrap(native);
    }
  }
  else if (str.klass === rb_cString) {
    var native = document.getElementById(str);
    if (native) el = opal_element_wrap(native);
  }
  
  if (el) {
    // we found it..
    if (_ !== nil) {
      // console.log("instance eval element..");
      _.call(_, el);
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
  
  var func = function(evt) { return vm_yield(_, []); };
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
function opal_element_css(el, id, _, styles) {
  // return self when no style
  if (!styles) return el;
  
  var native = el.native;
  
  if (styles.klass === rb_cHash) {
    // console.log(styles);
    var style = native.style || native;
    for (var i = 0; i < styles.keys.length; i++) {
      var key = styles.keys[i], val = styles.dict[key];
      if (key.klass == rb_cSymbol) key = key.ptr;
      // need to camelcase name : background_color => backgroundColor.
      // console.log("setting " + val + " for " + key);
      native.style[key] = val;
    }
  }
  else {
    // console.log("we are getting individual property");
  }
};

function opal_element_m_missing(el, id, _, sym) {
  var args = Array.prototype.slice.call(arguments, 4);
  var tag_name = sym.ptr;
  var native = el.native;
  var tag = document.createElement(tag_name);
  for (var i = 0; i < args.length; i++) {
    var cur = args[i];
    if (cur === null || cur == undefined) continue;
    if (cur.klass == rb_cString) {
      tag.appendChild(document.createTextNode(cur));
    }
    else if (cur.klass == rb_cHash) {
      if (rb_hash_has_key(cur, "", nil, ID2SYM('class'))) {
        tag.className = rb_hash_aref(cur, "", nil, ID2SYM('class'));
      }
    }
    else {
      throw "bad param type for Element#method_missing (builder)"
    }
  }
  
  native.appendChild(tag);
  return opal_element_wrap(tag);
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
  
  rb_define_method(opal_cElement, "has_class?", opal_element_has_class_q, 1)
  
  rb_define_method(opal_cElement, "method_missing", opal_element_m_missing, 1);
};
