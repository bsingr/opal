// 
//  net.js
//  vienna
//  
//  Created by Adam Beynon on 2010-03-05.
//  Copyright 2010 Adam Beynon. All rights reserved.
// 

var rb_mNet, rb_cNetHTTP;

/**
  Return an instance of a native XMLHttpRequest. It is not setup
*/
function opal_http_request_new() {
  try {
    return new XMLHttpRequest();
  } catch (e) {
    try { 
      return new ActiveXObject('MSXML2.XMLHTTP');
    } catch (e) {
      return new ActiveXObject('Microsoft.XMLHTTP');
    }    
  }
};

/**
  Net::HTTP#initialize(address, port=ni)
  
  Port maybe silly. We can only access ports according to the browser policy..
  possibly accept JSONP requests, which might work cross port (they will.)
*/
function rb_cNetHTTP_initialize(http, id, _, address, port) {
  http._address = address;
  http._port = port || 80;
  http._started = false;
  http._async = true;
};

/**
  Net::HTTP#inspect()
*/
function rb_cNetHTTP_inspect(h, id, _) {
  return 
    "#<Net::HTTP " + h._address + ":" + h._port + " open=" + h._started + ">";
};

/**
  Net::HTTP#started?
*/
function rb_cNetHTTP_started_q(http, id, _) {
  return http._started;
};

/**
  Net::HTTP#start
  
  Always asynchronous unless manually forced into synchronous mode
*/
function rb_cNetHTTP_start(http, id, _) {
  if (http._started) {
    rb_raise(/* IOError */ rb_eArgError, "HTTP session already opened");
  }
  if (_ !== nil) {
    http._do_block = _;
    rb_cNetHTTP_do_start(http, "do_start", nil);
  }
  else {
    // no block given... assume synchronous?!?!
    rb_raise(rb_eArgError, "no block given to Net::HTTP#start");
  }
  return http;
};

/**
  Net::HTTP#do_start
*/
function rb_cNetHTTP_do_start(http, id, _) {
  http._started = true;
  return rb_cNetHTTP_connect(http, "connect", nil);
};

/**
  Net:HTTP#connect
*/
function rb_cNetHTTP_connect(http, id, _) {
  // for now pretend we have done it, and got a response.
  var r = http._request = opal_http_request_new();
  r.open("GET", "http://www.google.com", true);
  r.onreadystatechange = function() {
    if (r.readyState == 4) {
      http._body = r.responseText
      rb_cNetHTTP_finish(http, "finish", nil);
    }
  };
  r.send(null);
  return http;
};

/**
  Net::HTTP#finish
  
  Place to override. This is called when the connection finished loading.
  Default behaviour is to yield the block given at #start with self as the
  receiver. Also called on error.
*/
function rb_cNetHTTP_finish(http, id, _) {
  if (!http._started) {
    rb_raise(/* IOError */ rb_eArgError, "HTTP session not yet started");
  }
  return vm_yield(http._do_block, [http]);
};

/**
  Net::HTTP#body
*/
function rb_cNetHTTP_body(http, id, _) {
  return http._body;
};

function Init_Net() {
  rb_mNet = rb_define_module("Net");
  rb_cNetHTTP = rb_define_class_under(rb_mNet, "HTTP", rb_cObject);
  
  rb_define_method(rb_cNetHTTP, "initialize", rb_cNetHTTP_initialize, -1);
  rb_define_method(rb_cNetHTTP, "inspect", rb_cNetHTTP_inspect, 0);
  rb_define_method(rb_cNetHTTP, "started?", rb_cNetHTTP_started_q, 0);
  rb_define_method(rb_cNetHTTP, "start", rb_cNetHTTP_start, 0);
  rb_define_method(rb_cNetHTTP, "body", rb_cNetHTTP_body, 0);
};



