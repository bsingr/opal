// 
//  element.js
//  vienna
//  
//  Created by Adam Beynon on 2010-02-18.
//  Copyright 2010 Adam Beynon. All rights reserved.
// 

var opal_cElement;

/**
  Wraps the native element with ruby goodness (a .klass and .flags property)
*/
function opal_element_wrap(wrap) {
  // do not need to do this twice
  if (wrap.klass) return wrap;
  wrap.hash = opal_yield_hash();
  wrap.klass = opal_cElement;
  wrap.flags = T_OBJECT;
  return wrap;
};

/*
  Element[:my_div]
  Element.find[:my_div]
  Element.find('my_div')
  
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
  // if we get a symbol, we need the string version
  if (str.klass === rb_cSymbol) str = str.ptr;
  
  
  // return el;
  
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
    
  rb_raise(rb_eArgError, "unknown Element#find type");
  
  // return opal_element_wrap(document.getElementById(str));
};

function opal_element_s_body(el) {
  return opal_element_wrap(document.body);
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
  
  if (styles.klass === rb_cHash) {
    // console.log(styles);
    var style = el.style || el;
    for (var i = 0; i < styles.keys.length; i++) {
      var key = styles.keys[i], val = styles.dict[key];
      if (key.klass == rb_cSymbol) key = key.ptr;
      // need to camelcase name : background_color => backgroundColor.
      // console.log("setting " + val + " for " + key);
      el.style[key] = val;
    }
  }
  else {
    // console.log("we are getting individual property");
  }
};

function opal_element_m_missing(el, id, _, sym) {
  var args = Array.prototype.slice.call(arguments, 4);
  var tag_name = sym.ptr;
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
  
  el.appendChild(tag);
  return opal_element_wrap(tag);
};

/**
  Element#has_class?('foo')
    => true or false
*/
function opal_element_has_class_q(el, id, _, name) {
  return (" " + el.className + " ").indexOf(" " + name + " ") > -1;
};

/**
  Element#add_class(class_name)
    => element
*/
function opal_element_add_class(el, id, _, name) {
  if (!opal_element_has_class_q(el, "", nil, name)) {
    el.className = el.className + " " + name;
  }
  return el;
};

/**
  Element#remove_class(class_name)
    => element
*/
function opal_element_remove_class(el, id, _, name) {
  rb_raise(rb_eStandardError, "Element#remove_class not implemented");
};

/**
  Element#toggle_class(class_name)
    => element
*/
function opal_element_toggle_class(el, id, _, name) {
  if (opal_element_has_class_q(el, "", nil, name)) {
    return opal_element_remove_class(el, "", nil, name);
  }
  else {
    return opal_element_add_class(el, "", nil, name);
  }
};

function opal_element_empty(el) {
  while (el.firstChild) { el.removeChild(el.firstChild); }
  return el;
};

/**
  Element#text=(text_content)
  
  Set the inner text content of the element
*/
function opal_element_text_e(el, id, _, text) {
  if (el.textContent !== undefined) {
    el.textContent = text;
  }
  else {
    el.innerText = text;
  }
  return el;
};

function opal_element_add_listener(el, id, _, type) {
  // make sure _ is not nil: throw error if it is? using type name
  var func = function(evt) { 
    // we should really wrap our native event in a rubified event.
    return rb_proc_call(_, "", nil, evt);
  };
  // should we save all these so they can be removed?
  if (el.addEventListener) el.addEventListener(type, func, false);
  else el.attachEvent('on' + type, func);
  return el;
};

function opal_element_on_click(el, id, _) {
  return opal_element_add_listener(el, "", _, 'click');
};

/**
  Element#text
  Element#text('content stuff')
  
  Returns the inner text content of the element.
  
  Can take optional string argument to set the text content, but text= should be
  used instead.
*/
function opal_element_text(el, id, _, text) {
  if (text !== undefined) return opal_element_text_e(el, "", nil, text);
  return (el.textContent !== undefined) ? el.textContent : el.innerText;
};

function opal_element_s_new(el, id, _, type, options) {
  if (type.klass === rb_cSymbol) {
    type = type.ptr;
  } 
  else if (type.klass !== rb_cString) {
    options = type;
    type = "div"
  }
  
  return document.createElement(type);
};

function Init_Browser_Element() {
  opal_cElement = rb_define_class("Element", rb_cObject);
  
  rb_define_singleton_method(opal_cElement, "[]", opal_element_s_find, 1);
  rb_define_singleton_method(opal_cElement, "find", opal_element_s_find, 1);
  rb_define_singleton_method(opal_cElement, "body", opal_element_s_body, 1);
  rb_define_singleton_method(opal_cElement, "new", opal_element_s_new, -1);
  
  rb_define_method(opal_cElement, "add_listener", opal_element_add_listener, 1);
  
  rb_define_method(opal_cElement, "on_click", opal_element_on_click, 0);
  rb_define_method(opal_cElement, "empty", opal_element_empty, 0);
  
  rb_define_method(opal_cElement, "css", opal_element_css, 0);
  rb_define_method(opal_cElement, "style", opal_element_css, 0);
  
  rb_define_method(opal_cElement, "has_class?", opal_element_has_class_q, 1)
  
  rb_define_method(opal_cElement, "method_missing", opal_element_m_missing, 1);
  rb_define_method(opal_cElement, "text=", opal_element_text_e, 1);
  rb_define_method(opal_cElement, "text", opal_element_text, 0);
};

