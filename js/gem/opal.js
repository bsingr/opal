
// #define ACTION(...) __VA_ARGS__
// // #define ACTION(...) \
//   // { \
//     // result = #__VA_ARGS__ \
//   // }
// 
// ACTION(result = 10;)
// ACTION(result = ["call", 1, 4, 2, 4])

/**
  For gem/standard ruby based runtime (within therubyracer)
*/
(function(global, exports) {
  
/**
  Make sure print is available
*/  
var print = function(str) {
  Opal.native_print(str);
}

print("BOSGGG");

/**
  Import all Opal defines, and bundle in runtime as well as development 
  (compiler, parser etc).
*/
#include "../opal.h"
#include "../runtime.js"
#include "../dev.js"

})(this, Opal);
