var Opal = require('./opal');
// make sure opal is inited
Opal.init();

var OPTIONS = {};

/**
  start REPL session (node specific)
*/
var start_repl = function() {
  var Readline = require("readline");
  var read_stream = process.openStdin();
 
  var repl = Readline.createInterface(read_stream, process.stdout);
  repl.setPrompt(">> ");
  
  if (Readline.createInterface.length < 3) {
    read_stream.on("data", function(b) {
      repl.write(b);
    });
  }
  
  repl.on("close", function() {
    read_stream.destroy();
  });
 
  if (OPTIONS.javascript) {
    repl.on('line', function(b) {
      try {
        console.log(eval(b.toString()));
        } catch(e) {
          console.log(e.stack || e);
        }
      repl.prompt();
    });
  } else {
    repl.on("line", function(b) {
     $opal.rb_run(function() {
       var code = Opal.compile(b.toString());
       var module = {};
       module.filename = "(irb)";
      // var func = new Function("self", "__FILE__", code);
       //var result = func(rb_top_self, "(irb)");
       var result = eval(code);//func(rb_top_self, '(irb)');
       
       console.log("=> " + result.$m.inspect(result));
     });
     
     repl.prompt();
    });
  }
  
  repl.prompt();
}

exports.run = function(opts) {
  OPTIONS = opts;
  start_repl();
};

