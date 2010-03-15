// 
//  error.js
//  vienna
//  
//  Created by Adam Beynon on 2010-02-23.
//  Copyright 2010 Adam Beynon. All rights reserved.
// 

var rb_eException, rb_eSystemExit, rb_eFatal, rb_eSignal, rb_eInterrupt, rb_eStandardError, rb_eTypeError, rb_eArgError, rb_eIndexError, rb_eKeyError, rb_eRangeError, rb_eScriptError, rb_eSyntaxError, rb_eLoadError, rb_eNotImpError, rb_eNameError, rb_eNoMethodError, rb_eRuntimeError;

function rb_exc_initialize(exc, id, _) {
  if (arguments[3] && arguments[3].klass == rb_cString) {
    exc.iv_tbl.message = arguments[3];
  }
  else {
    exc.iv_tbl.message = exc.klass.iv_tbl.__classid__;
  }
  
  exc.toString = function() { 
    return exc.klass.iv_tbl.__classid__ + ": " + exc.iv_tbl.message;
  };
};

function rb_exc_inspect(exc) {
  return "#<" + exc.klass.iv_tbl.__classid__ + ": " + exc.iv_tbl.message + ">";
};

function rb_exc_to_s(exc) {
  return rb_exc_message(exc);
};

function rb_exc_message(exc) {
  // console.log("into message");
  // console.log(exc.toString());
  // console.log("pfft");
  var m;
  if (!exc.iv_tbl.hasOwnProperty('message')) {
    // throw exc.location
    m = "NativeError: " + exc.message;
  }
  else {
    m = exc.iv_tbl.message;
  }
  exc.iv_tbl = {message: m};
  // console.log(exc.klass);
  // throw exc;
  return m;
};

// Generically raise an exception
function rb_raise(exc, message) {
  var e = rb_obj_alloc(exc);
  rb_exc_initialize(e, "", nil, message);
  return rb_exc_raise(e);
};

// Generic jump raise
function rb_jump_raise(exc, type, message, args) {
  var e = rb_obj_alloc(exc);
  rb_exc_initialize(e, "", nil, message);
  e.iv_tbl.args = args;
  e.iv_tbl.type = type;
  return rb_exc_raise(e);
};

function rb_exc_raise(exc) {
  throw exc
};

function Init_Exception() {
  rb_eException = rb_define_class("Exception", rb_cObject);
  
  Error.prototype.klass = rb_eException;
  Error.prototype.iv_tbl = { };
  // Error.prototype.toString = function() { return "a" + ": " + this.message; };

  // TypeError.prototype.klass = rb_eException;
  // TypeError.prototype.iv_tbl = { };
  
  rb_define_singleton_method(rb_eException, "exception", rb_class_new_instance, -1);
  
  rb_define_method(rb_eException, "initialize", rb_exc_initialize, -1);
  rb_define_method(rb_eException, "to_s", rb_exc_to_s, 0);
  rb_define_method(rb_eException, "message", rb_exc_message, 0);
  rb_define_method(rb_eException, "inspect", rb_exc_inspect, 0);

  rb_eSystemExit = rb_define_class("SystemExit", rb_eException);

  rb_eFatal = rb_define_class("fatal", rb_eException);
  rb_eSignal = rb_define_class("SignalException", rb_eException);
  rb_eInterrupt = rb_define_class("Interrupt", rb_eSignal);

  rb_eStandardError = rb_define_class("StandardError", rb_eException);
  rb_eTypeError = rb_define_class("TypeError", rb_eStandardError);
  rb_eArgError = rb_define_class("ArgumentError", rb_eStandardError);
  rb_eIndexError = rb_define_class("IndexError", rb_eStandardError);
  rb_eKeyError = rb_define_class("KeyError", rb_eIndexError);
  rb_eRangeError = rb_define_class("RangeError", rb_eStandardError);

  rb_eScriptError = rb_define_class("ScriptError", rb_eException);
  rb_eSyntaxError = rb_define_class("SyntaxError", rb_eScriptError);
  rb_eLoadError = rb_define_class("LoadError", rb_eScriptError);
  rb_eNotImpError = rb_define_class("NotImplementedError", rb_eScriptError);

  rb_eNameError = rb_define_class("NameError", rb_eStandardError);

  rb_eNoMethodError = rb_define_class("NoMethodError", rb_eNameError);

  rb_eRuntimeError = rb_define_class("RuntimeError", rb_eStandardError);
  
};
