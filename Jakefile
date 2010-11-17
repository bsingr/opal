var Opal = require('./lib/opal');
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
    var parser = require('./lib/grammar').Parser;
    var gen = parser.generate();
  //   FS.writeFile('lib/ruby_parser.js', gen);
  File.write('lib/ruby_parser.js', gen);
});
