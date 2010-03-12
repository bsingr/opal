// 
//  element.js
//  vienna
//  
//  Created by Adam Beynon on 2010-02-18.
//  Copyright 2010 Adam Beynon. All rights reserved.
// 

var opal_cElement;


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


/**
  Element#class=
*/
function opal_element_class_e(el, id, _, name) {
  console.log("setting classname to " + name);
  el.className = name;
  return el;
};

/**
  Element#id=
*/
function opal_element_id_e(el, id, _, name) {
  el.id = name;
  return el;
};

/*
  valid options to pass to "set" with their relative functions. Some options
  use the #name= syntax (e.g. class, id), while some use #name. To make things
  easier, all possible options simply use the actual functions as listed here.
  If a property is not here, then it is not a valid option
*/
var opal_element_set_options = {
  'class': opal_element_class_e,
  'id': opal_element_id_e,
  'css': opal_element_css,
  'style': opal_element_css,
  'text': opal_element_text_e
};

/*
  Element#set(options)
*/
function opal_element_set(el, id, _, options) {
  if (!options) return el;
  var i, k, v, f;
  for (i = 0; i < options.keys.length; i++) {
    k = options.keys[i];
    v = options.dict[k];
    // use string version
    k = k.klass === rb_cSymbol ? k.ptr : k;
    // silently ignore
    if (f = opal_element_set_options[k]) {
      console.log("need to set " + k + " to " + v);
      f(el, k, nil, v);
    }
  }
  return el;
};

/**
  Element#hide
*/
function opal_element_hide(el, id, _) {
  (el.style || el).display = 'none';
  return el;
};

/**
  Element#show
*/
function opal_element_show(el, id, _) {
  (el.style || el).display = '';
  return el;
};

/**
  Element#visible?
*/
function opal_element_visible_q(el, id, _) {
  return (el.style || el).display != 'none';
};

/**
  Element#toggle
*/
function opal_element_toggle(el, id, _) {
  opal_element_visible_q(el) ? opal_element_hide(el) : opal_element_show(el);
  return el;
};

/**
  Element#remove
*/
function opal_element_remove(el, id, _) {
  el.parentNode.removeChild(el);
  return el;
};

/**
  Element#opacity
*/
function opal_element_opacity(el, id, _) {
  var o = (el.style || el).opacity;
  return o ? parseFloat(o) : 1.0;
};

/**
  Element#opacity=
*/
function opal_element_opacity_e(el, id, _, val) {
  (el.style || el).opacity = (val === 1 || val === '') ? "" : value;
  return el;
};

function Init_Browser_Element() {
  opal_cElement = rb_define_class("Element", rb_cObject);
        
  rb_define_method(opal_cElement, "css", opal_element_css, 0);
  rb_define_method(opal_cElement, "style", opal_element_css, 0);
  
  rb_define_method(opal_cElement, "class=", opal_element_class_e, 1);
  rb_define_method(opal_cElement, "class_name=", opal_element_class_e, 1);
  
  // rb_define_method(opal_cElement, "method_missing", opal_element_m_missing, 1);
  rb_define_method(opal_cElement, "text=", opal_element_text_e, 1);
  rb_define_method(opal_cElement, "text", opal_element_text, 0);
  
  rb_define_method(opal_cElement, "set", opal_element_set, 1);
  
  // newer methods
  
  rb_define_method(opal_cElement, "hide", opal_element_hide, 0);
  rb_define_method(opal_cElement, "show", opal_element_show, 0);
  rb_define_method(opal_cElement, "toggle", opal_element_toggle, 0);
  rb_define_method(opal_cElement, "visible?", opal_element_visible_q, 0);
  
  rb_define_method(opal_cElement, "remove", opal_element_remove, 0);
  
  rb_define_method(opal_cElement, "opacity", opal_element_opacity, 0);
  rb_define_method(opal_cElement, "opacity=", opal_element_opacity_e, 1);
};

