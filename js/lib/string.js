var rb_cSymbol,
		rb_cString;
		
// Symbol instance
var RSymbol = function(ptr) {
  // hash
  this.$h = opal_yield_hash();
  // ptr
  this.__ptr__ = ptr;
  // Class is rb_symbol
  this.$k = rb_cSymbol;
  // get methods from class
  this.$m = rb_cSymbol.$m_tbl;
  // return new sym
  return this;
};

// Symbol table
var symbol_table = { };

// @global - return/create a symbol
opalsym = function(str) {
  if (symbol_table.hasOwnProperty(str))
    return symbol_table[str];

  var res = new RSymbol(str);
  symbol_table[str] = res;
  return res;
};

var Init_String = function() {
	// @class Symbol
	// rb_symbol = rb_define_class('Symbol', rb_cObject);
	rb_cSymbol = rb_define_toll_free_class(RSymbol.prototype, T_OBJECT | T_SYMBOL, 'Symbol', rb_cObject);

	// @class String
	rb_cString = rb_define_toll_free_class(String.prototype, T_OBJECT | T_STRING, 'String', rb_cObject);
};
