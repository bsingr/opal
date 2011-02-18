var OptionParser = require('./optparse').OptionParser;
var fs = require('fs');
var path = require('path');

var OPTIONS = {};

// running from bin
exports.run = function(args) {

  var parser = new OptionParser(SWITCHES, BANNER);
  var opts = parser.parse(args);
  
  OPTIONS = opts;
  //console.log(opts);
  //return;

  if (opts.help) return help();
  if (opts.version) return version();
  if (opts.interactive) return require('./repl');
  if (opts.eval) return evalSources(opts.arguments);
  if (opts.compile) return compileSourcesMain(opts);
  
  console.log(opts);

  //OPTIONS = opts;

  // default action - use repl if no sources/arguments
  if (opts.arguments.length == 0) {
    console.log("default: run repl"); 
    return require('./repl').run(opts);
  } else {
    runSources(opts.arguments);
    //console.log("run sources: " + opts.arguments);
  }
};

var SWITCHES = [
  ['-c', '--compile',       'compile opal source to javascript and save files'],
  ['-o', '--output [DIR]',  'sets the output directory for generated sources'],
  ['-e', '--eval',          'compile a string parsed to command line'],
  ['-i', '--interactive',   'run an opal REPL'],
  ['-j', '--javascript',    'execute REPL commands as javascript'],
  ['-h', '--help',          'displays this help message'],
  ['-v', '--version',       'displays opal version']
];

var BANNER = "\nUsage: opal [options] path/to/scripts.opal\n"

var help = function() {
  console.log(BANNER);
  for (var i = 0; i < SWITCHES.length; i++) {
    var s = SWITCHES[i];
    var str = (s[0] || '  ') + ', ' + s[1];
    while (str.length < 20) { str += ' ' };
    console.log('  ' + str + s[2]);
  }
};

var version = function() {
  console.log('Opal version ' + require('./version').VERSION);
};

var evalSources = function(sources) {
  var Opal = require('opal');
  console.log("need to eval given sources");
  console.log(sources);
  for (var i = 0; i < sources.length; i++) {
    console.log(Opal.compile(sources[i]));
  }
};

// when we "run sources", we actually just run the first argument as the
// actual file, and pass the remaining args as the ruby ARGV.
var runSources = function(sources) {
  var Opal = require('opal');
  Opal.init();
  var file_to_run = sources[0];
  var args = sources.slice(1);

    fs.readFile(file_to_run, function(err, res) {
      try {
        var code = Opal.compile(res.toString());
        $opal.rb_run(function() {
          var module = {};
          module.filename = fs.realpathSync(file_to_run);
          eval(code);
        });
      } catch(e) {
      console.log("err: " + res);
      console.log(e.stack);
      }
      });
};

var compileSourcesMain = function(opts) {
  console.log(opts);
  var sources = opts.arguments;

  for (var i = 0; i < sources.length; i++) {
    console.log("need to compile " + sources[i] + " from " + path.join(sources[i]));
    compileSources(sources[i], path.join(sources[i]));
  }
};

var compileSources = function(source, base) {
  path.exists(source, function(exist) {
    if (!exist) {
      throw new Error("path does not exist: " + source);
    }

    var stat = fs.statSync(source);

    if (stat.isDirectory()) {
      console.log("dir!");
      var contents = fs.readdirSync(source);
      for (var i = 0; i < contents.length; i++) {
        compileSources(path.join(source, contents[i]), base);
      }
    } else if (path.extname(source) == '.rb') {
      console.log("compile file! " + source);
      var code = fs.readFileSync(source).toString();
      //console.log(code.length);
      compileSource(source, code, base);
    }
  });
};

var compileSource = function(source, code, base) {
  var Opal = require('opal');

  try {
    var result = Opal.compile(code);
    //console.log("resule length: " + result.length);
    writeResultToFile(source, result, base);
  } catch (e) {
    
  }
};

var writeResultToFile = function(source, code, base) {
  //console.log(" == need to write from " + source);  
  var fname = path.basename(source, '.rb') + '.js';
  var dirname = path.dirname(source);

  if (base) {
    dirname = dirname.substr(base.length);
  }
  //console.log("base is: " + base);
  //console.log("new dirname: " + dirname);
  var out_dir;

  if (OPTIONS.output) {
    out_dir = path.join(OPTIONS.output, dirname);
  } else {

  }

  var output = path.join(out_dir, fname);
  console.log("====== out: " + output);
 // return; 
  mkdir_p(out_dir);

  console.log("and writin to " + output);

  // try {
  fs.writeFile(output, code, function(err) {
    console.log(err);
  });
  // } catch (e) {
    // console.log("error..");
    // console.log(e);
  // }
};

// var mkdir_p = function(p, mode) {
//   console.log("making dir: " + p);
//   mode = mode || 777;
//   var path = '', parts = p.split('/');
//   console.log(parts);
//   for (var i = 0; i < parts.length; i++) {
//     console.log(parts[i]);
//     path += (parts[i] + '/');
//     console.log(path);
//     try {
//       fs.mkdirSync(path, mode);
//     } catch(e) {
//       //console.log("error");
//       //console.log(e);
//     }
//   }

// };

var mkdir_p = function(dir) {
  console.log("trying to make " + dir);
  require('child_process').exec("mkdir -p " + dir);
};

