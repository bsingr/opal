var Opal = require('./lib/opal');
var File = require('file');


var input = File.read('tmp/ruby_test.rb');
print(input);
File.write('./tmp/ruby_test.js', Opal.compile(input)[0]);
