
var rb_cIO;

function rb_f_gets() {
	return "need to get some data";
}

function Init_IO() {
	rb_define_global_function("gets", rb_f_gets);
	
	rb_cIO = rb_define_class("IO", rb_cObject);
};
