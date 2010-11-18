// io.js
// =====
// 
// Contains all commonjs specific loading and file access. Depending on whether
// we are running on node or narwhal, we access file system differently. Also,
// this file is in charge of registering opal as the method of loading ruby
// depending on which engine we run.

// we need opal to compile
var Opal = require('../opal');

if (typeof process !== 'undefined') {
  // node
  var fs     = require('fs'),
      system = require('sys'),
      path   = require('path');

  // IO.join(...)
  exports.join = path.join;
  // IO.read(path)
  exports.read = function(p) {
    return fs.readFileSync(p, "utf8");
  };
  // IO.dirname(...)
  exports.dirname = function(p) {
    return path.dirname(p);
  };
  
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
}
else {
  // narwhal

  var file   = require('file'),
      system = require('system');
  
  // IO.join(...)
  exports.join = file.join;
  // IO.dirname(path)
  exports.dirname = file.dirname;
  // IO.read(path)
  exports.read = function(path) {
    return file.read(path);
  };
  
  // Ruby loading
  var ruby_loader = function() {
    
    var make_narwhal_factory = function(content, path) {
      print("making factory: " + path);
      // var str = "print('a');";
      var res = Opal.compile_main(content);
      var str = res[0];
      
      // print(str);
      
      return eval("(function(require,exports,module,system,print){"+str+"})");
    };
    
    var loader    = {},
        factories = {};
        
    loader.reload = function(top_id, path) {
      factories[top_id] = make_narwhal_factory(system.fs.read(path), path);
    };
    
    loader.load = function(top_id, path) {
      if (!factories.hasOwnProperty(top_id)) {
        loader.reload(top_id, path);
      }
      return factories[top_id];
    };
    
    return loader;
  };
  
  require.loader.loaders.unshift(['.rb', ruby_loader()]);
}
