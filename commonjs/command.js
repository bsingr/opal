var Opal = require('./opal');

var path = require('path');
var fs = require('fs');

// run ruby files..
require.registerExtension('.rb', function(str) {
  // console.log("compiling");
  // console.log("compile " + str);
  var res = Opal.compile_main(str);
  // console.log(res);
  // return new Function('require', 'exports', 'global', 'return ' + res[0] + ';');
  // return "console.log('10000');";
  
  // return "(" + res[0] + ")(require, exports, global);"
  return res[0];
});


// this is our Opal object (same as one we get in the browser)
exports.OPAL_RUNTIME = {};

exports.run = function() {
  // console.log("running");
  exports.require_commonjs_runtime();
  require('./console');
  // console.log(exports.OPAL_RUNTIME.Object.constants.Spec.constants);
};

// require/load the opal runtime
exports.require_commonjs_runtime = function() {
  // console.log('requiring');
  var sources = ['opal', 'commonjs'];
  var result = [];
  
  for (var i = 0; i < sources.length; i++) {
    result.push(fs.readFileSync(path.join(path.dirname(fs.realpathSync(__filename)), '../opals', 'opal', 'runtime', sources[i] + '.js')));
  }
  
  // console.log(result.join(""));
  
  var func = new Function('global', 'exports', 'print', result.join(""));
  // console.log(func);
  func(global, exports.OPAL_RUNTIME, console.log);
  // console.log(exports.OPAL_RUNTIME);
  
  // require(path.join(path.dirname(fs.realpathSync(__filename)), '../opals', 'opal', 'lib', 'opal.rb'));
  var opal_libs = ['opal', 'browser', 'spec'];
  
  for (var i = 0; i < opal_libs.length; i++) {
    require.paths.unshift(path.join(path.dirname(fs.realpathSync(__filename)), '../opals', opal_libs[i], 'lib'));
  }
  
  
  
  // console.log(require.paths);
  require('opal');
  require('spec');
};

// returns string,but what we need for browser environment (loads some different 
// files). INCLUDES opal and browser package, as needed by browser.
exports.browser_runtime_str = function() {
  
};
