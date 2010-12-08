/**
  Developer side of opal (compiler, parser, generator etc). Only needs to be 
  used for development, it is not needed for runtime use.
*/

// Make sure opal exists
if (typeof Opal == 'undefined')
  Opal = {};

(function(global, exports) {
  
/**
  Import just development (and header)
*/
#import "browser.h"
#include "../opal.h"
#include "../dev.js"
  
})(this, Opal);