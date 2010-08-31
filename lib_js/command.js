var OS = require('os');

// assume REPL for now
var repl = function () {
  var Readline = require('readline');
  while (true) {
    try {
      system.stdout.write('>> ').flush();
      var line = Readline.readline();
      var result = OS.popen('./bin/rb2js').stdout.read()
      print('=> ' + result);
    }
    catch (e) {
      print(e);
    }
  }
};

repl();
