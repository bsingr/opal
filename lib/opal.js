var fs = require('fs');
var path = require('path');

// We only init when needed. Init loads the runtime, and passes node 
// specific options to use for initing. This is safety wrapped to
// ensure init() is only called once.
exports.init = function(opts) {
  if (done_init) return;
  done_init = true;

  if (!opts) { opts = {}; }

  // node specific load options.
  options = {};

  for (var prop in opts) {
    options[prop] = opts[prop];
  }
  
  var load_paths = require.paths;
  load_paths.unshift(path.join(path.dirname(__filename), '..', 'opal_lib'));
  options.load_paths = load_paths; 



  var runtime = require('./runtime');
  runtime.init(options);

  // node specific loading
  // require('./node_fs');

  exports.runtime = runtime;
};

var done_init = false;

// node should use opal to load .rb files
if (require.extensions) {
  require.extensions['.rb'] = function(module, filename) {
    var result = exports.compile(fs.readFileSync(filename, 'utf8'));
    return module._compile(result, filename);
  };
} else if (require.registerExtension) {
  require.registerExtension('.rb', function(source) {
    return exports.compile(source);
  });
}

// Load dev tools
var dev = require('./parser');

for (var prop in dev) {
  exports[prop] = dev[prop];
}

