if (typeof require !== 'undefined') {
  var RubyParser = require('./ruby_parser').parser,
      Lexer      = require('./lexer').Lexer;
} else {
  var RubyParser = parser;
}
    
var parser = function() {
  this._lexer = new Lexer();
  RubyParser.lexer = this;
};

parser.prototype.lex = function() {
  if (this._done) return "";
  // print("position: " + this._position + " " + this._tokens.length);
  // print(this._tokens);
  var token = this._tokens[this._position++];
  // print(token);
  if (!token || token[0] == false) {
    // print("doneee");
    this._done = true;
    return "EOF";
  }
  // print("yytext is " + token[0] + ", " + token[1]);
  this.yylineno = token[2];
  this.yytext = token[1];
  return token[0];
};

parser.prototype.setInput = function() {

};

parser.prototype.upcomingInput = function() {
  return "";
};

parser.prototype.tokenize = function(str) {
  return this._lexer.tokenize(str + '\n');
};

parser.prototype.parse = function(str) {
  // console.log("parsing: " + str);
  this._tokens = this.tokenize(str);
  this._position = 0;
  this._done = false;
  // console.log(this._tokens);
  try {
    var res = RubyParser.parse(this._tokens);
    // console.log("== Parsing completed!");
    return res;
  }
  catch (e) {
    // here we should customize the message with the filename etc in which token
    // error occured.
    for (var i = 2; i < 30; i++) {
      console.log(this._tokens[this._position - i]);
    }
    throw e;
  }
  
};


exports.Parser = new parser();
