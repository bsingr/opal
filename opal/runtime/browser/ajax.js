/* 
 * ajax.js
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

// Ajax class
var opal_cAjax;

// JSONP prefix call names
var opal_jsonp_prefix = "opal_jsonp_";
// JSONP prefix counter
var opal_jsonp_counter = 0;

// valid data_types for ajax
var opal_ajax_k_data_types = ['xml', 'html', 'script', 'json', 'jsonp', 'text'];

/*
  main entry point for any ajax request. get, post etc all set custom options 
  then pass control to this function
*/
function opal_ajax_request(ajax, url, options) {
  var _ = opal_block; opal_block = nil;
  var data_type;
  if (rb_hash_has_key(options, ID2SYM('data_type'))) {
    data_type = rb_hash_delete(options, ID2SYM('data_type'));
    if (opal_ajax_k_data_types.indexOf(data_type) == -1) {
      throw data_type + " is a bad data type for Ajax#request"
    }
  }
  else {
    // no data type, so we need to work it out ourselves
  }
    
  switch (data_type) {
    case 'jsonp':
      var callback = opal_jsonp_prefix + (opal_jsonp_counter++);
      url += "?callback=" + callback;
      window[callback] = function(r) {
        if (_ !== nil) {
          // console.log("need to yield result");
          vm_yield(_, [opal_json_2_ruby_json(r)]);
        }
        // console.log("got response");
        // console.log(opal_json_2_ruby_json(r));
        // clean up
        
        // IE throws error on delete :(
        // delete window[callback];
      };
      
      var script = document.createElement("script");
      script.setAttribute("src", url);
      script.setAttribute("type", "text/javascript");
      document.body.appendChild(script);
      break;
    default:
      throw "unimplemented datatype for ajax#request"
  }
};

/**
  Ajax#get(options, &block)
*/
function opal_ajax_s_get(ajax, url, options) {
  // console.log("Doing an ajax get");
  return opal_ajax_request(ajax, url, options);
};

/**
  Initialize Ajax class
*/
function Init_Ajax() {
  opal_cAjax = rb_define_class("Ajax", rb_cObject);
  
  rb_define_singleton_method(opal_cAjax, "get", opal_ajax_s_get, 1);
};
