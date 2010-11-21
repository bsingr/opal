var Opal = require('./lib_js/opal');
var File = require('file');
var Jake = require('jake');

global.puts = function() {
  for (var i = 0; i <  arguments.length; i++) {
    print(arguments[i]);
  }
};

Jake.task('parser', function() {
  // print("parser");
  require('jison');
    var parser = require('./lib_js/opal/dev/grammar').Parser;
    var gen = parser.generate();
  //   FS.writeFile('lib/ruby_parser.js', gen);
  File.write('lib_js/opal/dev/ruby_parser.js', gen);
});
