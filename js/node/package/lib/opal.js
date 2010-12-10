/**
  Main include file for node packages. NOTE: this will NOT run opal, it will
  just require it so it has the ability to compile etc
*/

var fs = require('fs');
var path = require('path');

function print(str) {
  console.log(str);
}

var Opal = require('./runtime');

// argv
Opal.argv = process.argv.slice(1);

// opal_lib_path - use this one
// Opal.opal_lib_path = path.join(path.dirname(__filename), '..', 'ruby_lib');

// tmp replace path
Opal.opal_lib_path = path.join(path.dirname(__filename), '..', '..', 'lib');

// this should be done in bin file.
// Opal.main();

/**
  run the given gem name and maintain the argv given. This is a way to bootstrap
  the built in gems with quick runners to their bin files. Used for opalite, 
  ospec and orake
  
  If bin_name is not given then it is assumed to be the same as the gem_name
*/
exports.gem_runner = function(gem_name, bin_name) {
  bin_name = bin_name || gem_name;
  // first pop gem name (bin name) onto argv list
  var bin_path = "/Users/adam/Development/opal/gems/" + gem_name + "/bin/" + bin_name;
  Opal.argv.splice(1, 0, bin_path);
  print(Opal.argv.join(", "));
  Opal.main();
}

for (var prop in Opal) {
  exports[prop] = Opal[prop];
}

