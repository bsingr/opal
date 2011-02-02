

if (typeof Opalite == 'undefined')
  Opalite = {};

(function(global, exports) {

// access preprocessor stuff
/*
  Set a local variable __block__ to either Qnil or the block. Here basically we
  check if the block was intended for us, and then set it to Qnil regardless.
*/
/*
  If no block was given, return an enumerator. This automatically calls 
  USES_BLOCK, so manually calling that is not neceessary.
*/




/*
  Yields the block. This assumes the block is stored locally as __block__, as it
  will be set using USES_BLOCK
*/



/*
  Like above, but yield using the given self:
*/



/*
  Evaluates to true or false whether a block was given or not. again, relies on
  a variable named __block__ which is given by USES_BLOCK
*/



/*
  Simply call a method on the receiver. Method MUST exist
*/



/*
 * try calling method that might not exist - supports method_missing
 */



/**
	Ensure that the args given to a js function exactly equals the given count.
*/





/**
	Ensure that the args given to a js function is atleast the given num
*/





/*
  For loops in JS that take the place of while loops in ruby, we need to 
  capture all the break, next and return throws and deal with them appropriately
*/



/*
  Keywords:
    0 (return) -
    1 (return) - 
    2 (break)  - simply return the break value back to the method it was called
                 from.
    3 (next)   - 
*/
// used by ready callback listener
var browser_is_ready = false;
// Document ready listener. Calls the callback when document ready.
var register_ready_callback_listener = function(callback) {
  if (browser_is_ready) return callback();
  (function() {
    // w3c - chrome, safari, ff
    if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', callback, false);
    }
    else {
    // IE (opera?)
    (function() {
      try {
        document.documentElement.doScroll('left');
      } catch (e) {
        setTimeout(arguments.callee, 0);
        return;
      }
      callback();
    })();
    }
  })();
};
// default listener
register_ready_callback_listener(function() {
  browser_is_ready = true;
  console.log("BROWSER IS READY");
});
// listener for script tags. if we have any text/ruby tags then we should run them!
register_ready_callback_listener(function() {
  var tag, tags = document.getElementsByTagName('script');
  for (var i = 0; i < tags.length; i++) {
    tag = tags[i];
    if (tag.type == 'text/ruby') {
      // src property - get via AJAX
      if (tag.src) {
      } else {
        console.log('run content:');
        console.log(tag.innerHTML);
        var result = Opal.compile(tag.innerHTML);
        console.log(result);
        var func = new Function('self', result);
        func(rb_top_self);
      }
    }
  }
});
/**
  Top level Browser module holds all things browser related.
*/
var rb_mBrowser;
/**
  Browser engine/platform and version
*/
var browser_platform = (function() {
  var agent = navigator.userAgent.toLowerCase();
  var version = 1;
  var browser = {
    version: 0,
    safari: /webkit/.test(agent) ? version : 0,
    opera: /opera/.test(agent) ? version : 0,
    msie: /msie/.test(agent) && !(/opera/).test(agent) ? version : 0
  };
  return browser;
})();
/**
  Returns `true` if the current browser is Opera, `false` otherwise.
 
  @return [Boolean]
*/
var browser_opera_p = function() {
  if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
  return browser_platform.opera ? Qtrue : Qfalse;
};
/**
  Returns `true` if the current browser is Safari, `false` otherwise.

  @return [Boolean]
*/
var browser_safari_p = function() {
  if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
  return browser_platform.safari ? Qtrue : Qfalse;
};
/**
  Returns `true` if the current browser is Internet Explorer, `false` 
  otherwise.

  @return [Boolean]
*/
var browser_msie_p = function() {
  if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
  return browser_platform.msie ? Qtrue : Qfalse;
};
/**
  Returns `true` if the current browser is Firefox, `false` otherwise.

  @return [Boolean]
*/
function browser_firefox_p(self, mid) {
  if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
  return browser_platform.firefox ? Qtrue : Qfalse;
}
/**
  Returns true or false to indicate whether this browser is on a touch
  platform or not
*/
function browser_touch_p(self, mid) {
  if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
  return ('createTouch' in document) ? Qtrue : Qfalse;
}
/**
 * Alert the giben string
 *
 * @example
 *
 *    alert "boom"
 */
var browser_alert = function(str) {
  alert(str);
  return Qnil;
};
var Init_Browser = function() {
  rb_mBrowser = rb_define_module('Browser');
  rb_define_singleton_method(rb_mBrowser, 'opera?', browser_opera_p);
  rb_define_singleton_method(rb_mBrowser, 'msie?', browser_msie_p);
  rb_define_method(rb_mKernel, 'alert', browser_alert);
};
// @class Element
//
// Top level Element class
rb_cElement = null;
// Creates a new element of the specified type
//
// @example
//
//    a = Element.new :div
//    # => #<Element :div>
//
// @param [String, Symbol] type the tag name for the Element to have
// @param [Hash] options a set of options to {#set}
// @return [Element] returns the receiver
var element_initialize = function(elem, type, options) {
  type || (type = 'div');
  elem.$element = document.createElement(type.$m["$" + 'to_s'](type));
};
// Returns the tag name of the element as a string, in lower case.
//
// @example HTML
//
//    <div id = "my_div"></div>
//
// @example Ruby
//
//    Document[:my_div].tag
//    # => 'div'
//
// @return [String] tag name
var element_tag = function(elem) {
  return elem.$element.tagName.toLowerCase();
};
// Inspect the element
var element_inspect = function(elem) {
  var description = '#<Element ' + element_tag(elem);
  description += '>';
  return description;
};
var Init_Element = function() {
  rb_cElement = rb_define_class('Element', rb_cObject);
  rb_define_method(rb_cElement, 'initialize', element_initialize);
  rb_define_method(rb_cElement, 'inspect', element_inspect);
};
Init_Browser();
Init_Element();
})(this, Opalite);
