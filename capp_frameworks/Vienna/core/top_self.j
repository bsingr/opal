
/**
    rb_top_self
    
    Unlike vanilla ruby, top self with cappuccino is very different. Essentially,
    rb_top_self's class is a singleton, but its iv_tbl and method table etc have
    to point to the window object, as all methods etc will be stored in there...
    which makes this...'fun'.
*/

window.rb_top_self = rb_funcall(rb_cObject, 'alloc');

// rb_define_singleton_method(rb_top_self, 'main', function(self, _cmd) {
//     
// });
