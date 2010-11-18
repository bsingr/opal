var Opal      = require('../opal');

if (typeof process !== 'undefined') {
  // node
  
  var Readline  = require('readline');

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
    try {
    // console.log('=> ' + b.toString());
    // console.log((Opal.compile_main(b.toString())[0]));
    var result_obj = (new Function(Opal.compile_main(b.toString())[0]))();
    var inspect_obj = result_obj.$m.$inspect(result_obj);
    console.log('=> ' + inspect_obj);
    }
    catch (e) {
      console.log("found error..");
       // return;
       // print(e);
       // return;
       try {
         // console.log(e);
         console.log(e.$m.$inspect(e).toString());
        }
        catch (err) {
          console.log("error print error: " + err);
        }
    }
    repl.prompt();
  });

  repl.prompt();
}
else {
  // narwhal
  var repl = function() {
     var Readline = require('readline');
     while (true) {
       try {
         system.stdout.write('>> ').flush();
         var line = Readline.readline();
         var code = Opal.compile_main(line)[0];
         // print(code);
         var result_obj = (new Function(code))();
         
         var inspect_obj = result_obj.$m.$inspect(result_obj);
         print('=> ' + inspect_obj);
       }
       catch (e) {
         print("found error..");
         // return;
         // print(e);
         // return;
         try {
           print(e);
           print(e.$m.$inspect(e).toString());
          }
          catch (err) {
            print("error print error: " + err);
          }
         // print(e.class_name + ': ' + e['@message']);
       }
     }
   };

   repl();
}
