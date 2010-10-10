var Opal      = require('./opal'),
    Readline  = require('readline');
  
var read_stream = process.openStdin();  

var repl = function() {

};

var repl = Readline.createInterface(read_stream);
repl.setPrompt('>> ');

read_stream.on('data', function(b) {
  repl.write(b);
});

repl.on('close', function() {
  read_stream.destroy();
});

repl.on('line', function(b) {
  console.log('=> ' + b.toString());
  repl.prompt();
});

repl.prompt();