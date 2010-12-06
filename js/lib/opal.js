/**
	File to build for opal running in v8/stand alone context.
*/

(function(global, exports) {
// defines etc
#include "opal.h"
// core runtime files
#include "opal_platform.js"
#include "file.js"
#include "class.js"
#include "module.js"
#include "debug.js"

// core classes/objects/modules
#include "object.js"
#include "error.js"
#include "string.js"
#include "numeric.js"
#include "io.js"
#include "array.js"
#include "hash.js"
#include "regexp.js"

// extra runtime files
#include "variable.js"
#include "ruby.js"
#include "vm.js"
#include "load.js"
#include "init.js"

// dev files needed
#include "ruby_parser.js"
#include "parser.js"
#include "string_scanner.js"
#include "generator.js"

})(this, Opal);
