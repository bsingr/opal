// ALL Depreceated!!!! do not use..

var Opal = require('./lib_js/opal');
var File = require('file');
var Jake = require('jake');

global.puts = function() {
  for (var i = 0; i <  arguments.length; i++) {
    print(arguments[i]);
  }
};

// compile tmp/ruby_test.rb into tmp/ruby_test.js
Jake.task('test', function() {
  print("opal is:");
  print(Opal);
  var src = File.read('tmp/ruby_test.rb');
  print(src);
  var res = Opal.compile(src);
  print(res);
});
