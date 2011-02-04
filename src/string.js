var rb_cString;

var rb_cSymbol;
		
// Symbol instance
var RSymbol = function(ptr) {
  // hash
  this.$id = opal_yield_hash();
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

// Returns a new string object containing a copy of `str`.
// 
// @param [String] str string to copy
// @return [String] result
function str_s_new(str, mid, text) {
	return new String(text || "");
};

var Init_String = function() {
	// @class String
	rb_cString = rb_define_toll_free_class(String.prototype, T_OBJECT | T_STRING, 
																				'String', rb_cObject);
	
	rb_define_singleton_method(rb_cString, "new", str_s_new);
	
	// @class Symbol
	rb_cSymbol = rb_define_toll_free_class(RSymbol.prototype, T_OBJECT | T_SYMBOL, 
																				'Symbol', rb_cObject);
  
  RClass.prototype.$Y = RObject.prototype.$Y = opalsym;
};

