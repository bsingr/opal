var rb_cProc;

function proc_to_proc(proc, mid) {
  return proc;
}

function proc_call(proc, mid) {
  var args = Array.prototype.slice.call(arguments, 2);
  // mid
  args.unshift('');
  // self
  args.unshift(proc.$self);
  return proc.apply(null, args);
}

function Init_Proc() {
  // @class Proc
  rb_cProc = rb_define_toll_free_class(Function.prototype, T_OBJECT | T_PROC, 
    "Proc", rb_cObject);
  
  Function.prototype.$hash = function() {
    if (this.$id) return this.$id;
  	return this.$id = opal_yield_hash();
  };
  
  rb_define_method(rb_cProc, "to_proc", proc_to_proc);
  rb_define_method(rb_cProc, "call", proc_call);
}
