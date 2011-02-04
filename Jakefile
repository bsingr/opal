var Opal = require('./lib/opal');
var fs = require('fs');
var path = require('path');

task('test', [], function() {
  //console.log(Opal);
  //console.log(Opal.compile(require('fs').readFileSync('tmp/test.rb').toString()));
  console.log(Opal.compile('a'));
});

desc('rebuild core .rb libraries from src/ into lib/');
task('core', [], function() {
  var sources = ['array', 'numeric', 'string', 'symbol', 'hash', 'top_self', 'nil_class', 'true_class', 'false_class', 'kernel', 'module'];

  sources.forEach(function(source) {
    var code = Opal.compile(fs.readFileSync('src/' + source + '.rb').toString());
    fs.writeFileSync('lib/' + source + '.js', '(function(self) {' + code + '})(rb_top_self);');
  });
});

desc('build opalspec.js into extras/');
task('opalspec', [], function() {
  var sources = ruby_sources('opal_lib/opalspec').concat('opal_lib/opalspec.rb');
  //console.log(sources);
  var result = [];

  sources.forEach(function(orig_source) {
    // get proper commonjs version of name - remove ext and leading path
    source = /^opal_lib\/(.*)\.rb$/.exec(orig_source)[1];
    console.log('doing ' + source);
    var compiled = Opal.compile(fs.readFileSync(orig_source).toString());
    result.push('Opal.module("' + source + '", function() {\n');
    result.push(compiled);
    result.push('\n});\n');
  });

  fs.writeFileSync('extras/opalspec.js', result.join(''));
});


// returns a recursive list of all ruby sources found inside the given dir
var ruby_sources = function(dir) {
  var result = [];
  
  var children = fs.readdirSync(dir);
  children.forEach(function(child) {
    child = path.join(dir, child);
    if (fs.statSync(child).isDirectory()) {
      result = result.concat(ruby_sources(child));
    } else {
      if (path.extname(child) == '.rb') {
        result.push(child);
      }
    }
  });

  return result;
};

// same, but javascript
var javascript_sources = function(dir) {

};

