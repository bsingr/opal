// REPL
exports.run = function() {
  var repl = function() {
    var Readline = require('readline');
    var stdio = process.openStdin();
    var repl = Readline.createInterface(stdio);
    // while (true) {
      // try {
        repl.setPrompt('>> ');
        stdio.on('data', function(buffer) {
          repl.write(buffer);
        });
        
        // repl.addEventListener('close')
        // repl
        // var line = Readline.readline();
        repl.prompt();
        
      // }
      // catch (e) {
        // console.log(e);
      // }
    // }
  };
  
  repl();
};
