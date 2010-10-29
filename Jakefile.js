var FS   =  require('fs');
var Sys  = require('sys');
var Opal = require('./commonjs/opal');
var Glob = require('glob');
var Path = require('path');

desc("Parser");
task('parser', [], function() {
  require('jison');
  var parser = require('./commonjs/grammar').Parser;
  var gen = parser.generate();
  FS.writeFile('commonjs/ruby_parser.js', gen);
});

desc("Compile");
task('compile', [], function() {
  var compile = require('./commonjs/opal').compile;
  var source = FS.readFileSync(require('path').join(process.cwd(), 'tmp/ruby.rb'), "utf8");
  // compile("class Adam; 34; end; ::Adam == 100; Adam::Beynon; Adam::Beynon = 10");
  var res = compile(source);
  console.log(res);
});

desc('Build an tmp/opal.js for use in web browser');
task('opal', [], function() {
  var pre     = 'var Opal = {};\n(function(global, exports, print) {\n',
      post    = '\n})(window, Opal, function(){});\n',
      runtime = ['opal.js', 'browser.js'],
      corelib = ['kernel', 'module', 'array', 'basic_object', 'class', 'dir', 'error', 'boolean', 'file', 'hash', 'io', 'match_data', 'nil_class', 'number', 'opal', 'proc', 'range', 'regexp', 'ruby', 'string', 'symbol', 'top_self'],
      result  = [];

  result.push(pre);
  
  // runtime sources
  for (var i = 0; i < runtime.length; i++) {
    var p = require('path').join(process.cwd(), 'opals', 'opal', 'runtime', runtime[i]);
    result.push(FS.readFileSync(p, 'utf8'));
  }
  
  // core ruby libs
  for (var i = 0; i < corelib.length; i++) {
    var p = FS.readFileSync(require('path').join(process.cwd(), 'opals', 'opal', 'lib', corelib[i] + '.rb'));
    console.log("##### Compiling " + corelib[i]);
    var r = Opal.compile(p);
    result.push('(' + r + ')(exports.top_self);');
  }
  
  result.push(post);
  
  // browser opal
  var browser_path = Path.join(process.cwd(), 'opals', 'browser', 'lib');
  var browser_globs = Glob.globSync(Path.join(browser_path, '**/*.rb'));
  browser_globs = browser_globs.concat(Glob.globSync(Path.join(browser_path, 'browser', '**/*.rb')));
  browser_globs = browser_globs.concat(Glob.globSync(Path.join(browser_path, '**/*.js')));
  browser_globs = browser_globs.concat(Glob.globSync(Path.join(browser_path, '*.rb')));
  // console.log(browser_globs);
  
  result.push('Opal.register({\n  name:"browser",\n  files: {\n');
  
  for (var i = 0; i < browser_globs.length; i++) {
    var b = browser_globs[i];
    console.log("doing: " + b);
    if (i > 0) result.push(',\n');
    var name = (new RegExp('^' + browser_path + '(.*)$')).exec(b)[1];
    // console.log(name);
    result.push('"lib' + name + '": ');
    if (name.substr(name.length - 2) == 'rb') {
      result.push(Opal.compile(FS.readFileSync(b)));
    }
    else {
      result.push('function() {\n' + FS.readFileSync(b) + '\n}');
    }
  }
  
  result.push('}\n});');
  result.push('\nOpal.run("browser", "browser");\n');
  
  // brower run
  FS.writeFileSync(require('path').join(process.cwd(), 'tmp/opal.js'), result.join(''), 'utf8');
});

desc("Build tmp/opal_dev.js for compiling javascript in the browser.");
task("dev", [], function() {
  var pre     = '(function(global, exports, print) {\n',
      post    = '\n})(window, Opal, function(){});\n',
      sources = ['commonjs/ruby_parser.js', 'commonjs/generator.js', 'commonjs/lexer.js', 'commonjs/optimizer.js', 'commonjs/parser.js', 'commonjs/string_scanner.js', 'commonjs/opal.js'],
      result  = [];

  result.push(pre);
  
  // compiler, parser etc sources
  for (var i = 0; i < sources.length; i++) {
    result.push(FS.readFileSync(require('path').join(process.cwd(), sources[i]), 'utf8'));
  }
  
  result.push(post);
  
  FS.writeFileSync(require('path').join(process.cwd(), 'tmp/opal_dev.js'), result.join(''), 'utf8');
});

desc("Build both opal and opal dev ready for browser");
task("browser", ["dev", "opal"], function() { });

