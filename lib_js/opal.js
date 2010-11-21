// This file is only used for commonjs and node. It is not loaded by the browser

// platform dependant IO (File, Dir, etc)
var IO = require('./opal/io');
// in node? (false for narwhal/commonjs)
var is_node = (typeof process !== 'undefined');
// make sure we have print available
var print = IO.print;
// parser and generator we can use later
var Parser, Generator;
// our filename
var opal_fname = is_node ? __filename : module.path;

// simply compile a string of ruby into javascript
exports.compile = function(source) {
  var nodes = Parser.parse(source);
  var g = new Generator(nodes, {});
  var res = g.generate_main_context();
  // print('result:');
  // print(res[0]);
  return res[0];
};

// run opal..
exports.run = function() {
  print('need to run opal');
  // load Development (compiler etc)
  load_development();
  // load runtime
  load_runtime();
};

print('in opal');

var load_development = function() {
  Parser = require('./opal/dev/parser').Parser;
  Generator = require('./opal/dev/generator').Generator;
};

var load_runtime = function() {
  print('need to load runtime');
  // all runtime source files
  var sources = ['variable', 'opal', 'vm', 'load', 'init'];
  // also load (first) node or narwhal, depending on platform
  sources.unshift(is_node ? 'node' : 'narwhal');
  // runtime path
  var runtime_dir = IO.join(IO.dirname(opal_fname), 'opal', 'runtime');
  // runtime code to eval
  var runtime_src = [];
  
  for (var i = 0; i < sources.length; i++) {
    runtime_src.push(IO.read(IO.join(runtime_dir, sources[i] + '.js')));
  }
  
  // evaluate the runtime
  var func = new Function('global', 'exports', 'print', 'require', 
      runtime_src.join(""));
  
  // pass in shared global, our designated exports, cross platform print, and a
  // require function (for IO access for node and narwhal).
  func(global, exports.OPAL_RUNTIME, print, require);
  
  // init - this will load core libs etc.
  exports.OPAL_RUNTIME.init();
};

// the exports object used by the runtime
exports.OPAL_RUNTIME = {
  // provide narwhal/node with opal_libs. This is the libs folder (core libs 
  // like 'pp', 'irb' etc). Browser doesnt use/get this, and determines it 
  // itself (doesnt need it tbh). This will be the first (main) path added to
  // the load path, and is the default location to look for libs.
  opal_libs: IO.join(IO.dirname(opal_fname), '..', 'lib'),
  
  // provide our basic compile function. This takes the ruby string source. It
  // is simply the same as exports.compile for node and narwhal, but is 
  // inherited by the browser by opal_dev.js
  compile: exports.compile,
  
  // remove this
  hack_mspec: IO.join(IO.dirname(opal_fname), '..', 'mspec', 'lib')
};


// if (typeof require !== 'undefined') {
//   // var path      = require('path'),
//       var Parser    = require('./parser').Parser,
//       Generator = require('./generator').Generator;
//     
//   // puts =print = function() {
//     // for (var i = 0; i < arguments.length; i++)
//       // console.log(arguments[i]);
//   // };
// } else {
//   var Parser = exports.Parser;
//   var Generator = exports.Generator;
//  }
// 
// exports.compile = function compile(source) {
//   // console.log("compiling: " + source);
//   // console.log(Parser);
//   // Parser.parse(source);
//   var nodes = Parser.parse(source);
//   var g = new Generator(nodes, {});
//   var res = g.generate_top_context();
//   return res;
//   // console.log("\n## Result:\n");
//   // console.log(res);
// };
// 
// // compile main (no function wrapper etc)
// exports.compile_main = function compile_main(source) {
//   var nodes = Parser.parse(source);
//   var g = new Generator(nodes, {});
//   var res = g.generate_main_context();
//   return res;
// };

