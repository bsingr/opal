var Opal = require('./lib/opal');
var fs = require('fs');
var path = require('path');

task('test', [], function() {
  //console.log(Opal);
  //console.log(Opal.compile(require('fs').readFileSync('tmp/test.rb').toString()));
  console.log(Opal.compile('a'));
});

desc('Rebuild extras/opal.js - ready for browser');
task('browser', [], function() {
  var out_file = 'extras/opal.js';

  // pre code here
  var result = fs.readFileSync('src/browser_pre.js').toString(); 


  var sources = [
    'array', 'numeric', 'string', 'symbol', 'hash', 'top_self', 'nil_class',
    'true_class', 'false_class', 'kernel', 'module', 'proc',
    'runtime', 'browser'
  ];

  sources.forEach(function(source) {
    result += 'modules["./' + source + '"] = function(exports) {\n';
    result += fs.readFileSync('lib/' + source + '.js').toString();
    result += '\n};\n';
  });

  // post code
  result += fs.readFileSync('src/browser_post.js').toString();

  fs.writeFileSync(out_file, result);
});

desc('Rebuild extras/opal_dev.js - ready for in browser development');
task('browser_dev', [], function() {
  var out_file = 'extras/opal_dev.js';

  // pre code - reuse browser pre
  var result = fs.readFileSync('src/browser_pre.js').toString();

  var sources = ['parser', 'ruby_parser', 'string_scanner', 'generator', 'browser_dev'];

  sources.forEach(function(source) {
    result += 'modules["./' + source + '"] = function(exports, module) {\n';
    result += fs.readFileSync('lib/' + source + '.js').toString();
    result += '\n};\n';
  });

  // post code - different from browser
  result += fs.readFileSync('src/browser_dev_post.js').toString();

  fs.writeFileSync(out_file, result);
});

desc('rebuild core .rb libraries from src/ into lib/');
task('core', [], function() {
  var sources = ['array', 'numeric', 'string', 'symbol', 'hash', 'top_self', 'nil_class', 'true_class', 'false_class', 'kernel', 'module', 'proc'];

  sources.forEach(function(source) {
    var code = Opal.compile(fs.readFileSync('src/' + source + '.rb').toString());
    fs.writeFileSync('lib/' + source + '.js', code);
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

desc('Rebuild rquery.js into extras/');
task('rquery', [], function() {
  var sources = ruby_sources('rquery/lib');
  var result = [];

  sources.forEach(function(orig_source) {
    var source = /^rquery\/lib\/(.*)\.rb$/.exec(orig_source)[1];
    console.log('doing source: ' + source);
    var compiled = Opal.compile(fs.readFileSync(orig_source).toString());
    result.push('Opal.module("' + source + '", function() {\n');
    result.push(compiled);
    result.push('\n});\n');
  });

  // In addition to ruby sources, rquery also loads jquery.js as a sole js source.
  result.push('Opal.module("rquery/jquery", function() {\n');
  result.push(fs.readFileSync('rquery/lib/rquery/jquery.js').toString());
  result.push('\n});\n');

  // rquery self loads..
  result.push('Opal.require("rquery");\n');

  fs.writeFileSync('extras/rquery.js', result.join(''));
});

