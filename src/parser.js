var Parser = require('jison').Parser;

var grammar = {
  "Root": [
    "",
    "TOM"
  ]
};

var operators = [];

var tokens = [];

exports.Parser = new Parser({
  tokens: "",
  bnf: grammar,
  operators: operators,
  startSymbol: "Root"
});
