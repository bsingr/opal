// // platform dependant IO (File, Dir, etc)
// var IO = require('./io');
// // in node? (false for narwhal/commonjs)
// var is_node = (typeof process !== 'undefined');
// // make sure we have print available
// var print = IO.print;
// 
// // run opal..
// exports.run = function() {
//   print('need to run');
//   // require opal (runtime and dev) and then run (need to pass ARGV)
//   require('../opal').run();
// };


// // command.js
// // ==========
// // 
// // All commonjs based functionality in here. Uses io.js for implementation
// // specific behaviour (loading, file access etc)
// // 
// var Opal = require('../opal'),
//     IO   = require('./io');  
// 
// // are we node?
// var is_node = (typeof process !== 'undefined');
// 
// // this files path
// var __file__ = is_node ? __filename : module.path;
// 
// // this is our Opal object (same as one we get in the browser)
// exports.OPAL_RUNTIME = {};
// 
// exports.run = function() {
//   return console.log("running");
//   exports.require_commonjs_runtime();
//   require('./console');
// };
// 
// // require/load the opal runtime
// exports.require_commonjs_runtime = function() {
//   // sources for main runtime
//   var sources = is_node
//                 // node
//               ? ['node', 'variable', 'opal', 'vm', 'load']
//                 // narwhal/commonjs
//               : ['narwhal', 'opal', 'vm'];
//               
//   // runtime string to eval
//   var result = [];
//   // main opal libs - we add these to the require path
//   var opal_libs = ['opalruby', 'opalspec'];
//   
//   // add runtime sources to string to eval as runtime (into OPAL_RUNTIME)
//   for (var i = 0; i < sources.length; i++) {
//     var source = IO.join(IO.dirname(__file__), '..', '..', 'opals', 'opalruby',
//                                     'runtime', sources[i] + '.js');
//     console.log(source);
//     result.push(IO.read(source));               
//   }
//   
//   // evaluate the runtime
//   var func = new Function('global','exports','print','require',result.join(""));
//   func(global, exports.OPAL_RUNTIME, print, require);
//   
//   // add our core libraries into the require path, so they can be required..
//   for (var i = 0; i < opal_libs.length; i++) {
//     var opal_lib = IO.join(IO.dirname(__file__), '..', '..', 'opals', 
//                                       opal_libs[i], 'lib');
//     require.paths.unshift(opal_lib);
//   }
//   
//   // var print = function(a) { console.log(a); };
//   
//   // run opal_lib (to load core libraries)
//   try {
//     require('opalruby');
//     // require('opalspec');
//   }
//   catch (e) {
//     print("error...");
//     // if error is a valid opal object..
//     try {
//       print(e.$m.$inspect(e));
//     }
//     catch (err) {
//       print(e);
//       print(err);
//     }
//   }
//     
// };
// 
// // returns string,but what we need for browser environment (loads some different 
// // files). INCLUDES opal and browser package, as needed by browser.
// exports.browser_runtime_str = function() {
//   
// };
