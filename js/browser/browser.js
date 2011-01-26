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
  ARG_COUNT(0)
  
  return browser_platform.opera ? Qtrue : Qfalse;
};

/**
  Returns `true` if the current browser is Safari, `false` otherwise.

  @return [Boolean]
*/
var browser_safari_p = function() {
  ARG_COUNT(0)
  
  return browser_platform.safari ? Qtrue : Qfalse;
};
 
/**
  Returns `true` if the current browser is Internet Explorer, `false` 
  otherwise.

  @return [Boolean]
*/
var browser_msie_p = function() {
  ARG_COUNT(0)
  
  return browser_platform.msie ? Qtrue : Qfalse;
};

/**
  Returns `true` if the current browser is Firefox, `false` otherwise.

  @return [Boolean]
*/
function browser_firefox_p(self, mid) {
  ARG_COUNT(0)
  
  return browser_platform.firefox ? Qtrue : Qfalse;
}

/**
  Returns true or false to indicate whether this browser is on a touch
  platform or not
*/
function browser_touch_p(self, mid) {
  ARG_COUNT(0)
  
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

// function Init_Browser() {
//   rb_mBrowser = rb_define_module("Browser");
//   
//   rb_define_singleton_method(rb_mBrowser, "opera?", browser_opera_p);
//   
//   // Init all other browser classes/modules
//   Init_Element();
//   // Init_Document();
// }

var Init_Browser = function() {
  rb_mBrowser = rb_define_module('Browser');

  rb_mBrowser.$dm('opera?', browser_opera_p, 1);
  rb_mBrowser.$dm('msie?', browser_msie_p, 1);

  rb_mKernel.$dm('alert', browser_alert, 0);
};
