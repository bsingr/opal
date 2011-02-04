var rb_cNumeric;


function Init_Numeric() {
	// @class Numeric
	rb_cNumeric = rb_define_toll_free_class(Number.prototype, T_OBJECT | T_NUMBER, 
																			 'Numeric', rb_cObject);
	
}

