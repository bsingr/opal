var Opal = require('./lib_js/opal');
var File = require('file');
var Jake = require('jake');

global.puts = function() {
  for (var i = 0; i <  arguments.length; i++) {
    print(arguments[i]);
  }
};

// Jake.task('parser', function() {
//   // print("parser");
//   require('jison');
//     var parser = require('./lib_js/opal/dev/grammar').Parser;
//     var gen = parser.generate();
//   //   FS.writeFile('lib/ruby_parser.js', gen);
//   File.write('lib_js/opal/dev/ruby_parser.js', gen);
// });

// compile tmp/ruby_test.rb into tmp/ruby_test.js
Jake.task('test', function() {
  print("opal is:");
  print(Opal);
  var src = File.read('tmp/ruby_test.rb');
  print(src);
  var res = Opal.compile(src);
  print(res);
});
