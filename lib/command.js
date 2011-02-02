var OptionParser = require('./optparse').OptionParser;

// running from bin
exports.run = function(args) {

  var parser = new OptionParser(SWITCHES, BANNER);
  var opts = parser.parse(args);
  
  if (opts.help) return help();
  if (opts.version) return version();
  if (opts.interactive) return require('./repl');
  if (opts.eval) return evalSources(opts.arguments);
  if (opts.compile) return compileSources(opts);
  
  console.log(opts);

  // default action - use repl if no sources/arguments
  if (opts.arguments.length == 0) {
    console.log("default: run repl"); 
    return require('./repl');
  } else {
    console.log("run sources: " + opts.arguments);
  }
};

var SWITCHES = [
  ['-c', '--compile',       'compile opal source to javascript and save files'],
  ['-o', '--output [DIR]',  'sets the output directory for generated sources'],
  ['-e', '--eval',          'compile a string parsed to command line'],
  ['-i', '--interactive',   'run an opal REPL'],
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

