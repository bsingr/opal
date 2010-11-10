if (typeof require !== 'undefined') {
  var path      = require('path'),
      Parser    = require('./parser').Parser,
      Generator = require('./generator').Generator;
    
  puts =print = function() {
    for (var i = 0; i < arguments.length; i++)
      console.log(arguments[i]);
  };
} else {
  var Parser = exports.Parser;
  var Generator = exports.Generator;
 }

exports.compile = function compile(source) {
  // console.log("compiling: " + source);
  // console.log(Parser);
  // Parser.parse(source);
  var nodes = Parser.parse(source);
  var g = new Generator(nodes, {});
  var res = g.generate_top_context();
  return res;
  // console.log("\n## Result:\n");
  // console.log(res);
};

// compile main (no function wrapper etc)
exports.compile_main = function compile_main(source) {
  var nodes = Parser.parse(source);
  var g = new Generator(nodes, {});
  var res = g.generate_main_context();
  return res;
};
